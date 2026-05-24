import Link from "next/link";
import { Heart, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-feely-cream/80 backdrop-blur-sm border-b border-feely-pink/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-feely-rose" />
          <span className="font-serif text-xl text-feely-brown group-hover:text-feely-rose transition-colors duration-200">
            The Feely Mood Box
          </span>
        </Link>
        <Link
          href="/favorites"
          className="flex items-center gap-1.5 text-sm text-feely-brown-light hover:text-feely-rose transition-colors duration-200"
        >
          <Heart className="w-4 h-4" />
          <span className="hidden sm:inline">My Favorites</span>
        </Link>
      </div>
    </header>
  );
}
