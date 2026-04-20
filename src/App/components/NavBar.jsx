"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Search, MapPin, ChevronDown } from "lucide-react";
import { useCart } from "./app/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar({ onSearch }: { onSearch?: (q: string) => void }) {
    const { count } = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    const [cartBouncing, setCartBouncing] = useState(false);
    const [query, setQuery] = useState("");

    const handleCartOpen = () => {
        setCartBouncing(true);
        setTimeout(() => setCartBouncing(false), 350);
        setCartOpen(true);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
    };

    return (
        <>
            <header style={{ backgroundColor: "#131921" }} className="sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-2 px-4 py-2 max-w-[1400px] mx-auto">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 mr-2">
                        <div className="flex flex-col items-start leading-none">
                            <span className="font-display text-white text-3xl tracking-wider">famazon</span>
                            <span style={{ color: "#f90" }} className="text-[10px] font-medium -mt-1 ml-0.5">.not-com</span>
                        </div>
                    </Link>

                    {/* Deliver to */}
                    <div className="hidden lg:flex items-end gap-1 text-white hover:text-amber-400 cursor-pointer transition-colors ml-2">
                        <MapPin size={16} className="mb-0.5" />
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Deliver to</span>
                            <span className="text-sm font-semibold">Nowhere Real</span>
                        </div>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex-1 flex ml-4">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                onSearch?.(e.target.value);
                            }}
                            placeholder='Search "rocks" or "vibes"...'
                            className="flex-1 px-3 py-2 rounded-l-md text-sm text-gray-900 outline-none border-2 border-transparent focus:border-amber-400"
                        />
                        <button
                            type="submit"
                            style={{ backgroundColor: "#f90" }}
                            className="px-4 rounded-r-md hover:bg-amber-500 transition-colors flex items-center"
                        >
                            <Search size={18} className="text-gray-900" />
                        </button>
                    </form>

                    {/* Nav items */}
                    <div className="hidden md:flex items-center gap-4 ml-4 text-white">
                        <div className="flex flex-col cursor-pointer hover:text-amber-400 transition-colors">
                            <span className="text-xs text-gray-400">Hello, Customer</span>
                            <span className="text-sm font-semibold flex items-center gap-0.5">
                Account <ChevronDown size={12} />
              </span>
                        </div>
                        <div className="flex flex-col cursor-pointer hover:text-amber-400 transition-colors">
                            <span className="text-xs text-gray-400">Returns</span>
                            <span className="text-sm font-semibold">& Orders</span>
                        </div>
                    </div>

                    {/* Cart */}
                    <button
                        onClick={handleCartOpen}
                        className="relative flex items-end gap-1 ml-2 group cursor-pointer"
                    >
                        <div className="relative">
                            <ShoppingCart
                                size={32}
                                className={`text-white group-hover:text-amber-400 transition-colors ${cartBouncing ? "cart-bounce" : ""}`}
                            />
                            {count > 0 && (
                                <span
                                    style={{ backgroundColor: "#f90" }}
                                    className="absolute -top-1 -right-1 text-gray-900 text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                                >
                  {count}
                </span>
                            )}
                        </div>
                        <span className="hidden md:block text-white font-semibold text-sm group-hover:text-amber-400 transition-colors mb-0.5">
              Cart
            </span>
                    </button>
                </div>

                {/* Nav strip */}
                <div style={{ backgroundColor: "#232f3e" }} className="px-4 py-1.5">
                    <div className="flex items-center gap-6 max-w-[1400px] mx-auto overflow-x-auto scrollbar-hide">
                        {["All Departments", "Today's Dumb Deals", "Customer Service", "Registry", "Gift Cards", "Sell"].map((item) => (
                            <button
                                key={item}
                                className="text-white text-sm whitespace-nowrap hover:text-amber-400 transition-colors py-0.5"
                            >
                                {item}
                            </button>
                        ))}
                        <span style={{ color: "#f90" }} className="text-sm font-semibold whitespace-nowrap">
              🔥 Rocks are on sale again
            </span>
                    </div>
                </div>
            </header>

            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    );
}
