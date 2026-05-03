"use client";
import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    // ✅ All hooks must be inside the function body
    const [cart, setCart] = useState([]);

    function addToCart(item, price) {
        setCart(prev => {
            const existing = prev.find(c => c.item === item);
            if (existing) {
                return prev.map(c =>
                    c.item === item ? { ...c, quantity: c.quantity + 1 } : c
                );
            }
            return [...prev, { item, price, quantity: 1 }];
        });
    }

    function incrementCart(item) {
        setCart(prev => prev.map(c =>
            c.item === item ? { ...c, quantity: c.quantity + 1 } : c
        ));
    }

    function decrementCart(item) {
        setCart(prev => {
            const existing = prev.find(c => c.item === item);
            if (existing.quantity === 1) {
                return prev.filter(c => c.item !== item);
            }
            return prev.map(c =>
                c.item === item ? { ...c, quantity: c.quantity - 1 } : c
            );
        });
    }

    function removeFromCart(item) {
        setCart(prev => prev.filter(c => c.item !== item));
    }

    function clearCart() {
        setCart([]);
    }

    function getQuantity(item) {
        return cart.find(c => c.item === item)?.quantity ?? 0;
    }

    return (
        <CartContext.Provider value={{
            cart, addToCart, incrementCart, decrementCart,
            removeFromCart, getQuantity, clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
