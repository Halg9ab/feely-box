"use client";

import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import { UnsplashPhoto } from "@/app/types";
import ImageGrid from "@/app/components/ImageGrid";

const STORAGE_KEY = "feely-favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<UnsplashPhoto[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
    setIsLoaded(true);
  }, []);

  const handleUnfavorite = (photoId: string) => {
    const updated = favorites.filter((f) => f.id !== photoId);
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  if (!isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-8 w-48 bg-feely-pink/20 rounded-full animate-pulse mb-8" />
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="break-inside-avoid mb-4">
              <div className="rounded-3xl overflow-hidden bg-white shadow-sm animate-pulse">
                <div
                  className="bg-feely-pink/20"
                  style={{ paddingBottom: "130%" }}
                />
                <div className="px-4 py-3">
                  <div className="h-3 w-28 bg-feely-pink/20 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-6 h-6 text-feely-rose fill-feely-rose" />
        <h1 className="font-serif text-3xl text-feely-brown">My Favorites</h1>
        {favorites.length > 0 && (
          <span className="text-sm text-feely-brown-light">
            ({favorites.length} {favorites.length === 1 ? "design" : "designs"})
          </span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-24">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-feely-lavender" />
            <Sparkles className="w-4 h-4 text-feely-pink" />
          </div>
          <p className="font-serif text-2xl text-feely-brown mb-3">
            No favorites yet!
          </p>
          <p className="text-feely-brown-light mb-8 max-w-xs mx-auto">
            Start exploring and tap the heart on the designs you love.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-feely-rose text-white font-medium shadow-sm hover:bg-feely-rose/90 transition-all duration-200"
          >
            Explore Nail Looks ✨
          </Link>
        </div>
      ) : (
        <div className="animate-fade-in">
          <ImageGrid
            photos={favorites}
            showInitialFavorited={true}
            onUnfavorite={handleUnfavorite}
          />
        </div>
      )}
    </div>
  );
}
