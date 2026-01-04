import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, shops } from '@/lib/data';
import { ProductDetailsClient } from './product-details-client';

export default function ProductDetailsPage({
  params,
}: {
  params: { shopId: string; productId: string };
}) {
  const shopId = Number(params.shopId);
  const productId = Number(params.productId);

  if (!Number.isFinite(shopId) || !Number.isFinite(productId)) notFound();

  const shop = shops.find((s) => s.id === shopId);
  if (!shop) notFound();

  const product = products.find((p) => p.id === productId && p.shopId === shopId);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
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
            <h1 className="mt-1 text-2xl font-semibold text-neutral-900 line-clamp-2">{product.name}</h1>
          </div>

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
  );
}
