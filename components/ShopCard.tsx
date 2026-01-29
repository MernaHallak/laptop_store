import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { Shop } from '@/lib/types';

interface ShopCardProps {
  shop: Shop;
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <div
      className="block bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      aria-label={`Open ${shop.name} store`}
    >
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mb-4 bg-gray-100">
            {/* Using <img> to avoid Next image domain config for demo data */}
            <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
          </div>

          <h3 className="text-lg font-semibold mb-1">{shop.name}</h3>

          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{shop.location}</span>
          </div>

          <p className="text-gray-600 text-sm mb-5 min-h-[40px]">{shop.tagline}</p>

          <div className="w-full">
            {/* على عنصر انلاين متل link , a , span لا يطبق w , h , m , p فبحول العنصر لنوع تاني حسب حاجتي متل inline-flex او flex*/}
            {/* flex هو عنصر بلوك بياخد كل المساحة والولاد البقلبو بيجو حد بعض  */}
            {/* inline-flex  بحول العنصر لاينلاين ولكن يطبق w , h , m , p  ويتم النعامل مع كل خصاىص ال flex نفس ال flex ولاكن هون انلاين بدل ما يكون بلوك*/}
            <Link href={`/shops/${shop.id}`} className="inline-flex w-full justify-center bg-black text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
              View Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
