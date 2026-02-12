import Link from "next/link";
import { notFound } from "next/navigation";
import { products, shops } from "@/lib/data";
import {ProductDetailsClient} from "./product-details-client";
import NavbarSearch from "@/components/NavbarSearch";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ shopId: string; productId: string }>;
}) {
  const { shopId, productId } = await params;

  const sid = Number(shopId); 
  const pid = Number(productId);
  // Number("12a")   // NaN

  if (!Number.isFinite(sid) || !Number.isFinite(pid)) notFound();

  const shop = shops.find((s) => s.id === sid);
  if (!shop) notFound();

  const product = products.find((p) => p.id === pid && p.shopId === sid);
  if (!product) notFound();
// كنت عم قول لي حطينا الشرط p.shopId === sid اذا نحنا تاكدنا منو بالشرط القبلو بس ما بكفي لان هو رح يلاقي المنتج ويعرضو ولو ما كان لنفس المحل  فهيك المنتج بينعرض فيه اسم المحل رغم انو مو تابع الو المحل
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
           {/* 
min-w-0: يسمح لهذا البلوك داخل flex  أنه ينضغط (يصغر بالعرض) بدل ما يتمسك بعرض المحتوىmin-width: auto لحتى نقدر نحطلو نقاط باستخدام line-clamp-2 أو "truncate اذا كان عندي سطر واحد بس"
min-w-0 بيساعد تطلع النقاط بالحالات اللي flex كان مانع الانضغاط، بسبب min-width: auto اليبفرضا ال flex على العناصر الداخلية. بدون هاد الضغط كان الزر اللي عاليمين تبع العودة للمنتجات اتاكل وانا عم صغر حجم الشاشة للموبايل مثلا بس وقت ضغطت يلي عاليسار وعملت نقاط صار الزر الو محل 
*/} 
            <div className="text-sm text-neutral-500">
              <Link href="/" className="hover:underline">
                Shops
              </Link>
              <span className="mx-2">/</span>
              <Link href={`/shops/${shop.id}`} className="hover:underline">
                {shop.name}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-neutral-700">Product</span>
            </div>
            <h1 className="mt-1 text-2xl font-semibold text-neutral-900 line-clamp-2">
{/* line-clamp-2 معناها: اعرض النص على سطرين فقط حسب المساحة المتاحة ، وإذا طول زيادة → قص وحط نقاط... */}   
              {product.name}
            </h1>
          </div>
            <NavbarSearch />
          <Link
            href={`/shops/${shop.id}`}
            className="shrink-0 text-sm px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors"
          >
            Back to products
          </Link>
        </div>

        <ProductDetailsClient shop={shop} product={product} />
      </div>
    </div>
  );}
