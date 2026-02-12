import Link from "next/link";
import {getTranslations} from "next-intl/server";
import {products, shops} from "@/lib/data";
import { SHOP_CATEGORY_KEYS } from "@/lib/types";
import { notFound, redirect } from "next/navigation";
import { getPresentCategoryKeys, SHOP_CATEGORY_CARDS } from "@/lib/shopCategories";
import { Navbar } from "@/components/Navbar";
import NavbarShop from "@/components/NavbarShop";

type Props = {
  params: Promise<{locale: "ar" | "en"; shopId: string}>;
};

export default async function CategoriesPage({params}: Props) {
  const {locale, shopId} = await params;
  const shop = shops.find((s) => String(s.id) === String(shopId))?? null;
  if (!shop) notFound(); //لازم اعمل هيك لفرضا عدم وجود محل لان بالدالة تحت انا مررنلا محل وهل الشي رح يسبب مشكلة اذا ما كان موجود
  const t = await getTranslations("ShopCategories");


//   const shopProducts = products.filter((p) => String(p.shopId) === String(shopId));

//    const presentKeys = SHOP_CATEGORY_KEYS.filter((key) =>
//     shopProducts.some((p) => p.categoryKey === key)
//   );
//   if (presentKeys.length === 1) {
//   redirect(`/${locale}/shops/${shopId}/products`);
// }
const presentKeys=getPresentCategoryKeys(shopId)


  const cards = SHOP_CATEGORY_CARDS.filter((c) => presentKeys.includes(c.key));
  const showAllProducts = presentKeys.length > 1;

  return ( 
    <div>
      <NavbarShop locale={locale} shop={shop} />
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.key}
            href={`/${locale}/shops/${shopId}/categories/${card.key}`}
            className="block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold">{t(card.key)}</h3>
              <p className="text-gray-600 text-sm mt-1">{t(`${card.key}Desc`)}</p>
              <div className="mt-4 text-sm font-medium">{t("view")}</div>
            </div>
          </Link>
        ))}

        {showAllProducts && (
          <Link
            href={`/${locale}/shops/${shopId}/products`}
            className="block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold">{t("allProducts")}</h3>
              <p className="text-gray-600 text-sm mt-1">{t("allProductsDesc")}</p>
              <div className="mt-4 text-sm font-medium">{t("view")}</div>
            </div>
          </Link>
        )}
      </div>
    </main>
    </div>
  );
}
