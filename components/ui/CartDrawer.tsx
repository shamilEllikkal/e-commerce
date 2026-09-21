"use client";

import { useState } from "react";
import { X, Trash2, ChevronLeft, ChevronRight, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

interface CartDrawerProps {
  onClose: () => void;
}

export function CartDrawer({ onClose }: CartDrawerProps) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    addToCart,
    loadingProductId,
  } = useCart();

  // Suggested products logic (pick 3 items not currently in cart or fallback)
  const suggestedList = products.filter(
    (p) => !cartItems.some((item) => item.product.id === p.id)
  );
  const displaySuggested = suggestedList.length > 0 ? suggestedList : products;

  const [suggestedIndex, setSuggestedIndex] = useState(0);

  const currentSuggested = displaySuggested[suggestedIndex % displaySuggested.length];

  function handlePrevSuggested() {
    setSuggestedIndex((prev) => (prev > 0 ? prev - 1 : displaySuggested.length - 1));
  }

  function handleNextSuggested() {
    setSuggestedIndex((prev) => (prev + 1) % displaySuggested.length);
  }

  const FREE_SHIPPING_THRESHOLD = 300;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-[18px] font-bold text-ink">Shopping Cart</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-8 w-8 place-items-center rounded-full text-gray-400 transition hover:text-ink"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            /* Empty State */
            <div className="my-auto flex flex-col items-center justify-center text-center">
              <div className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-soft text-secondary">
                <ShoppingBag size={36} strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-[18px] font-bold text-ink">Your cart is currently empty.</h3>
              <p className="mb-6 max-w-[280px] text-[14px] text-secondary">
                Before proceed to checkout you must add some products to your shopping cart.
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex h-[48px] items-center justify-center rounded-[10px] bg-ink px-8 text-[13px] font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-yellow-500 hover:shadow-md"
              >
                Return to Shop
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="flex flex-col divide-y divide-dashed divide-gray-200">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 py-4">
                    {/* Product Image */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-[#F9FAFB] p-1 border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.alt || product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate text-[15px] font-bold text-ink mb-1">
                        {product.name}
                      </h4>

                      <div className="flex items-center gap-2">
                        {/* Quantity Stepper Input */}
                        <div className="flex items-center rounded border border-gray-300 bg-white px-2 py-0.5 text-[13px]">
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                              updateQuantity(product.id, parseInt(e.target.value) || 1)
                            }
                            className="w-8 text-center font-medium outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-auto [&::-webkit-outer-spin-button]:appearance-auto"
                          />
                        </div>

                        <span className="text-[13px] text-gray-400">×</span>
                        <span className="text-[14px] font-semibold text-ink">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Delete Icon */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="text-gray-400 transition hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Dotted Divider */}
              <div className="my-5 border-t border-dashed border-gray-200" />

              {/* SUGGESTED PRODUCTS Section */}
              {currentSuggested ? (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold tracking-wider text-gray-500 uppercase">
                      SUGGESTED PRODUCTS
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={handlePrevSuggested}
                        aria-label="Previous suggested product"
                        className="grid h-6 w-6 place-items-center rounded border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-ink transition"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextSuggested}
                        aria-label="Next suggested product"
                        className="grid h-6 w-6 place-items-center rounded border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-ink transition"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 bg-[#FAFAFA]">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white p-1 border border-gray-100">
                      <Image
                        src={currentSuggested.image}
                        alt={currentSuggested.alt || currentSuggested.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="truncate text-[14px] font-bold text-ink">
                        {currentSuggested.name}
                      </h5>
                      <p className="text-[13px] text-gray-500 font-medium mb-1">
                        ${currentSuggested.price.toFixed(2)}
                      </p>
                      <button
                        type="button"
                        onClick={() => addToCart(currentSuggested)}
                        disabled={loadingProductId === currentSuggested.id}
                        className="inline-flex items-center gap-1.5 rounded-md bg-[#1F2937] px-3 py-1 text-[12px] font-bold text-white transition hover:bg-yellow-500 disabled:opacity-60"
                      >
                        {loadingProductId === currentSuggested.id ? (
                          <>
                            <Loader2 size={12} className="animate-spin" />
                            Adding...
                          </>
                        ) : (
                          "Add to cart"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 ? (
          <div className="border-t border-dashed border-gray-200 p-6 pt-5 bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-extrabold tracking-wider uppercase text-gray-600">
                SUBTOTAL:
              </span>
              <span className="text-[18px] font-extrabold text-ink">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            {/* Free Shipping Notice */}
            <p className="text-[12px] text-gray-500 mb-2">
              {remainingForFreeShipping > 0
                ? `Add $${remainingForFreeShipping.toFixed(2)} more to get free shipping!`
                : "You have unlocked free shipping!"}
            </p>

            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 mb-5">
              <div
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="flex h-[46px] items-center justify-center rounded-[8px] bg-[#1F2937] text-[14px] font-semibold text-white! transition hover:bg-yellow-500"
              >
                View cart
              </Link>
              <Link
                href="/checkout"
                onClick={onClose}
                className="flex h-[46px] items-center justify-center rounded-[8px] bg-[#1F2937] text-[14px] font-semibold text-white! transition hover:bg-yellow-500"
              >
                Checkout
              </Link>
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}
