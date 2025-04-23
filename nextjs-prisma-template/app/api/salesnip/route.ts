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

  const config = {
    enviroment: "test", // The Creem environment to use. Either 'test' or 'live'.
    projectId: "project_p4wAHKrU3BBEmcUxpmfTT", // The id of your SaleSnip project
    productId: "prod_X6o6JK77QcbjrLQ92AxDS", // The product id of the Creem product
    minimumPrice: 8, // The minimum price of the product that can be negotiated
    // callbacks: {
    //   success: "https://example.com/callback/creem", // The URL to redirect to after successfully completing the payment.
    // },
  };

  const session = await axios.post(
    "https://api.salesnip.com/v1/sessions/creem",
    config,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "secret_i5SlvKn7bAYq3RvDUtM3z66VTnt2lM7t",
      },
    },
  );

  return NextResponse.json({
    success: true,
    session: session.data,
    // checkout: checkoutSessionResponse.data as CheckoutSession,
  });
}
