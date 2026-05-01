"use client";
import React from 'react';
import PropTypes from 'prop-types';

function Card({ id, item, description, image, price, onAddToCart, onIncrement, onDecrement, cartQuantity }) {

    const rating = ((id * 7) % 10) / 2 + 3;
    const roundedRating = Math.round(rating * 2) / 2;
    const reviewCount = ((id * 13) % 900) + 100;

    function renderStars(r) {
        return Array.from({ length: 5 }, (_, i) => {
            if (i < Math.floor(r)) return '★';
            if (i < r) return '⯨';
            return '☆';
        }).join('');
    }

    const inCart = cartQuantity > 0;

    return (
        <div style={{
            background: '#fff',
            border: '1px solid #d0e8f2',
            borderRadius: '8px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            transition: 'box-shadow 0.2s',
        }}
             onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)'}
             onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
        >
            {/* Product image */}
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#f0f8ff' }}>
                <img
                    src={image}
                    alt={item}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { e.target.style.display = 'none'; }}
                />
                <span style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: 'rgba(26,58,74,0.85)',
                    color: '#fff',
                    fontSize: '0.65rem',
                    fontFamily: 'monospace',
                    padding: '2px 6px',
                    borderRadius: '4px',
                }}>#{id}</span>
                {inCart && (
                    <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#a8dfc0',
                        color: '#1a3a4a',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        padding: '2px 8px',
                        borderRadius: '4px',
                    }}>🛒 In Cart: {cartQuantity}</span>
                )}
            </div>

            {/* Product info */}
            <div style={{ padding: '0.85rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    color: '#1a2e3b',
                    lineHeight: 1.3,
                }}>
                    🐧 {item}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: '#f0a500', fontSize: '0.85rem', letterSpacing: '1px' }}>
                        {renderStars(roundedRating)}
                    </span>
                    <span style={{ color: '#6a9ab0', fontSize: '0.75rem' }}>
                        {roundedRating.toFixed(1)} ({reviewCount.toLocaleString()})
                    </span>
                </div>

                <p style={{ margin: 0, fontSize: '0.78rem', color: '#5a7a8a', lineHeight: 1.5 }}>
                    {description}
                </p>

                <p style={{ margin: 0, fontSize: '1.2rem', color: '#1a3a4a', fontWeight: 'bold' }}>
                    ${price != null ? price.toFixed(2) : '—'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span style={{
                        background: '#1a3a4a',
                        color: '#a8dfc0',
                        fontSize: '0.65rem',
                        fontWeight: 'bold',
                        padding: '1px 6px',
                        borderRadius: '3px',
                        letterSpacing: '1px',
                    }}>PRIME</span>
                    <span style={{ fontSize: '0.72rem', color: '#5a7a8a' }}>FREE delivery tomorrow</span>
                </div>

                {/* Add to Cart OR +/- controls */}
                {!inCart ? (
                    <button
                        onClick={() => onAddToCart(item)}
                        style={{
                            marginTop: '0.5rem',
                            background: '#a8dfc0',
                            color: '#1a2e3b',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '0.5rem',
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
                ) : (
                    <div style={{
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        background: '#f0f8ff',
                        borderRadius: '20px',
                        padding: '0.4rem 0.75rem',
                        border: '1.5px solid #d0e8f2',
                    }}>
                        <button
                            onClick={() => onDecrement(item)}
                            title={cartQuantity === 1 ? 'Remove from cart' : 'Decrease quantity'}
                            style={{
                                background: cartQuantity === 1 ? '#e07a7a' : '#d0e8f2',
                                color: cartQuantity === 1 ? '#fff' : '#1a3a4a',
                                border: 'none',
                                borderRadius: '6px',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                fontSize: cartQuantity === 1 ? '0.85rem' : '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.15s',
                            }}
                        >
                            {cartQuantity === 1 ? '🗑️' : '−'}
                        </button>

                        <span style={{ fontWeight: 'bold', color: '#1a3a4a', fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>
                            {cartQuantity}
                        </span>

                        <button
                            onClick={() => onIncrement(item)}
                            style={{
                                background: '#d0e8f2',
                                color: '#1a3a4a',
                                border: 'none',
                                borderRadius: '6px',
                                width: '28px',
                                height: '28px',
                                cursor: 'pointer',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#a8dfc0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#d0e8f2'}
                        >
                            +
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number,
    item: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    onAddToCart: PropTypes.func,
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
    cartQuantity: PropTypes.number,
};

export default Card;
