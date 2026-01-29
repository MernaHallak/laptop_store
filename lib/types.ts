// type:لأن هذا مو كائن… هذا “قائمة قيم مسموحة” (Union of literal strings).
// interface: ما بتقدر تعملي فيها هيك نوع مباشرة.
export type ShopCategory =
  | 'Premium'
  | 'Budget'
  | 'Gaming'
  | 'Refurbished'
  | 'Student'
  | 'Enterprise'
  | 'Local'
  | 'Global';
// وبالنسبة للكائنات، فيك تكتبيها بـ type كمان، بس interface إلها ميزة مهمة:

// ميزة interface: بتقدر “تتوسّع” تلقائيًا (Declaration merging)

// إذا عرّفتي Interface بنفس الاسم بمكان ثاني، TypeScript بيدمجهم سوا.
// هذا مفيد أحيانًا مع توسعات مكتبات أو لما بدك تضيف حقول لاحقًا بدون تعديل الأصل.

// type ممتاز لـ: unions مثل 'New' | 'Used'، وتركيبات مثل A & B.

// interface ممتاز لـ: أشكال الكائنات، وخصوصًا إذا بدك توسعة/دمج لاحقًا.

export interface Shop {
  id: number;
  name: string;
  logo: string;
  location: string;
  tagline: string;
  category: ShopCategory;
}

export type ProductCondition = 'New' | 'Refurbished' | 'Used';

export interface Product {
  id: number;
  shopId: number;
  name: string;
  brand: string;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  condition: ProductCondition;
  price: number;
  image: string;
}

export interface ProductFilters {
  brands: string[];
  cpus: string[];
  rams: string[];
  storages: string[];
  gpus: string[];
  conditions: ProductCondition[];
  priceRange: [number, number];
}
