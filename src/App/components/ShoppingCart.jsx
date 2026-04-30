"use client";
import React from 'react';
import PropTypes from 'prop-types';

function ShoppingCart({ cart, onRemove }) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{
            width: '280px',
            background: '#fff',
            border: '2px solid #d0e8f2',
            borderRadius: '16px',
            padding: '1.25rem',
            position: 'sticky',
            top: '2rem',
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
                        {cart.map((item) => (
                            <div key={item.task} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: '#f0f8ff',
                                borderRadius: '8px',
                                padding: '0.5rem 0.75rem',
                                gap: '0.5rem',
                            }}>
                                <span style={{ flex: 1, fontSize: '0.85rem', color: '#1a2e3b' }}>
                                    {item.task}
                                </span>
                                <span style={{
                                    background: '#1a3a4a',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    padding: '0.15rem 0.5rem',
                                    fontSize: '0.8rem',
                                }}>
                                    x{item.quantity}
                                </span>
                                <button
                                    onClick={() => onRemove(item.task)}
                                    style={{
                                        background: '#e07a7a',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '6px',
                                        padding: '0.15rem 0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div style={{
                        borderTop: '2px solid #d0e8f2',
                        paddingTop: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <span style={{ color: '#1a3a4a', fontWeight: 'bold', fontSize: '0.95rem' }}>
                            Total items:
                        </span>
                        <span style={{
                            background: '#1a3a4a',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '0.2rem 0.6rem',
                            fontWeight: 'bold',
                        }}>
                            {totalItems}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

ShoppingCart.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        task: PropTypes.string,
        quantity: PropTypes.number,
    })),
    onRemove: PropTypes.func,
};

export default ShoppingCart;
