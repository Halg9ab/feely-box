"use client";

import { UnsplashPhoto } from "@/app/types";
import ImageCard from "./ImageCard";

interface ImageGridProps {
  photos: UnsplashPhoto[];
  showInitialFavorited?: boolean;
  onUnfavorite?: (photoId: string) => void;
}

export default function ImageGrid({
  photos,
  showInitialFavorited,
  onUnfavorite,
}: ImageGridProps) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="break-inside-avoid mb-4">
          <ImageCard
            photo={photo}
            initialFavorited={showInitialFavorited ? true : undefined}
            onUnfavorite={onUnfavorite}
          />
        </div>
      ))}
    </div>
  );
}
