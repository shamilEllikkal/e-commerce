"use client";

import React, { createContext, useContext, useState } from "react";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  loadingProductId: string | null;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  subtotal: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
        id: "augue-nullam",
        name: "Augue Nullam",
        category: "Hats & Scarfs",
        color: "Orange",
        price: 25,
        image: "/web8.webp",
        alt: "Orange beanie hat",
      },
      quantity: 1,
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  async function addToCart(product: Product, quantity: number = 1) {
    setLoadingProductId(product.id);
    await new Promise((res) => setTimeout(res, 600));

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setLoadingProductId(null);
    setCartOpen(true);
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(productId: string) {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        loadingProductId,
        addToCart,
        updateQuantity,
        removeFromCart,
        subtotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
