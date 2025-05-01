import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Interface representing the webhook response structure.
 * @remarks Only includes fields relevant for this template to maintain simplicity
 */
export interface WebhookResponse {
  id: string;
  eventType: string;
  object: {
    request_id: string;
    object: string;
    id: string;
    customer: {
      id: string;
    };
    product: {
      id: string;
      billing_type: string;
    };
    status: string;
    metadata: any;
  };
}

/**
 * Handles incoming webhook POST requests for payment processing
 * @param req - The incoming webhook request
 * @returns A JSON response indicating successful webhook processing
 * 
 * @remarks
 * This handler processes two types of payments:
 * 1. One-time payments: Handles single purchase transactions
 * 2. Subscriptions: Manages recurring payment lifecycles
 */
export async function POST(req: NextRequest) {
  const webhook = (await req.json()) as WebhookResponse;

  // Determine payment type based on billing_type
  const isSubscription = webhook.object.product.billing_type === "recurring";

  if (!isSubscription) {
    /**
     * One-Time Payment Processing
     * --------------------------
     * Only processes 'checkout.completed' events to:
     * 1. Verify successful payment
     * 2. Associate purchase with user
     * 3. Store transaction details
     */
    if (webhook.eventType === "checkout.completed") {
      // Extract user data from checkout session
      // Note: userId is embedded in request_id during checkout creation
      const userId = webhook.object.request_id;
      const productId = webhook.object.product.id;
      const providerCustomerId = webhook.object.customer.id;
      await prisma.oneTimePurchase.create({
        data: {
          id: webhook.object.id,
          userId,
          product: productId,
          providerCustomerId,
        },
      });
    }
  } else {
    /**
     * Subscription Processing
     * ---------------------
     * Handles three main subscription events:
     * 1. subscription.paid: New subscription or renewal
     * 2. subscription.canceled: User or system-initiated cancellation
     * 3. subscription.expired: Failed payment or end of canceled period
     */
    if (webhook.eventType === "subscription.paid") {
      // Extract subscription data
      // Note: userId is stored in metadata during checkout
      const userId = webhook.object.metadata.userId;
      const productId = webhook.object.product.id;
      const providerCustomerId = webhook.object.customer.id;

      // Create new subscription or update existing one
      await prisma.subscription.upsert({
        where: { id: webhook.object.id }, // Prevents duplicate subscriptions
        update: { status: "active" },
        create: {
          id: webhook.object.id,
          userId,
          product: productId,
          status: "active",
          providerCustomerId,
        },
      });
    }

    if (webhook.eventType === "subscription.canceled") {
      /**
       * Handle subscription cancellation
       * @note Consider skipping immediate cancellation to maintain access until period end
       * In that case, wait for subscription.expired event instead
       */
      await prisma.subscription.update({
        where: {
          id: webhook.object.id,
        },
        data: {
          status: "canceled",
          updated_at: new Date(Date.now()),
        },
      });
    }

    if (webhook.eventType === "subscription.expired") {
      // Mark subscription as expired (final subscription state)
      await prisma.subscription.update({
        where: {
          id: webhook.object.id,
        },
        data: {
          status: "expired",
          updated_at: new Date(Date.now()),
        },
      });
    }
  }

  return NextResponse.json({
    success: true,
    message: "Webhook received successfully",
  });
}
