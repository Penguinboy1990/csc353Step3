"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ShoppingCart from '../../components/ShoppingCart';
import { useCart } from '../../context/CartContext';

const apiURL = '/api/products';

export default function ProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [addedMessage, setAddedMessage] = useState('');
    const { cart, addToCart, incrementCart, decrementCart, getQuantity } = useCart();
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`${apiURL}/${id}`);
                if (!response.ok) { setNotFound(true); return; }
                const data = await response.json();
                if (!data || !data.item) { setNotFound(true); return; }
                setProduct(data);
            } catch {
                setNotFound(true);
            }
        }
        fetchProduct();
    }, [id]);

    function handleAddToCart() {
        for (let i = 0; i < selectedQuantity; i++) {
            addToCart(product.item, product.price);
        }
        setAddedMessage(`${selectedQuantity} item${selectedQuantity > 1 ? 's' : ''} added to cart!`);
        setTimeout(() => setAddedMessage(''), 2000);
        setSelectedQuantity(1);
    }

    function handleBuyNow() {
        if (cartQuantity === 0) {
            for (let i = 0; i < selectedQuantity; i++) {
                addToCart(product.item, product.price);
            }
        }
        router.push('/checkout');
    }

    if (notFound) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            gap: '1rem',
        }}>
            <span style={{ fontSize: '3rem' }}>🐧</span>
            <h2 style={{ color: '#1a3a4a', margin: 0 }}>Product not found</h2>
            <p style={{ color: '#6a9ab0', margin: 0 }}>This item may have been removed or doesn't exist.</p>
            <button
                onClick={() => router.push('/')}
                style={{
                    background: '#1a3a4a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '0.6rem 1.5rem',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                }}
            >
                ← Back to Store
            </button>
        </div>
    );

    if (!product) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            color: '#1a3a4a',
            fontSize: '1.1rem',
        }}>
            Loading product...
        </div>
    );

    const rating = ((product.id * 7) % 10) / 2 + 3;
    const roundedRating = Math.round(rating * 2) / 2;
    const reviewCount = ((product.id * 13) % 900) + 100;
    const cartQuantity = getQuantity(product.item);

    function renderStars(r) {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (r >= i) {
                stars.push(<span key={i} style={{ color: '#f0a500' }}>★</span>);
            } else if (r >= i - 0.5) {
                stars.push(<span key={i} style={{ color: '#f0a500' }}>½</span>);
            } else {
                stars.push(<span key={i} style={{ color: '#d0e8f2' }}>★</span>);
            }
        }
        return stars;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            fontFamily: 'Georgia, serif',
        }}>
            {/* Top bar */}
            <div style={{
                background: '#1a3a4a',
                padding: '0.75rem 2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'sticky',
                top: 0,
                zIndex: 100,
            }}>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        background: 'transparent',
                        border: '2px solid transparent',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontFamily: 'Georgia, serif',
                        padding: '0.25rem 0.75rem',
                        transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                    ← Back to Store
                </button>
                <span style={{ fontSize: '1.4rem' }}>🐧</span>
                <span style={{ color: '#fff', fontSize: '0.9rem', letterSpacing: '1px' }}>PenguinStore</span>

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.4rem' }}>🛒</span>
                    {cart.length > 0 && (
                        <span style={{
                            background: '#a8dfc0',
                            color: '#1a3a4a',
                            borderRadius: '50%',
                            width: '22px',
                            height: '22px',
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {cart.reduce((sum, c) => sum + c.quantity, 0)}
                        </span>
                    )}
                </div>
            </div>

            {/* Main layout */}
            <div style={{
                maxWidth: '1200px',
                margin: '2rem auto',
                padding: '0 2rem',
                display: 'flex',
                gap: '2rem',
                alignItems: 'flex-start',
            }}>
                {/* Left — large image */}
                <div style={{ flex: '0 0 380px', position: 'sticky', top: '5rem' }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        border: '1px solid #d0e8f2',
                        overflow: 'hidden',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        padding: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: '380px',
                    }}>
                        <img
                            src={product.image}
                            alt={product.item}
                            style={{
                                width: '100%',
                                maxHeight: '380px',
                                objectFit: 'contain',
                                display: 'block',
                            }}
                            onError={e => { e.target.style.display = 'none'; }}
                        />
                    </div>
                </div>

                {/* Middle — product info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#6a9ab0' }}>
                        PenguinStore › {product.category} › {product.item}
                    </p>

                    <h1 style={{
                        margin: 0,
                        fontSize: '1.4rem',
                        color: '#1a2e3b',
                        lineHeight: 1.3,
                        fontWeight: 'bold',
                    }}>
                        {product.item}
                    </h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.95rem', letterSpacing: '1px', display: 'flex' }}>
                            {renderStars(roundedRating)}
                        </span>
                        <span style={{ color: '#6a9ab0', fontSize: '0.75rem' }}>
                            {roundedRating.toFixed(1)} ({reviewCount.toLocaleString()})
                        </span>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #d0e8f2', margin: '0.25rem 0' }} />

                    <div>
                        <span style={{ fontSize: '0.8rem', color: '#5a7a8a' }}>Price: </span>
                        <span style={{ fontSize: '1.8rem', color: '#1a3a4a', fontWeight: 'bold' }}>
                            ${product.price != null ? product.price.toFixed(2) : '—'}
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                            background: '#1a3a4a',
                            color: '#a8dfc0',
                            fontSize: '0.7rem',
                            fontWeight: 'bold',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            letterSpacing: '1px',
                        }}>PRIME</span>
                        <span style={{ color: '#1a3a4a', fontSize: '0.85rem' }}>
                            FREE delivery <strong>tomorrow</strong>
                        </span>
                    </div>

                    <p style={{ margin: 0, color: '#2a8a5a', fontWeight: 'bold', fontSize: '0.95rem' }}>
                        In Stock
                    </p>

                    <hr style={{ border: 'none', borderTop: '1px solid #d0e8f2', margin: '0.25rem 0' }} />

                    <div>
                        <p style={{ margin: '0 0 0.4rem 0', fontWeight: 'bold', color: '#1a2e3b', fontSize: '0.95rem' }}>
                            About this item
                        </p>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#3a5a6a', lineHeight: 1.7 }}>
                            {product.description}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#5a7a8a' }}>Category:</span>
                        <span style={{
                            background: '#d0e8f2',
                            color: '#1a3a4a',
                            fontSize: '0.78rem',
                            padding: '2px 10px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                        }}>
                            {product.category}
                        </span>
                    </div>
                </div>

                {/* Right — buy box + cart */}
                <div style={{
                    width: '260px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'sticky',
                    top: '5rem',
                }}>
                    {/* Buy box */}
                    <div style={{
                        background: '#fff',
                        border: '1px solid #d0e8f2',
                        borderRadius: '12px',
                        padding: '1.25rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                    }}>
                        <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', color: '#1a3a4a' }}>
                            ${product.price != null ? product.price.toFixed(2) : '—'}
                        </p>

                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#1a3a4a' }}>
                            FREE delivery <strong>tomorrow</strong>
                        </p>

                        <p style={{ margin: 0, color: '#2a8a5a', fontWeight: 'bold', fontSize: '0.85rem' }}>
                            In Stock
                        </p>

                        {/* Quantity dropdown */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <label style={{
                                fontSize: '0.85rem',
                                color: '#1a3a4a',
                                fontWeight: 'bold',
                                fontFamily: 'Georgia, serif',
                            }}>
                                Quantity:
                            </label>
                            <select
                                value={selectedQuantity}
                                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                                style={{
                                    padding: '0.4rem 0.6rem',
                                    borderRadius: '8px',
                                    border: '1.5px solid #d0e8f2',
                                    fontSize: '0.85rem',
                                    color: '#1a2e3b',
                                    fontFamily: 'Georgia, serif',
                                    background: '#f9fdff',
                                    cursor: 'pointer',
                                    outline: 'none',
                                }}
                            >
                                {Array.from({ length: 30 }, (_, i) => i + 1).map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        {/* Add to Cart button */}
                        <button
                            onClick={handleAddToCart}
                            style={{
                                background: '#a8dfc0',
                                color: '#1a2e3b',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '0.6rem',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontFamily: 'Georgia, serif',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#6a9ab0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#a8dfc0'}
                        >
                            🛒 Add to Cart
                        </button>

                        {/* Success message */}
                        {addedMessage && (
                            <p style={{
                                margin: 0,
                                color: '#2a8a5a',
                                fontSize: '0.82rem',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}>
                                ✅ {addedMessage}
                            </p>
                        )}

                        {/* Buy Now button */}
                        <button
                            onClick={handleBuyNow}
                            style={{
                                background: '#f0a500',
                                color: '#1a2e3b',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '0.6rem',
                                fontSize: '0.85rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontFamily: 'Georgia, serif',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#d08800'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f0a500'}
                        >
                            ⚡ Buy Now
                        </button>

                        <hr style={{ border: 'none', borderTop: '1px solid #d0e8f2', margin: '0' }} />

                        <div style={{ fontSize: '0.78rem', color: '#5a7a8a', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            <p style={{ margin: 0 }}>🚚 Ships from <strong>PenguinStore</strong></p>
                            <p style={{ margin: 0 }}>📦 Sold by <strong>PenguinStore</strong></p>
                            <p style={{ margin: 0 }}>↩️ Free returns</p>
                        </div>
                    </div>

                    {/* Live cart sidebar */}
                    <ShoppingCart
                        cart={cart}
                        onIncrement={incrementCart}
                        onDecrement={decrementCart}
                    />
                </div>
            </div>
        </div>
    );
}
