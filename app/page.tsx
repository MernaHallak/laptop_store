'use client';

import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { ShopCard } from '@/components/ShopCard';
import { getShopCategories, shops } from '@/lib/data';
import type { Shop } from '@/lib/types';

export default function HomePage() {
  const categories = useMemo(() => getShopCategories(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredShops = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return shops.filter((shop) => {
      const matchesQuery =
        q.length === 0 ||
        shop.name.toLowerCase().includes(q) ||
        shop.location.toLowerCase().includes(q) ||
        shop.tagline.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded" aria-hidden />
              <span className="text-xl font-semibold">LaptopMarket</span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <button className="text-gray-600 hover:text-black transition-colors">Sellers</button>
              <button className="text-gray-600 hover:text-black transition-colors">About</button>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                List your shop
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Discover Top Laptop Retailers</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our curated selection of trusted laptop vendors. Find the perfect store for your needs.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for shops by name, location, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
              />
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* Category Filters */}
            {showFilters && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-3">Category</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={[
                          'px-4 py-2 rounded-lg transition-colors text-sm',
                          selectedCategory === category
                            ? 'bg-black text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100',
                        ].join(' ')}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shop Grid (this is the section you referenced) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No shops found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 text-black hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
