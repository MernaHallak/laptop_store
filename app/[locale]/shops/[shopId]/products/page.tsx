import { notFound } from "next/navigation";
import { getProductsForShop, shops } from "@/lib/data";
import ShopProductsClient from "./ShopProductsClient";



type Props = {
  params: Promise<{ locale: string; shopId: string }>;
};

export default async function ProductsPage({ params }: Props) {
  const { locale, shopId } = await params;
  const id = Number(shopId);
  if (!Number.isFinite(id)) notFound();

  const shop = shops.find((s) => s.id === id) ?? null;
  if (!shop) notFound();

  const products = getProductsForShop(id);

  return <ShopProductsClient locale={locale} shop={shop} products={products} />;
}
