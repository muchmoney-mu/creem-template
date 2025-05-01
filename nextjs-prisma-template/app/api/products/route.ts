import { Creem } from "creem";
import { NextResponse } from "next/server";

const creem = new Creem({
  serverIdx: 1,
});

export async function GET() {
  const apiKey = process.env.CREEM_API_KEY;

  try {
    const products = await creem.searchProducts({
      xApiKey: apiKey as string,
      pageNumber: 0,
      // It is recomended to use a smaller page size for performance reasons
      pageSize: 100,
    });

    // Return the products directly since the Creem API already returns
    // in the format we need with items and pagination
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
