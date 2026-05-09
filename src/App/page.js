"use client";
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import ShoppingCart from './components/ShoppingCart';
import NavBar from './components/NavBar';
import { useCart } from './context/CartContext';

const apiURL = '/api/products';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { cart, addToCart, incrementCart, decrementCart, removeFromCart, getQuantity } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const response = await fetch(apiURL);
        const data = await response.json();
        setProducts(data);
    }

    const filteredProducts = products
        .filter(p => activeCategory === 'All' || p.category === activeCategory)
        .filter(p => p.item.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            fontFamily: 'Georgia, serif',
        }}>
            <NavBar
                cart={cart}
                products={products}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <div style={{ padding: '2rem 1.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ color: '#1a3a4a', marginBottom: '1.25rem', fontSize: '1.1rem' }}>
                        {activeCategory === 'All'
                            ? `All Products (${filteredProducts.length})`
                            : `${activeCategory} (${filteredProducts.length})`}
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                        gap: '1rem',
                    }}>
                        {filteredProducts.map((p) => (
                            <Card
                                key={p.id}
                                id={p.id}
                                item={p.item}
                                description={p.description}
                                image={p.image}
                                price={p.price}
                                onAddToCart={(item) => addToCart(item, p.price)}
                            />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <p style={{ color: '#8ab4c8', fontStyle: 'italic', marginTop: '2rem', textAlign: 'center' }}>
                            No products found in this category.
                        </p>
                    )}
                </div>

                {cart.length > 0 && (
                    <ShoppingCart
                        cart={cart}
                        onIncrement={incrementCart}
                        onDecrement={decrementCart}
                    />
                )}
            </div>
        </div>
    );
}
