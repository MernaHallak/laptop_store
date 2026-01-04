'use client';

import type { ProductCondition, ProductFilters } from '@/lib/types';

type FilterOptions = {
  brands: string[];
  cpus: string[];
  rams: string[];
  storages: string[];
  gpus: string[];
  conditions: ProductCondition[];
  minPrice: number;
  maxPrice: number;
};

export function FilterSidebar({
  filters,
  setFilters,
  options,
  onClear,
}: {
  filters: ProductFilters;
  setFilters: (next: ProductFilters) => void;
  options: FilterOptions;
  onClear: () => void;
}) {
  function toggle(listKey: keyof Omit<ProductFilters, 'priceRange'>, value: string) {
    const list = filters[listKey] as string[];
    const exists = list.includes(value);
    const nextList = exists ? list.filter((v) => v !== value) : [...list, value];

    setFilters({ ...filters, [listKey]: nextList } as ProductFilters);
  }

  function setMinPrice(v: number) {
    const clamped = Math.max(options.minPrice, Math.min(v, filters.priceRange[1]));
    setFilters({ ...filters, priceRange: [clamped, filters.priceRange[1]] });
  }

  function setMaxPrice(v: number) {
    const clamped = Math.min(options.maxPrice, Math.max(v, filters.priceRange[0]));
    setFilters({ ...filters, priceRange: [filters.priceRange[0], clamped] });
  }

  return (
    <aside className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="font-semibold text-neutral-900">Filters</h2>
        <button onClick={onClear} className="text-sm text-neutral-600 hover:text-black">
          Clear
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Price */}
        <section>
          <h3 className="text-sm font-medium text-neutral-900 mb-3">Price</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-xs text-neutral-600 w-10">Min</label>
              <input
                type="number"
                value={filters.priceRange[0]}
                min={options.minPrice}
                max={filters.priceRange[1]}
                step={50}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs text-neutral-600 w-10">Max</label>
              <input
                type="number"
                value={filters.priceRange[1]}
                min={filters.priceRange[0]}
                max={options.maxPrice}
                step={50}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>

            <div className="pt-1">
              <input
                type="range"
                min={options.minPrice}
                max={options.maxPrice}
                value={filters.priceRange[0]}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min={options.minPrice}
                max={options.maxPrice}
                value={filters.priceRange[1]}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full mt-2"
              />
              <div className="flex items-center justify-between text-xs text-neutral-600 mt-2">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        <FilterGroup title="Brand" options={options.brands} selected={filters.brands} onToggle={(v) => toggle('brands', v)} />
        <FilterGroup title="CPU" options={options.cpus} selected={filters.cpus} onToggle={(v) => toggle('cpus', v)} />
        <FilterGroup title="RAM" options={options.rams} selected={filters.rams} onToggle={(v) => toggle('rams', v)} />
        <FilterGroup title="Storage" options={options.storages} selected={filters.storages} onToggle={(v) => toggle('storages', v)} />
        <FilterGroup title="GPU" options={options.gpus} selected={filters.gpus} onToggle={(v) => toggle('gpus', v)} />
        <FilterGroup
          title="Condition"
          options={options.conditions}
          selected={filters.conditions}
          onToggle={(v) => toggle('conditions', v)}
        />
      </div>
    </aside>
  );
}

function Divider() {
  return <div className="h-px bg-neutral-200" />;
}

function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  if (options.length === 0) return null;

  return (
    <section>
      <h3 className="text-sm font-medium text-neutral-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((opt) => {
          const id = `${title}-${opt}`.replace(/\s+/g, '-').toLowerCase();
          const checked = selected.includes(opt);

          return (
            <label key={opt} htmlFor={id} className="flex items-center gap-2 cursor-pointer">
              <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(opt)}
                className="h-4 w-4 rounded border-neutral-300"
              />
              <span className="text-sm text-neutral-700">{opt}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
