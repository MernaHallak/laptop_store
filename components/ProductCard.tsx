import Link from 'next/link';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-neutral-900 truncate">{product.name}</h3>
            <p className="text-sm text-neutral-600 truncate">{product.brand}</p>
          </div>

          <span className="shrink-0 text-xs px-2 py-1 rounded-full border border-neutral-200 text-neutral-700 bg-neutral-50">
            {product.condition}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500">CPU</span>
            <span className="font-medium text-neutral-700 text-right line-clamp-1">{product.cpu}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500">RAM</span>
            <span className="font-medium text-neutral-700 text-right line-clamp-1">{product.ram}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500">Storage</span>
            <span className="font-medium text-neutral-700 text-right line-clamp-1">{product.storage}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-neutral-500">GPU</span>
            <span className="font-medium text-neutral-700 text-right line-clamp-1">{product.gpu}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200">
          <p className="font-bold text-xl text-neutral-900">${product.price}</p>

          {/* Details route */}
          <Link href={`/shops/${product.shopId}/products/${product.id}`} className="text-sm px-3 py-2 rounded-lg bg-black text-white hover:bg-neutral-800 transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
