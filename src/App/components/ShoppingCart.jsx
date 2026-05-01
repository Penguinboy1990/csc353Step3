"use client";
import React from 'react';
import PropTypes from 'prop-types';

function ShoppingCart({ cart, onIncrement, onDecrement }) {
    const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);

    return (
        <div style={{
            width: '280px',
            background: '#fff',
            border: '2px solid #d0e8f2',
            borderRadius: '16px',
            padding: '1.25rem',
            position: 'sticky',
            top: '5rem',
            fontFamily: 'Georgia, serif',
        }}>
            <h2 style={{ color: '#1a3a4a', marginBottom: '1rem', fontSize: '1.1rem' }}>
                🛒 Cart
            </h2>

            {cart.length === 0 ? (
                <p style={{ color: '#8ab4c8', fontStyle: 'italic', fontSize: '0.9rem' }}>
                    Your cart is empty!
                </p>
            ) : (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
                        {cart.map((c) => (
                            <div key={c.item} style={{
                                display: 'flex',
                                alignItems: 'center',
                                background: '#f0f8ff',
                                borderRadius: '8px',
                                padding: '0.5rem 0.75rem',
                                gap: '0.4rem',
                            }}>
                                {/* Item name */}
                                <span style={{
                                    flex: 1,
                                    fontSize: '0.82rem',
                                    color: '#1a2e3b',
                                    lineHeight: 1.3,
                                }}>
                                    {c.item}
                                </span>

                                {/* Controls */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}>
                                    {/* Decrement or delete */}
                                    <button
                                        onClick={() => onDecrement(c.item)}
                                        title={c.quantity === 1 ? 'Remove item' : 'Decrease quantity'}
                                        style={{
                                            background: c.quantity === 1 ? '#e07a7a' : '#d0e8f2',
                                            color: c.quantity === 1 ? '#fff' : '#1a3a4a',
                                            border: 'none',
                                            borderRadius: '6px',
                                            width: '26px',
                                            height: '26px',
                                            cursor: 'pointer',
                                            fontSize: c.quantity === 1 ? '0.8rem' : '1rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                    >
                                        {c.quantity === 1 ? '🗑️' : '−'}
                                    </button>

                                    {/* Quantity */}
                                    <span style={{
                                        minWidth: '20px',
                                        textAlign: 'center',
                                        fontSize: '0.85rem',
                                        fontWeight: 'bold',
                                        color: '#1a3a4a',
                                    }}>
                                        {c.quantity}
                                    </span>

                                    {/* Increment */}
                                    <button
                                        onClick={() => onIncrement(c.item)}
                                        title="Increase quantity"
                                        style={{
                                            background: '#d0e8f2',
                                            color: '#1a3a4a',
                                            border: 'none',
                                            borderRadius: '6px',
                                            width: '26px',
                                            height: '26px',
                                            cursor: 'pointer',
                                            fontSize: '1rem',
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
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div style={{
                        borderTop: '2px solid #d0e8f2',
                        paddingTop: '0.75rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}>
                        {/* Item count */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#5a7a8a', fontSize: '0.85rem' }}>
            Items ({totalItems}):
        </span>
                            <span style={{ color: '#1a2e3b', fontSize: '0.85rem' }}>
            ${cart.reduce((sum, c) => sum + (c.price * c.quantity), 0).toFixed(2)}
        </span>
                        </div>

                        {/* Shipping */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: '#5a7a8a', fontSize: '0.85rem' }}>Shipping & handling:</span>
                            <span style={{ color: '#1a2e3b', fontSize: '0.85rem' }}>$0.00</span>
                        </div>

                        {/* Divider */}
                        <div style={{ borderTop: '1px solid #d0e8f2', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#1a3a4a', fontWeight: 'bold', fontSize: '1rem' }}>
            Order total:
        </span>
                            <span style={{ color: '#1a3a4a', fontWeight: 'bold', fontSize: '1rem' }}>
            ${cart.reduce((sum, c) => sum + (c.price * c.quantity), 0).toFixed(2)}
        </span>
                        </div>

                        {/* Checkout button */}
                        <button style={{
                            marginTop: '0.25rem',
                            background: '#a8dfc0',
                            color: '#1a2e3b',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '0.6rem',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'Georgia, serif',
                            transition: 'background 0.15s',
                        }}
                                onMouseEnter={e => e.currentTarget.style.background = '#6a9ab0'}
                                onMouseLeave={e => e.currentTarget.style.background = '#a8dfc0'}
                        >
                            Proceed to Checkout 🐧
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        item: PropTypes.string,
        quantity: PropTypes.number,
    })),
    onIncrement: PropTypes.func,
    onDecrement: PropTypes.func,
};

export default ShoppingCart;
