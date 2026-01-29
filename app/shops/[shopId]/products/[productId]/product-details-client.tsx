'use client';

import { useMemo, useState } from 'react';
import type { Product, Shop } from '@/lib/types';
import { ImageGallery } from '@/components/product-details/ImageGallery';
import { ProductInfo } from '@/components/product-details/ProductInfo';
import { SpecsSection } from '@/components/product-details/SpecsSection';
import { WhatsAppButton } from '@/components/product-details/WhatsAppButton';

export function ProductDetailsClient({ shop, product }: { shop: Shop; product: Product }) {
  // If you later add real variant sets per product, populate these from your API/data.
  // variants: قائمة خيارات للمنتج (حاليًا فاضية).  selectedVariants: شو اختار المستخدم من هالخيارات.
  //  متل اللون: أسود/فضي او السعة: 256/ 512 او حالة الجهاز: جديد / مستخدم 
  // حاليًا ما في variants بداتا المنتج، بس لاحقًا إذا جبتها من API رح تعبيها هون
  const variants = useMemo(() => {
    return [];
  }, []);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const keySpecs = useMemo(() => {
    // حطيتن مصفوفة اوبجكتات وليس اوبجيكت واحد فيو كلشي لان العرض بـ map أسهل وأنظف
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
// fullSpecs عملناها Object مقسّم (Overview/Performance/...) لأن SpecsSection بتعرض المواصفات كمجموعات.
// أما keySpecs عملناها Array من {label, value} لأن ProductInfo بده قائمة قصيرة بسيطة تنعرض كسطور/سطر "فيو مفتاح وقيمة يا منحطن حد بعض يا عاموديا" بدون أقسام.
  // ما بكفي [product] لان shop اسمه رح يظهر بالمواصفات shop.name فاذا انا غيرت اسم المحل البيانات هون ما رح تتحدث
// الاحسن حط  useMemo<Record<string, Record<string, string>>> لان ال asبيخفي أخطاء
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
          {/* مررت الدالة بدل من تمرير setSelectedVariants فقط وبالملف اعملو الفانكشن لان اذا بدي الفانكشن بمكان تاني بدي ارجع اعمل الفانكشن اما الاصح اعمل الفانكشن بمكان تواجد الset لحتى ابعتا للدالة دغري*/} 

          <WhatsAppButton productTitle={product.name} selectedVariants={selectedVariants} />
        </div>
      </div>

      <SpecsSection specs={fullSpecs} />
    </>
  );
}
