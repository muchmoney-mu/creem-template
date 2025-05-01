import { NextRequest, NextResponse } from "next/server";
import { Creem } from "creem";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export interface CheckoutSession {
  id: string;
  object: string;
  product: string;
  status: string;
  checkout_url: string;
  success_url: string;
  mode: string;
}

const creem = new Creem({
  serverIdx: 1,
});

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  const productId = req.nextUrl.searchParams.get("product_id");

  if (!session?.user?.id || !productId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.CREEM_API_KEY;

  const successUrl = process.env.SUCCESS_URL;

  //
  const checkoutSessionResponse = await creem.createCheckout({
    xApiKey: apiKey!,
    createCheckoutRequest: {
      productId: productId as string,
      successUrl: successUrl as string,
      // You can use requestId or metadata to store user information
      requestId: session?.user.id as string,
      metadata: {
        email: session?.user.email as string,
        name: session?.user.name as string,
        userId: session?.user.id as string,
        myCustomField: "myCustomValue",
      },
    },
  });

  console.log(JSON.stringify(checkoutSessionResponse));
  return NextResponse.json({
    success: true,
    checkoutUrl: checkoutSessionResponse.checkoutUrl,
  });
}
