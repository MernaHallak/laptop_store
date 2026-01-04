import { notFound } from 'next/navigation';
import { getProductsForShop, shops } from '@/lib/data';
import { ProductsClient } from './products-client';

export default function ShopProductsPage({ params }: { params: { shopId: string } }) {
  const shopId = Number(params.shopId);
  if (!Number.isFinite(shopId)) notFound();

  const shop = shops.find((s) => s.id === shopId);
  if (!shop) notFound();

  const products = getProductsForShop(shopId);

  return <ProductsClient shop={shop} products={products} />;
}
