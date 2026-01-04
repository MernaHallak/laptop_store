interface SpecsSectionProps {
  specs: Record<string, Record<string, string>>;
}

export function SpecsSection({ specs }: SpecsSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="mb-6">Technical Specifications</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(specs).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="mb-4 text-blue-600">{category}</h3>
            <div className="space-y-3">
              {Object.entries(items).map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[140px_1fr] gap-4 py-2 border-b border-neutral-100 last:border-0"
                >
                  <div className="text-neutral-500">{label}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
