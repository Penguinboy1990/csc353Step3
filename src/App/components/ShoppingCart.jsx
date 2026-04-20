"use client";

import { useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "./app/context/CartContext";
import Link from "next/link";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
    const { items, removeItem, updateQty, total, count, clearCart } = useCart();

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div style={{ backgroundColor: "#131921" }} className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-white font-display text-2xl tracking-wide">
                        YOUR CART ({count})
                    </h2>
                    <button onClick={onClose} className="text-white hover:text-amber-400 transition-colors">
                        <X size={22} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                            <ShoppingBag size={64} className="text-gray-200" />
                            <div>
                                <p className="text-xl font-display tracking-wide text-gray-400">CART IS EMPTY</p>
                                <p className="text-sm text-gray-400 mt-1">You haven&apos;t added any garbage yet.</p>
                            </div>
                            <button
                                onClick={onClose}
                                style={{ backgroundColor: "#f90" }}
                                className="px-6 py-2 rounded font-semibold text-gray-900 hover:bg-amber-500 transition-colors"
                            >
                                Keep Shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 border border-gray-100 rounded-lg hover:border-amber-200 transition-colors">
                                {/* Emoji display */}
                                <div
                                    className="w-16 h-16 rounded-md flex items-center justify-center text-3xl flex-shrink-0"
                                    style={{ backgroundColor: item.color + "22" }}
                                >
                                    {item.emoji}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-900 leading-tight line-clamp-2">{item.name}</p>
                                    <p className="text-amber-600 font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => updateQty(item.id, item.quantity - 1)}
                                            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-amber-400 transition-colors"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQty(item.id, item.quantity + 1)}
                                            className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center hover:border-amber-400 transition-colors"
                                        >
                                            <Plus size={12} />
                                        </button>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="ml-2 text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t p-5 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-700">Subtotal ({count} items):</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-400">Shipping: FREE (it&apos;s fake, relax)</p>
                        <Link href="/checkout" onClick={onClose}>
                            <button
                                style={{ backgroundColor: "#f90" }}
                                className="w-full py-3 rounded-lg font-bold text-gray-900 hover:bg-amber-500 transition-colors text-base"
                            >
                                Proceed to Checkout
                            </button>
                        </Link>
                        <button
                            onClick={clearCart}
                            className="w-full py-2 rounded-lg border border-gray-200 text-sm text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors"
                        >
                            Clear Cart (start over)
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
