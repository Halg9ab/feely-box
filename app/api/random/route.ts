import { NextResponse } from "next/server";
import { UnsplashPhoto } from "@/app/types";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const NAIL_QUERIES = [
  "nail art",
  "manicure",
  "nail design",
  "painted nails",
  "gel nails",
];

export async function GET() {
  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Unsplash API key not configured" },
      { status: 500 }
    );
  }

  try {
    const randomQuery =
      NAIL_QUERIES[Math.floor(Math.random() * NAIL_QUERIES.length)];

    const url = new URL("https://api.unsplash.com/photos/random");
    url.searchParams.set("query", randomQuery);
    url.searchParams.set("count", "15");

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const photos: UnsplashPhoto[] = await response.json();
    return NextResponse.json(photos);
  } catch (error) {
    console.error("Random error:", error);
    return NextResponse.json(
      { error: "Failed to fetch nail designs. Please try again." },
      { status: 500 }
    );
  }
}
