"use client";
// هو الاحسن بما انو بدي استخدمو بكذا صفحة وليس فقط بصفحة ال products بانو حطو بملف الكومبونانت ليكون عام
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";
import type { Product, ProductCondition, ProductFilters, Shop } from "@/lib/types";
import { Pagination } from "@/components/Pagination";
import { useTranslations } from "next-intl";
import { Global } from "recharts";
import NavbarSearch from "@/components/NavbarSearch";
import NavbarShop from "@/components/NavbarShop";

type SortBy = "featured" | "price-low" | "price-high" | "name-az" | "name-za";

export default function ShopProductsClient({
  locale,
  shop,
  products,
  category,
}: {
  locale: string;
  shop: Shop;
  products: Product[];
  category?: string;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("price-low");
  const [currentPage, setCurrentPage] = useState(1);
const tCommon = useTranslations("Common");
  //   {shop?.name} وقت نستدعيا منحط اشارة استفهام لان ممكن تكون null
  // هون ما عاد لازم ? لأن السيرفر ضمن إن shop موجودة، بس تركت الملاحظة.
  const priceBounds = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  //   بدل ما نخزّن كل فلتر لحاله بـ state منفصلة، نخزنهم كلهم بكائن واحد:

  // يسهل تمريرهم لمكوّن FilterSidebar
  // ويسهل تحديثهم دفعة واحدة
  // ضمن التفاعل الواحد، فيك تغيّري كذا مفتاح مرة وحدة بـ setFilters واحدة.
  // مثال: لما تختاري ماركة، بدك كمان تصفّري الصفحة وتفضّي CPUs
  // setFilters(prev => ({
  //   ...prev,
  //   brands: newBrands,
  //   cpus: [],
  const [filters, setFilters] = useState<ProductFilters>(() => ({
    brands: [],
    cpus: [],
    rams: [],
    storages: [],
    gpus: [],
    conditions: [],
    priceRange: [priceBounds.min, priceBounds.max],
  }));
  // priceBounds = حدود محسوبة من المنتجات (الحقيقة) للحدود المسموحة
  // filters.priceRange = اختيار المستخدم (state) اول مرة بتكون قيمتا من قيمة priceBounds بعدين بتصير على حسب شو المستخدم بيختار

  // If products change (different shop), reset the price range sensibly.
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [priceBounds.min, priceBounds.max],
    }));
  }, [priceBounds.min, priceBounds.max]);
  // فيني حط [products] بس متل مو حاطة احسن لان مربوط بالسبب الرىيسي للتعديل وحتى ما يشتغل عالفاضي اذا تغيرت فيا المنتجات بس ضلو نفس اسعار القبل

  const options = useMemo(() => {
    const uniq = (arr: string[]) => Array.from(new Set(arr)).sort((a, b) => a.localeCompare(b));
    const conditions = uniq(products.map((p) => p.condition)) as ProductCondition[];

    return {
      brands: uniq(products.map((p) => p.brand)),
      cpus: uniq(products.map((p) => p.cpu)),
      rams: uniq(products.map((p) => p.ram)),
      storages: uniq(products.map((p) => p.storage)),
      gpus: uniq(products.map((p) => p.gpu)),
      //  conditions: uniq(products.map((p) => p.condition)) as ProductCondition[], فيني حط هيك بس هي أقل “نظافة” شوي لأن الكاست موجود جوّا كائن كبير.
      conditions,
      minPrice: priceBounds.min,
      maxPrice: priceBounds.max,
    };
  }, [products, priceBounds.min, priceBounds.max]);
  // [products] كافية بس حطيت باقي القيم للاحتياط ولتقول انو كمان ال options بتعتمد علين كمان

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      const matchesQuery = q.length === 0 || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchesPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

      const inList = (selected: string[], value: string) => selected.length === 0 || selected.includes(value);

      return (
        matchesQuery &&
        matchesPrice &&
        inList(filters.brands, p.brand) &&
        inList(filters.cpus, p.cpu) &&
        inList(filters.rams, p.ram) &&
        inList(filters.storages, p.storage) &&
        inList(filters.gpus, p.gpu) &&
        inList(filters.conditions, p.condition)
      );
    });
  }, [products, searchQuery, filters]);

  const sorted = useMemo(() => {
    // نسخ filtered: لأن sort() تغيّر المصفوفة نفسها، وهاد ممكن يخرب بياناتك بالحالة الافتراضية
    const list = [...filtered];

    switch (sortBy) {
      case "price-low":
        // قاعدة دالة ال sort():
        // إذا الناتج موجب → b يجي قبل a.(b اول)
        // إذا الناتج سلبي → a يجي قبل b.(a اول)
        return list.sort((a, b) => a.price - b.price);
      case "price-high":
        return list.sort((a, b) => b.price - a.price);
      case "name-az":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "name-za":
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list; // featured: keep data order
    }
  }, [filtered, sortBy]);

  const itemsPerPage = 9;
  // Math.max(1, ...):لتجنب حالات 0 صفحات اذا ما كان في منتجات اللي بتكسر UI
  const totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
  // تثبيت الصفحة الحالية ضمن الحدود
  // إذا currentPage أكبر من totalPages (مثلاً كنت بصفحة 5 وبعدين الفلترة صغرت النتائج وصاروا صفحتين يعني التوتال
  // → هذا السطر بينزّلك لأقصى صفحة موجودة فعليًا.
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * itemsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);

  function clearFilters() {
    setSearchQuery("");
    setSortBy("price-low");
    setCurrentPage(1);
    setFilters({
      brands: [],
      cpus: [],
      rams: [],
      storages: [],
      gpus: [],
      conditions: [],
      priceRange: [priceBounds.min, priceBounds.max],
    });
  }

  function handleWhatsAppContact() {
    // Replace with your real number, e.g. '905xxxxxxxxx'
    const phone = "0000000000";
    const message = encodeURIComponent(`Hi! I'm interested in products from ${shop.name}.`);
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Bar */}
      <NavbarShop locale={locale} shop={shop} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Filters */}
          <div className="lg:sticky lg:top-24 self-start">
            <FilterSidebar filters={filters} setFilters={setFilters} options={options} onClear={clearFilters} category={category} />
          </div>

          {/* Main */}
          <main>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-4">
              <p className="text-sm text-neutral-600">
                {sorted.length} {sorted.length === 1 ? "product" : "products"} found
              </p>
    <div className="flex-1 max-w-2xl relative sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products by name or brand..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              />
            </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortBy);
                    setCurrentPage(1);
                  }}
                  className="text-sm rounded-lg border border-neutral-200 bg-white px-3 py-2"
                >
                  {/* <option value="featured">Featured</option> */}
                  <option value="price-low">Low to High</option>
                  <option value="price-high">High to Low</option>
                  <option value="name-az">A–Z</option>
                  <option value="name-za">Z–A</option>
                </select>
              </div>
            </div>

            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center">
                <p className="text-neutral-600">No products found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-black hover:underline">
                  Clear all filters
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
                  {/* Pagination هي بدون الفانكشن الفوق*/}  
            {/* {totalPages > 1 && (
              <div className="flex items-center justify-center flex-wrap gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm disabled:opacity-50"
                  disabled={page === 1}
                >
                  Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={[
                      "px-3 py-2 rounded-lg text-sm",
                      p === page ? "bg-black text-white" : "border border-neutral-200 bg-white hover:bg-neutral-100",
                    ].join(" ")}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-2 rounded-lg border border-neutral-200 bg-white text-sm disabled:opacity-50"
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )} */}
          </main>
        </div>
      </div>

      {/* WhatsApp Contact Button */}
      <button
        onClick={handleWhatsAppContact}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
