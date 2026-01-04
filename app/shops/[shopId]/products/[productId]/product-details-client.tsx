'use client';

import { useMemo, useState } from 'react';
import type { Product, Shop } from '@/lib/types';
import { ImageGallery } from '@/components/product-details/ImageGallery';
import { ProductInfo } from '@/components/product-details/ProductInfo';
import { SpecsSection } from '@/components/product-details/SpecsSection';
import { WhatsAppButton } from '@/components/product-details/WhatsAppButton';

export function ProductDetailsClient({ shop, product }: { shop: Shop; product: Product }) {
  // If you later add real variant sets per product, populate these from your API/data.
  const variants = useMemo(() => {
    return [];
  }, []);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const keySpecs = useMemo(() => {
    return [
      { label: 'Brand', value: product.brand },
      { label: 'CPU', value: product.cpu },
      { label: 'RAM', value: product.ram },
      { label: 'Storage', value: product.storage },
      { label: 'GPU', value: product.gpu },
      { label: 'Condition', value: product.condition },
    ];
  }, [product]);

  const fullSpecs = useMemo(() => {
    return {
      Overview: {
        Shop: shop.name,
        Brand: product.brand,
        Condition: product.condition,
      },
      Performance: {
        CPU: product.cpu,
        GPU: product.gpu,
        RAM: product.ram,
      },
      Storage: {
        Storage: product.storage,
      },
    } as Record<string, Record<string, string>>;
  }, [product, shop]);

  const images = useMemo(() => {
    // Your current data model has a single image. We duplicate it so the gallery works as designed.
    return [product.image, product.image, product.image, product.image];
  }, [product.image]);

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ImageGallery images={images} />

        <div className="space-y-6">
          <ProductInfo
            title={product.name}
            price={product.price}
            availability="In Stock"
            warranty="Warranty available — contact seller"
            condition={product.condition}
            keySpecs={keySpecs}
            variants={variants}
            selectedVariants={selectedVariants}
            onVariantChange={handleVariantChange}
          />

          <WhatsAppButton productTitle={product.name} selectedVariants={selectedVariants} />
        </div>
      </div>

      <SpecsSection specs={fullSpecs} />
    </>
  );
}
