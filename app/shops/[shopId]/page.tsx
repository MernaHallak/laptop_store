import { notFound } from "next/navigation";
import { getProductsForShop, shops } from "@/lib/data";
import { ProductsClient } from "./products-client";


export default async function ShopProductsPage({
  params,
}: {
  params: Promise<{ shopId: string }>;
}) {
  const { shopId } = await params;

  const id = Number(shopId);
  if (!Number.isFinite(id)) notFound();

  const shop = shops.find((s) => s.id === id);
  if (!shop) notFound();

  const products = getProductsForShop(id);

  return <ProductsClient shop={shop} products={products} />;
}
