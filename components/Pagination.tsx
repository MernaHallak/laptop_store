"use client";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (nextPage: number) => void;

  // Labels (we pass them from next-intl in the parent)
  previousLabel: string;
  nextLabel: string;
};

export function Pagination({
  page,
  totalPages,
  onPageChange,
  previousLabel,
  nextLabel,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="px-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm disabled:opacity-50"
        disabled={page === 1}
      >
        {previousLabel}
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={[
            "px-3 py-2 rounded-lg text-sm",
            p === page ? "bg-black text-white" : "border border-neutral-200 bg-white hover:bg-neutral-100",
          ].join(" ")}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="px-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm disabled:opacity-50"
        disabled={page === totalPages}
      >
        {nextLabel}
      </button>
    </div>
  );
}
