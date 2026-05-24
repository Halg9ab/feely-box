"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { UnsplashPhoto } from "@/app/types";

interface ImageCardProps {
  photo: UnsplashPhoto;
  initialFavorited?: boolean;
  onUnfavorite?: (photoId: string) => void;
}

const UTM = "?utm_source=feely_mood_box&utm_medium=referral";
const STORAGE_KEY = "feely-favorites";

export default function ImageCard({
  photo,
  initialFavorited,
  onUnfavorite,
}: ImageCardProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited ?? false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (initialFavorited !== undefined) return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const favorites: UnsplashPhoto[] = JSON.parse(stored);
      setIsFavorited(favorites.some((f) => f.id === photo.id));
    }
  }, [photo.id, initialFavorited]);

  const toggleFavorite = useCallback(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites: UnsplashPhoto[] = stored ? JSON.parse(stored) : [];

    if (isFavorited) {
      const updated = favorites.filter((f) => f.id !== photo.id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsFavorited(false);
      onUnfavorite?.(photo.id);
    } else {
      const updated = [...favorites, photo];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsFavorited(true);
    }
  }, [isFavorited, photo, onUnfavorite]);

  const photographerUrl = `${photo.user.links.html}${UTM}`;

  return (
    <div className="group rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
      <div className="relative">
        <Image
          src={photo.urls.regular}
          alt={photo.alt_description || "Nail design"}
          width={photo.width}
          height={photo.height}
          className={`w-full h-auto transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {!isLoaded && (
          <div
            className="absolute inset-0 bg-feely-pink/20 animate-pulse"
            style={{ minHeight: "200px" }}
          />
        )}
        <button
          onClick={toggleFavorite}
          aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isFavorited
                ? "fill-feely-rose text-feely-rose"
                : "text-feely-brown-light"
            }`}
          />
        </button>
      </div>
      <div className="px-4 py-3">
        <a
          href={photographerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-feely-brown-light hover:text-feely-rose transition-colors duration-200"
        >
          Photo by {photo.user.name}
        </a>
      </div>
    </div>
  );
}
