export default function Footer() {
  return (
    <footer className="bg-feely-cream border-t border-feely-pink/30 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-feely-brown-light">
          Photos provided by{" "}
          <a
            href="https://unsplash.com/?utm_source=feely_mood_box&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-feely-rose hover:underline"
          >
            Unsplash
          </a>
        </p>
      </div>
    </footer>
  );
}
