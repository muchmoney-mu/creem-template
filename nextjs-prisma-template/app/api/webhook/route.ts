import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface WebhookResponse {
  id: string;
  eventType: string;
  created_at: number;
  object: {
    id: string;
    object: string;
    request_id: string;
    order: {
      id: string;
      customer: string;
      product: string;
      amount: number;
      currency: string;
      status: string;
      type: string;
      affiliate: string;
      created_at: string;
      updated_at: string;
      mode: string;
    };
    product: {
      id: string;
      name: string;
      description: string;
      image_url: string;
      price: number;
      currency: string;
      billing_type: string;
      billing_period: string;
      status: string;
      tax_mode: string;
      tax_category: string;
      default_success_url: string;
      created_at: string;
      updated_at: string;
      mode: string;
    };
    customer: {
      id: string;
      object: string;
      email: string;
      name: string;
      country: string;
      created_at: string;
      updated_at: string;
      mode: string;
    };
    subscription: null;
    custom_fields: [];
    status: string;
    mode: string;
  };
}

export async function POST(req: NextRequest) {
  const webhookBody = (await req.json()) as WebhookResponse;
  console.log(webhookBody);
  // @ Uncomment if you want to save the customer data to the database
  // NOTE: You need to run yarn prisma migrate dev before, so that prisma creates a SQLITE db for you

  // const customerAlreadyExists = await prisma.customer.findUnique({
  //   where: { customer_id: webhookBody.object.customer.id },
  // });
  //
  // if (!customerAlreadyExists) {
  //   await prisma.customer.create({
  //     data: {
  //       object: "customer",
  //       customer_id: webhookBody.object.customer.id,
  //       email: webhookBody.object.customer.email,
  //       name: webhookBody.object.customer.name,
  //       country: webhookBody.object.customer.country,
  //     },
  //   });
  // }
  return NextResponse.json({ success: true, message: "webhook received POST" });
}
