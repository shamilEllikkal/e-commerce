"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
}

export function LoginModal({ onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onClose();
  }

  const inputClass =
    "w-full rounded-[10px] border border-line bg-soft px-4 py-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-ink transition";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Login"
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-[40px] shadow-xl"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close login"
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-line text-secondary transition hover:border-ink hover:text-ink"
        >
          <X size={16} />
        </button>

        <h2 className="mb-1 text-[26px] font-bold tracking-[-1px]">Welcome back</h2>
        <p className="mb-[28px] text-[14px] text-secondary">Sign in to your Kiddy account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-[13px] font-medium text-ink">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-[13px] font-medium text-ink">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-secondary">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded accent-ink"
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-[13px] text-secondary underline-offset-2 hover:text-ink hover:underline transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 h-[52px] w-full rounded-[10px] bg-ink text-[14px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-yellow-500 hover:shadow-sm"
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
