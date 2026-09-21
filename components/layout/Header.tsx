import { Search } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { PhonePill } from "@/components/ui/PhonePill";
import { MobileMenu } from "./MobileMenu";
import { MainNavigation } from "./MainNavigation";
import { AccountNav } from "./AccountNav";

export function Header() {
  return (
    <header className="relative bg-white">
      {/* Top Header */}
      <div className="container flex min-h-18 items-center justify-between gap-4 pb-4 lg:min-h-26 lg:gap-0 lg:pb-0">
        <Brand />

        {/* Search */}
        <div className="hidden h-12.5 w-145 grid-cols-[1fr_auto_55px] items-center justify-self-center overflow-hidden rounded-[11px] bg-[#F9FAFB] lg:grid">
          <input
            aria-label="Search products"
            placeholder="What are you looking for?"
            className="h-full min-w-0 border-0 bg-transparent px-[18px] font-normal text-[18px] text-ink outline-0 placeholder:font-light placeholder:text-gray-400"
          />

         <select
  name="category"
  className="h-full bg-transparent text-[13px] text-primary  font-light outline-none"
>
  <option value="">Select Category</option>
  <option value="men">Toys & Games</option>
  <option value="kids">Dresses</option>
  <option value="accessories">Hats & Scarfs</option>
  <option value="accessories">Shoes & socks</option>
  <option value="accessories">Sweaters</option>
  <option value="accessories">T-shirts</option>



</select>

          <button
            type="button"
            aria-label="Search"
            className="grid h-full place-items-center"
          >
            <Search size={19} />
          </button>
        </div>

        {/* Phone */}
        <div className="hidden lg:block ">
          <PhonePill />
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>

      {/* Navigation */}
      <div className="container hidden min-h-[72px] items-end justify-between border-b border-line text-[#576471] lg:flex">
        {/* Main Navigation */}
        <MainNavigation />
        <AccountNav />
      </div>
    </header>
  );
}