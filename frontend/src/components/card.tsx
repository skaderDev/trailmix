// components/ui/TrailCard.tsx

import clsx from "clsx";

type TrailCardProps = {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  chips?: string[];
  footer?: React.ReactNode;
  className?: string;
};

export default function Card({
  title,
  subtitle,
  imageUrl,
  chips = [],
  footer,
  className,
}: TrailCardProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/10",
        className
      )}
    >
      {/* Header */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-zinc-900">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-zinc-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-[linear-gradient(135deg,#ecfdf5_0%,#d8ede0_50%,#efe0bd_100%)]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-emerald-900/45">
            No image
          </div>
        )}
      </div>

      {/* Chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 p-4 pb-0">
          {chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 p-4">
        {footer}
      </div>
    </div>
  );
}
