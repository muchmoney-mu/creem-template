import axios from "axios";
import { NextResponse } from "next/server";
import { Creem } from "creem";

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
  console.log("HERER");
  const creem = new Creem({
    serverIdx: 1,
  });
  const apiKey = process.env.CREEM_API_KEY;
  const productId = process.env.CREEM_PRODUCT_ID;
  // const creemTestUrl = "https://test-api.creem.io/v1/checkouts";
  //
  console.log("calling product");
  const resultProduct = await creem.createCheckout({
    xApiKey: apiKey!,
    createCheckoutRequestEntity: {
      productId: productId!,
    },
  });
  console.log(resultProduct);
  // const creemTestUrl = "http://localhost:8000/v1/checkouts";
  // const result = await creem.createCheckout({
  //   xApiKey: apiKey!,
  //   createCheckoutRequestEntity: {
  //     productId: productId!,
  //   },
  // });
  //
  // console.log(result);

  // const checkoutSessionResponse = await axios.post(
  //   creemTestUrl,
  //   {
  //     product_id: productId,
  //     units: 4,
  //   },
  //   { headers: { "x-api-key": apiKey } },
  // );
  // if (checkoutSessionResponse.status !== 200) {
  //   return;
  // }

  // return NextResponse.json({
  //   success: true,
  //   checkout: checkoutSessionResponse.data as CheckoutSession,
  // });
  return NextResponse.json({
    success: true,
    checkout: true,
  });
}
