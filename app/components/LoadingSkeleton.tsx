const HEIGHTS = [140, 120, 160, 130, 150, 125, 145, 135, 155, 120, 140, 130, 160, 125, 145];

export default function LoadingSkeleton() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {HEIGHTS.map((height, i) => (
        <div key={i} className="break-inside-avoid mb-4">
          <div className="rounded-3xl overflow-hidden bg-white shadow-sm animate-pulse">
            <div
              className="bg-feely-pink/20"
              style={{ paddingBottom: `${height}%` }}
            />
            <div className="px-4 py-3">
              <div className="h-3 w-28 bg-feely-pink/20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
