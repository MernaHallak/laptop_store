import { products } from "./data";
import { SHOP_CATEGORY_KEYS, ShopCategoryCard } from "./types";

export const SHOP_CATEGORY_CARDS: ShopCategoryCard[] = [
  {
    key: "laptops",
    titleKey: "ShopCategories.laptops",
    descKey: "ShopCategories.laptopsDesc",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=500&fit=crop"
  },
  {
    key: "accessories",
    titleKey: "ShopCategories.accessories",
    descKey: "ShopCategories.accessoriesDesc",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231693?w=800&h=500&fit=crop"
  },
  {
    key: "parts",
    titleKey: "ShopCategories.parts",
    descKey: "ShopCategories.partsDesc",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6bca26c1?w=800&h=500&fit=crop"
  }
];


export function getPresentCategoryKeys(shopId: string | number) {
  const sid = String(shopId);

  const shopProducts = products.filter((p) => String(p.shopId) === sid);

  return SHOP_CATEGORY_KEYS.filter((key) =>
    shopProducts.some((p) => p.categoryKey === key)
  );
}