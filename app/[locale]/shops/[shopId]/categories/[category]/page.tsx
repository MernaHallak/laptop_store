import { notFound } from "next/navigation";
import { getProductsForShop, shops} from "@/lib/data";
import { SHOP_CATEGORY_KEYS } from "@/lib/types";
import ShopProductsClient from "../../products/ShopProductsClient";

type Props = {
  params: Promise<{ locale: string; shopId: string; category: string }>;
};

export default async function CategoryProductsPage({ params }: Props) {
  const { locale, shopId, category } =await params;

  const id = Number(shopId);
  if (!Number.isFinite(id)) notFound();

  const shop = shops.find((s) => s.id === id) ?? null;
  if (!shop) notFound();

  // (اختياري) تحقق أن category ضمن المفاتيح المسموحة
  if (!SHOP_CATEGORY_KEYS.includes(category as any)) notFound();

  const all = getProductsForShop(id);
  const filteredProducts = all.filter((p) => p.categoryKey === category);

  return <ShopProductsClient locale={locale} shop={shop} products={filteredProducts} category={category} />;
}
