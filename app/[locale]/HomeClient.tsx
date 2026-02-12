"use client";

import { useMemo, useState } from "react";
import { Filter, Search, ArrowRight } from "lucide-react";
import { ShopCard } from "@/components/ShopCard";
import type { Shop } from "@/lib/types";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { useTranslations } from "next-intl";
import { Pagination } from "@/components/Pagination";

export default function HomeClient({
  shops,
  categories,
}: {
  shops: Shop[];
  categories: string[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const tShop = useTranslations("Shop");
  const tCommon = useTranslations("Common");

  const filteredShops = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return shops.filter((shop) => {
      const matchesQuery =
        q.length === 0 ||
        shop.name.toLowerCase().includes(q) ||
        shop.location.toLowerCase().includes(q) ||
        shop.tagline.toLowerCase().includes(q);

      const matchesCategory = selectedCategory === "All" || shop.category === selectedCategory;

      return matchesQuery && matchesCategory;
    });
  }, [shops, searchQuery, selectedCategory]);

  // pagenation
  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredShops.length / itemsPerPage));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = filteredShops.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Nav */}
      <Navbar />

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
            {/* <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for shops by name, location, or specialty..."
                value={searchQuery}
                //                 e.target.value مو بياخد قيمة searchQuery القديمة…
                // هو بياخد القيمة الحالية داخل الـ input بعد ما المستخدم كتب
                // ‏القيمة الحالية بيجيبها من الـ DOM نفسه (العنصر <input> الحقيقي بالمتصفح). في قيمة “حقيقيةاو داخلة منقلا” بالمتصفح (input.value) تتغير مع الكتابة. يعني هي نفس e.target.value
                // الكتابة بتصير داخل الـ input أولًا (بالمتصفح) هي القيمة بتكون داخل المتصفح مو ظاهرة
                // onChange بياخد القيمة الجديدة من e.target.value
                // وبعدين React بيخلّي value يطابقها بعد الرندر.وبتظهر قيمة البحث على الشاشة
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // مهم: لما يغيّر البحث ما تضل على صفحة قديمة
                }}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none bg-white"
              />
            </div> */}

            {/* <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div> */}

            {/* Category Filters */}

            {/* {showFilters && (
              <div className="mt-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <p className="text-sm text-gray-700 mb-3">Category</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setCurrentPage(1); // مهم: الفلترة تغير النتائج، فبنرجع لأول صفحة
                        }}
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
            )} */}
          </div>
        </div>
      </div>

      {/* Shop Grid (this is the section you referenced) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <p className="text-gray-600">
            {/* {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} found */}
            {tShop("countFound", { count: filteredShops.length })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>

        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">{tShop("emptyState")}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
              className="mt-4 text-black hover:underline"
            >
              {tCommon("clearFilters")}
            </button>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          previousLabel={tCommon("previous")}
          nextLabel={tCommon("next")}
        />
      </div>
    </div>
  );
}
