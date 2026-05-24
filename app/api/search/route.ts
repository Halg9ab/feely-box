import { NextRequest, NextResponse } from "next/server";
import { UnsplashPhoto } from "@/app/types";

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const FILLER_WORDS = new Set([
  "i", "want", "something", "maybe", "with", "a", "the", "and", "or",
  "feel", "feeling", "like", "looking", "for", "some", "really", "kind", "of",
]);

function cleanQuery(raw: string): string[] {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !FILLER_WORDS.has(w));
}

async function unsplashSearch(
  query: string,
  perPage: number
): Promise<UnsplashPhoto[]> {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("orientation", "portrait");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
  });

  if (!res.ok) throw new Error(`Unsplash API error: ${res.status}`);
  const data = await res.json();
  return data.results as UnsplashPhoto[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  if (!UNSPLASH_ACCESS_KEY) {
    return NextResponse.json(
      { error: "Unsplash API key not configured" },
      { status: 500 }
    );
  }

  try {
    const keywords = cleanQuery(query);
    const keywordStr = keywords.join(" ");
    const primaryQuery = keywordStr
      ? `nails ${keywordStr} nail art manicure`
      : "nails nail art manicure";

    let photos = await unsplashSearch(primaryQuery, 30);
    let message: string | undefined;

    if (photos.length < 5) {
      const topKeywords = keywords.slice(0, 2);
      const fallbackQuery =
        topKeywords.length > 0
          ? `${topKeywords.join(" ")} nails`
          : "nail art manicure";

      photos = await unsplashSearch(fallbackQuery, 30);

      if (photos.length < 5) {
        message =
          "Only a few matches for this vibe — try a simpler mood like 'red nails' or 'soft pink'";
      }
    }

    return NextResponse.json({ photos, message });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch nail designs. Please try again." },
      { status: 500 }
    );
  }
}
