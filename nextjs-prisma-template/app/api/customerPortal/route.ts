import { Creem } from "creem";
import { NextRequest, NextResponse } from "next/server";

const creem = new Creem({
  serverIdx: 1,
});

export async function GET(req: NextRequest) {
  const apiKey = process.env.CREEM_API_KEY;
  const customerId = req.nextUrl.searchParams.get("customer_id");

  if (!customerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customerPortalLogin = await creem.generateCustomerLinks({
    xApiKey: apiKey as string,
    createCustomerPortalLinkRequestEntity: {
      customerId: customerId,
    },
  });
  return NextResponse.json({ url: customerPortalLogin.customerPortalLink });
}
