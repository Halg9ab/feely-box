"use client";

import { useState } from "react";
import { Search, Shuffle, Sparkles } from "lucide-react";
import { UnsplashPhoto } from "@/app/types";
import ImageGrid from "@/app/components/ImageGrid";
import LoadingSkeleton from "@/app/components/LoadingSkeleton";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentMood, setCurrentMood] = useState("");
  const [searchMessage, setSearchMessage] = useState<string | null>(null);

  const fetchPhotos = async (url: string, mood?: string) => {
    setIsLoading(true);
    setError(null);
    setSearchMessage(null);
    setHasSearched(true);
    setCurrentMood(mood ?? "");
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.error ?? "Something went wrong. Please try again."
        );
      }
      // Random endpoint returns UnsplashPhoto[]; search returns { photos, message? }
      if (Array.isArray(data)) {
        setPhotos(data as UnsplashPhoto[]);
      } else {
        setPhotos(data.photos as UnsplashPhoto[]);
        if (data.message) setSearchMessage(data.message as string);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setPhotos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    await fetchPhotos(`/api/search?q=${encodeURIComponent(trimmed)}`, trimmed);
  };

  const handleSurpriseMe = async () => {
    setQuery("");
    await fetchPhotos("/api/random", "surprise");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="w-6 h-6 text-feely-lavender" />
          <h1 className="font-serif text-4xl sm:text-5xl text-feely-brown">
            The Feely Mood Box
          </h1>
          <Sparkles className="w-6 h-6 text-feely-lavender" />
        </div>
        <p className="text-feely-brown-light text-lg mb-8">
          Find your perfect nail look — by mood ✨
        </p>

        {/* Search form */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-feely-brown-light pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="How are you feeling? (e.g. soft and dreamy)"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-feely-pink/50 bg-white text-feely-brown placeholder:text-feely-brown-light/50 focus:outline-none focus:ring-2 focus:ring-feely-rose/30 focus:border-feely-rose/50 shadow-sm transition-all duration-200"
            />
          </div>
          <div className="flex gap-2 sm:flex-shrink-0">
            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="flex-1 sm:flex-none px-6 py-3.5 rounded-2xl bg-feely-rose text-white font-medium shadow-sm hover:bg-feely-rose/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleSurpriseMe}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-3.5 rounded-2xl border border-feely-pink bg-white text-feely-brown hover:bg-feely-pink/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer"
              title="Surprise Me"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Surprise Me</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results */}
      {hasSearched && (
        <div>
          {!isLoading && currentMood && currentMood !== "surprise" && (
            <p className="text-feely-brown-light text-sm mb-6">
              Showing nail looks for{" "}
              <span className="text-feely-rose font-medium">
                &ldquo;{currentMood}&rdquo;
              </span>
            </p>
          )}

          {isLoading && <LoadingSkeleton />}

          {!isLoading && error && (
            <div className="text-center py-20">
              <p className="text-3xl mb-3">😔</p>
              <p className="font-serif text-xl text-feely-brown mb-2">
                Oops, something went wrong
              </p>
              <p className="text-feely-brown-light">{error}</p>
            </div>
          )}

          {!isLoading && !error && photos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-3xl mb-3">🌸</p>
              <p className="font-serif text-xl text-feely-brown mb-2">
                Hmm, we couldn&apos;t find that vibe
              </p>
              <p className="text-feely-brown-light">
                Try another mood — like &ldquo;soft and dreamy&rdquo; or
                &ldquo;bold and edgy&rdquo;
              </p>
            </div>
          )}

          {!isLoading && !error && photos.length > 0 && (
            <div className="animate-fade-in">
              {searchMessage && (
                <p className="text-sm text-feely-brown-light bg-feely-pink/20 rounded-2xl px-4 py-3 mb-6">
                  🌸 {searchMessage}
                </p>
              )}
              <ImageGrid photos={photos} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
