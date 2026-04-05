export type MenuCategory = "Starter" | "Main" | "Dessert" | "Drink";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  available: boolean;
};
