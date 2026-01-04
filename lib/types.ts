export type ShopCategory =
  | 'Premium'
  | 'Budget'
  | 'Gaming'
  | 'Refurbished'
  | 'Student'
  | 'Enterprise'
  | 'Local'
  | 'Global';

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
