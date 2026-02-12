'use client';

import { products } from '@/lib/data';
import { Check, Package, Shield, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';



interface Variant {
  id: number;
  name: string;
  options: string[];
}

interface ProductInfoProps {
  title: string;
  price: number;
  availability: string;
  warranty: string;
  condition: string;
  productDesc : string;
  variants: Variant[];
  selectedVariants: Record<string, string>;
  onVariantChange: (variantName: string, option: string) => void;
}

export function ProductInfo({
  title,
  price,
  availability,
  warranty,
  condition,
  productDesc,
  variants,
  selectedVariants,
  onVariantChange,
}: ProductInfoProps) {
  const tProducts = useTranslations("products");
  return (
    <div className="space-y-6">
      {/* Title and Price */}
      <div>
        <h1 className="mb-2">{title}</h1>
        <div className="flex items-baseline gap-2">
          <span className="text-blue-600">${price.toLocaleString()}</span>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
          <Check className="w-4 h-4" />
          <span>{availability}</span>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          <Package className="w-4 h-4" />
          <span>{condition}</span>
        </div>
        <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-lg">
          <Shield className="w-4 h-4" />
          <span>{warranty}</span>
        </div>
      </div>

      {/* product description  */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-600" />
          product description 
        </h2>
        <div>
          {tProducts(`${productDesc}.desc`)}
        </div>
      </div>

      {/* Variants */}
      {variants.length > 0 && (
      <div className="bg-white rounded-xl p-6 shadow-sm space-y-5">
        <h2>Configuration</h2>
        {variants.map((variant) => (
          <div key={variant.id} className="space-y-3">
            <div>{variant.name}</div>
            <div className="flex flex-wrap gap-2">
              {variant.options.map((option) => (
                <button
                  key={option}
                  onClick={() => onVariantChange(variant.name, option)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedVariants[variant.name] === option
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
   
      )}
      </div>
  );
}
