import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export interface UserPurchasesResponse {
  subscriptions: {
    id: string;
    product: string;
    providerCustomerId: string;
    status: string;
    created_at: Date;
    updated_at: Date;
  }[];
  oneTimePurchases: {
    id: string;
    product: string;
    providerCustomerId: string;
    created_at: Date;
    updated_at: Date;
  }[];
}

export async function GET() {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Using Prisma raw query notation to exemplify other ways to query the database on this template
  const [subscriptions, oneTimePurchases] = await Promise.all([
    prisma.$queryRaw`
      SELECT id, product, providerCustomerId, status, created_at, updated_at
      FROM subscription
      WHERE userId = ${session.user.id}
      ORDER BY created_at DESC
    `,
    prisma.$queryRaw`
      SELECT id, product, providerCustomerId, created_at, updated_at
      FROM onetimepurchase
      WHERE userId = ${session.user.id}
      ORDER BY created_at DESC
    `,
  ]);

  console.log("Subscriptions: ", JSON.stringify(subscriptions));

  return NextResponse.json({
    subscriptions,
    oneTimePurchases,
  } as UserPurchasesResponse);
}
