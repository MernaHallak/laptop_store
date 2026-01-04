import type { Product, Shop, ShopCategory } from './types';

export const shops: Shop[] = [
  {
    id: 1,
    name: 'TechHub Pro',
    logo: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=200&h=200&fit=crop',
    location: 'San Francisco, CA',
    tagline: 'Premium laptops for professionals and creatives',
    category: 'Premium',
  },
  {
    id: 2,
    name: 'Budget Laptops Outlet',
    logo: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=200&h=200&fit=crop',
    location: 'Austin, TX',
    tagline: 'Affordable laptops that get the job done',
    category: 'Budget',
  },
  {
    id: 3,
    name: 'Gaming Beast Store',
    logo: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&h=200&fit=crop',
    location: 'Los Angeles, CA',
    tagline: 'High-performance gaming rigs and accessories',
    category: 'Gaming',
  },
  {
    id: 4,
    name: 'Eco Refurbished',
    logo: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=200&h=200&fit=crop',
    location: 'Portland, OR',
    tagline: 'Certified refurbished laptops with warranty',
    category: 'Refurbished',
  },
  {
    id: 5,
    name: 'Student Tech Deals',
    logo: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=200&h=200&fit=crop',
    location: 'Boston, MA',
    tagline: 'Student-friendly prices and bundles',
    category: 'Student',
  },
  {
    id: 6,
    name: 'Creative Studio Gear',
    logo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop',
    location: 'New York, NY',
    tagline: 'Color-accurate displays & creator laptops',
    category: 'Premium',
  },
  {
    id: 7,
    name: 'Enterprise IT Supply',
    logo: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=200&h=200&fit=crop',
    location: 'Chicago, IL',
    tagline: 'Business fleets, warranties, and support',
    category: 'Enterprise',
  },
  {
    id: 8,
    name: 'Local Repair & Sales',
    logo: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop',
    location: 'Miami, FL',
    tagline: 'Local pickup, repairs, and upgrades',
    category: 'Local',
  },
  {
    id: 9,
    name: 'Import Electronics',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
    location: 'Seattle, WA',
    tagline: 'International models and hard-to-find SKUs',
    category: 'Global',
  },
];

let productId = 1;

function p(shopId: number, data: Omit<Product, 'id' | 'shopId'>): Product {
  return { id: productId++, shopId, ...data };
}

// Sample products across shops. Replace with real data/API later.
export const products: Product[] = [
  // Shop 1 - Premium
  p(1, {
    name: 'MacBook Pro 14',
    brand: 'Apple',
    cpu: 'Apple M3 Pro',
    ram: '18GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
  }),
  p(1, {
    name: 'Dell XPS 13',
    brand: 'Dell',
    cpu: 'Intel Core Ultra 7',
    ram: '16GB',
    storage: '1TB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=800&h=600&fit=crop',
  }),

  // Shop 2 - Budget
  p(2, {
    name: 'Acer Aspire 5',
    brand: 'Acer',
    cpu: 'AMD Ryzen 5 5500U',
    ram: '8GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 499,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
  }),
  p(2, {
    name: 'Lenovo IdeaPad 3',
    brand: 'Lenovo',
    cpu: 'Intel Core i3-1215U',
    ram: '8GB',
    storage: '256GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 379,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
  }),

  // Shop 3 - Gaming
  p(3, {
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    cpu: 'Intel Core i7-13650HX',
    ram: '16GB',
    storage: '1TB SSD',
    gpu: 'NVIDIA RTX 4060',
    condition: 'New',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1555617981-dac3880eac6f?w=800&h=600&fit=crop',
  }),
  p(3, {
    name: 'MSI Katana 15',
    brand: 'MSI',
    cpu: 'Intel Core i7-12700H',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'NVIDIA RTX 3050',
    condition: 'New',
    price: 999,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600&fit=crop',
  }),

  // Shop 4 - Refurbished
  p(4, {
    name: 'HP EliteBook 840 (Refurb)',
    brand: 'HP',
    cpu: 'Intel Core i5-1135G7',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'Refurbished',
    price: 549,
    image: 'https://images.unsplash.com/photo-1509395281392-5b7f9d1edb4c?w=800&h=600&fit=crop',
  }),
  p(4, {
    name: 'ThinkPad T480 (Refurb)',
    brand: 'Lenovo',
    cpu: 'Intel Core i7-8650U',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'Refurbished',
    price: 429,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop',
  }),

  // Shop 5 - Student
  p(5, {
    name: 'Microsoft Surface Laptop Go',
    brand: 'Microsoft',
    cpu: 'Intel Core i5-1035G1',
    ram: '8GB',
    storage: '256GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 549,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop',
  }),
  p(5, {
    name: 'Chromebook 14',
    brand: 'HP',
    cpu: 'Intel Celeron N4500',
    ram: '4GB',
    storage: '64GB eMMC',
    gpu: 'Integrated',
    condition: 'New',
    price: 199,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop',
  }),

  // Shop 6 - Premium (creator)
  p(6, {
    name: 'MacBook Air 13',
    brand: 'Apple',
    cpu: 'Apple M3',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
  }),
  p(6, {
    name: 'ASUS Zenbook OLED 14',
    brand: 'ASUS',
    cpu: 'AMD Ryzen 7 7840U',
    ram: '16GB',
    storage: '1TB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1551033406-611cf9a28f73?w=800&h=600&fit=crop',
  }),

  // Shop 7 - Enterprise
  p(7, {
    name: 'Dell Latitude 7440',
    brand: 'Dell',
    cpu: 'Intel Core i7-1365U',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 1399,
    image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=800&h=600&fit=crop',
  }),
  p(7, {
    name: 'HP ProBook 450',
    brand: 'HP',
    cpu: 'Intel Core i5-1335U',
    ram: '16GB',
    storage: '512GB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 899,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
  }),

  // Shop 8 - Local
  p(8, {
    name: 'Used MacBook Pro 13',
    brand: 'Apple',
    cpu: 'Intel Core i5',
    ram: '8GB',
    storage: '256GB SSD',
    gpu: 'Integrated',
    condition: 'Used',
    price: 499,
    image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&h=600&fit=crop',
  }),
  p(8, {
    name: 'Used Lenovo Legion 5',
    brand: 'Lenovo',
    cpu: 'AMD Ryzen 7 5800H',
    ram: '16GB',
    storage: '1TB SSD',
    gpu: 'NVIDIA RTX 3060',
    condition: 'Used',
    price: 899,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop',
  }),

  // Shop 9 - Global
  p(9, {
    name: 'LG Gram 16',
    brand: 'LG',
    cpu: 'Intel Core i7-1360P',
    ram: '16GB',
    storage: '1TB SSD',
    gpu: 'Integrated',
    condition: 'New',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
  }),
  p(9, {
    name: 'Razer Blade 15',
    brand: 'Razer',
    cpu: 'Intel Core i7-12800H',
    ram: '16GB',
    storage: '1TB SSD',
    gpu: 'NVIDIA RTX 3070 Ti',
    condition: 'New',
    price: 2299,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
  }),
];

export function getShopCategories(): (ShopCategory | 'All')[] {
  const set = new Set(shops.map((s) => s.category));
  return ['All', ...Array.from(set)];
}

export function getProductsForShop(shopId: number): Product[] {
  return products.filter((p) => p.shopId === shopId);
}
