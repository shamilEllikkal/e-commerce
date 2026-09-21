"use client";

import { useState } from "react";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setForm(empty);
  }

  const inputClass =
    "w-full rounded-[10px] border border-line bg-soft px-4 py-3 text-[14px] text-ink outline-none placeholder:text-muted focus:border-ink transition";

  return (
    <div>
      <h2 className="mb-3 text-[32px] font-semibold leading-[1.1] tracking-[-1.5px] md:text-[40px]">
        Have Questions? <br /> We&apos;re Here for You!
      </h2>
      <p className="mb-[35px] text-[17px] leading-[1.75] font-light text-body">
        Senectus velit sagittis inceptos fringilla mus mauris convallis lobortis.
      </p>

      {sent ? (
        <div className="rounded-[14px] bg-green p-6 text-[15px] font-medium text-ink">
          Thanks for reaching out! We&apos;ll get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="mb-1.5 block text-[15px] font-light text-ink">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="Jane"
                value={form.firstName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="mb-1.5 block ext-[15px] font-light text-ink">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="Smith"
                value={form.lastName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[15px] font-light text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="jane@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="subject" className="mb-1.5 block text-[15px] font-light text-ink">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="How can we help?"
              value={form.subject}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-[15px] font-light text-ink">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex h-[58px] items-center justify-center rounded-[10px] bg-ink px-8 text-[14px] font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-yellow-500 hover:text-ink hover:shadow-sm"
          >
            Send Message
          </button>   
        </form>
      )}
    </div>
  );
}
