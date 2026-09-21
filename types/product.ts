export interface Product {
  id: string;
  name: string;
  category: string;
  color: string;
  price: number;
  oldPrice?: number;
  image: string;
  alt: string;
  badge?: string;
}

export interface Category {
  id: string;
  label: string;
  icon: "hat" | "toy" | "dress" | "shirt" | "shoes";
  tone: "cream" | "pink" | "green" | "blue" | "purple";
}
