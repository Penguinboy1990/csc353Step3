"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
    const router = useRouter();
    const [orderNumber] = useState(() =>
        Math.floor(100000000 + Math.random() * 900000000)
    );

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
    const deliveryString = estimatedDelivery.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

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
            }}>
                <span style={{ fontSize: '1.4rem' }}>🐧</span>
                <span style={{ color: '#fff', fontSize: '1rem', letterSpacing: '1px', fontWeight: 'bold' }}>
                    PenguinStore
                </span>
            </div>

            {/* Confirmation card */}
            <div style={{
                maxWidth: '680px',
                margin: '3rem auto',
                padding: '0 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
            }}>
                {/* Thank you banner */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #a8dfc0',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '2.5rem' }}>🐧</span>
                        <div>
                            <h1 style={{ margin: 0, color: '#2a8a5a', fontSize: '1.4rem' }}>
                                Order placed, thank you!
                            </h1>
                            <p style={{ margin: 0, color: '#5a7a8a', fontSize: '0.85rem' }}>
                                Confirmation will be sent to your email.
                            </p>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #d0e8f2' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span style={{ color: '#5a7a8a' }}>Order number:</span>
                            <span style={{ color: '#1a3a4a', fontWeight: 'bold' }}>#{orderNumber}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span style={{ color: '#5a7a8a' }}>Estimated delivery:</span>
                            <span style={{ color: '#1a3a4a', fontWeight: 'bold' }}>{deliveryString}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                            <span style={{ color: '#5a7a8a' }}>Shipping:</span>
                            <span style={{ color: '#2a8a5a', fontWeight: 'bold' }}>FREE</span>
                        </div>
                    </div>
                </div>

                {/* Delivery status tracker */}
                <div style={{
                    background: '#fff',
                    border: '1px solid #d0e8f2',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                    <h2 style={{ margin: '0 0 1.25rem 0', fontSize: '1rem', color: '#1a3a4a' }}>
                        📦 Delivery Status
                    </h2>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                        {[
                            { label: 'Order\nPlaced', icon: '✅', done: true },
                            { label: 'Processing', icon: '⚙️', done: true },
                            { label: 'Shipped', icon: '🚚', done: false },
                            { label: 'Delivered', icon: '🏠', done: false },
                        ].map((step, i, arr) => (
                            <React.Fragment key={step.label}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    flex: '0 0 auto',
                                }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: step.done ? '#a8dfc0' : '#f0f8ff',
                                        border: `2px solid ${step.done ? '#2a8a5a' : '#d0e8f2'}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                    }}>
                                        {step.icon}
                                    </div>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        color: step.done ? '#2a8a5a' : '#8ab4c8',
                                        fontWeight: step.done ? 'bold' : 'normal',
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                    }}>
                                        {step.label}
                                    </span>
                                </div>
                                {i < arr.length - 1 && (
                                    <div style={{
                                        flex: 1,
                                        height: '2px',
                                        background: step.done ? '#a8dfc0' : '#d0e8f2',
                                        marginBottom: '1.2rem',
                                    }} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => router.push('/')}
                        style={{
                            flex: 1,
                            background: '#a8dfc0',
                            color: '#1a2e3b',
                            border: 'none',
                            borderRadius: '20px',
                            padding: '0.75rem',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'Georgia, serif',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#6a9ab0'}
                        onMouseLeave={e => e.currentTarget.style.background = '#a8dfc0'}
                    >
                        🐧 Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
}
