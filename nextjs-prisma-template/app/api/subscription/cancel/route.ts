import { NextRequest, NextResponse } from "next/server";
import { Creem } from "creem";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const creem = new Creem({
  serverIdx: 1,
});

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: headers() });
  const subscriptionId = req.nextUrl.searchParams.get("subscription_id");
  const apiKey = process.env.CREEM_API_KEY;

  if (!subscriptionId || !session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await creem.cancelSubscription({
    xApiKey: apiKey as string,
    id: subscriptionId as string,
  });

  return new NextResponse(null, { status: 200 });
}

