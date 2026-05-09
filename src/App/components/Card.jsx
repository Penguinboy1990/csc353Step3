"use client";
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function Card({ id, item, description, image, price, onAddToCart }) {

    const rating = ((id * 7) % 5) + 2.5; // between 2.5 and 5.0
    const roundedRating = Math.min(5, Math.round(rating * 2) / 2);
    const reviewCount = ((id * 13) % 900) + 100;

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
            {/* Product image — wrap in Link */}
            <Link href={`/product/${id}`}>
                <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#f0f8ff', cursor: 'pointer' }}>
                    <img
                        src={image}
                        alt={item}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.2s' }}
                        onError={e => { e.target.style.display = 'none'; }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
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
                </div>
            </Link>

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

                {/* Add to Cart button */}
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
    onAddToCart: PropTypes.func
};

export default Card;
