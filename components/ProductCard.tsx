
import { Link } from "@/i18n/navigation";
import type { Product } from '@/lib/types';
import { useTranslations } from 'next-intl';

const dollar_value = 1150;
export function ProductCard({ product }: { product: Product }) {
  const tProducts = useTranslations("products");
    const priceSYP = product.price * dollar_value;
  return (
    // {/* استخدم Link تبع next-intl (بيحط الـ locale لحاله) عملنالو اعدادت لل routing.ts و navigation.ts لشتغل */}
    // او بستخدم ال uselocale لجيب ال locale من المسار واعمل الرابط يدويا او بمرر اللغة كبروب ولكن هاد مو احسن ما يمكن 
    <Link href={`/shops/${product.shopId}/products/${product.id}`} >
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

          {/* <span className="shrink-0 text-xs px-2 py-1 rounded-full border border-neutral-200 text-neutral-700 bg-neutral-50">
            {product.condition}
          </span> */}
        </div>

        {/* <div className="space-y-2 text-sm">
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
        </div> */}
        
<p className="text-sm text-neutral-600 line-clamp-2">
  {tProducts(`${product.descriptionKey}.desc`)}
</p>

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-200">
          <p className="font-bold text-xl text-neutral-900">{product.price.toLocaleString("en-US")}$</p>
          <p className="text-sm text-neutral-900">{priceSYP.toLocaleString("en-US")} ل.س</p>
          {/* بتحوّل الرقم لنص “مترتّب” حسب لغة/بلد معيّن (بتحط فواصل وتنسيق أرقام صحيح). */}
        </div>
      </div>
    </div>
    </Link>
  );
}
