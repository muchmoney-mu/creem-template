import axios from "axios";
import { NextResponse } from "next/server";

export interface CheckoutSession {
  id: string;
  object: string;
  product: string;
  status: string;
  checkout_url: string;
  success_url: string;
  mode: string;
}

export async function GET() {
  const apiKey = process.env.CREEM_API_KEY;
  const productId = process.env.CREEM_PRODUCT_ID;
  const creemTestUrl = "https://test-api.creem.io/v1/checkouts";
  const checkoutSessionResponse = await axios.post(
    creemTestUrl,
    {
      product_id: productId,
    },
    { headers: { "x-api-key": apiKey } },
  );
  if (checkoutSessionResponse.status !== 200) {
    return;
  }

  return NextResponse.json({
    success: true,
    checkout: checkoutSessionResponse.data as CheckoutSession,
  });
}
