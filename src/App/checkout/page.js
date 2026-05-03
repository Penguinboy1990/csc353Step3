"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const [errors, setErrors] = useState({});

    const subtotal = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const totalItems = cart.reduce((sum, c) => sum + c.quantity, 0);

    function handleChange(e) {
        const { name, value } = e.target;

        // Auto-format card number with spaces
        if (name === 'cardNumber') {
            const cleaned = value.replace(/\D/g, '').slice(0, 16);
            const formatted = cleaned.match(/.{1,4}/g)?.join(' ') ?? cleaned;
            setForm(prev => ({ ...prev, cardNumber: formatted }));
            return;
        }

        // Auto-format expiry as MM/YY
        if (name === 'expiry') {
            const cleaned = value.replace(/\D/g, '').slice(0, 4);
            const formatted = cleaned.length > 2
                ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
                : cleaned;
            setForm(prev => ({ ...prev, expiry: formatted }));
            return;
        }

        // CVV numbers only
        if (name === 'cvv') {
            const cleaned = value.replace(/\D/g, '').slice(0, 4);
            setForm(prev => ({ ...prev, cvv: cleaned }));
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    }

    function validate() {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'Required';
        if (!form.lastName.trim()) newErrors.lastName = 'Required';
        if (!form.address.trim()) newErrors.address = 'Required';
        if (!form.city.trim()) newErrors.city = 'Required';
        if (!form.state.trim()) newErrors.state = 'Required';
        if (!form.zip.trim()) newErrors.zip = 'Required';
        if (!form.country.trim()) newErrors.country = 'Required';
        if (!form.cardName.trim()) newErrors.cardName = 'Required';
        if (form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Enter a valid 16-digit card number';
        if (form.expiry.length < 5) newErrors.expiry = 'Enter a valid expiry (MM/YY)';
        if (form.cvv.length < 3) newErrors.cvv = 'Enter a valid CVV';
        return newErrors;
    }

    function handlePlaceOrder() {
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        clearCart();
        router.push('/confirmation');
    }

    if (cart.length === 0) return (
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
            <span style={{ fontSize: '3rem' }}>🛒</span>
            <h2 style={{ color: '#1a3a4a', margin: 0 }}>Your cart is empty</h2>
            <button
                onClick={() => router.push('/')}
                style={primaryBtn}
            >
                ← Back to Store
            </button>
        </div>
    );

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
                <span style={{ fontSize: '1.4rem' }}>🐧</span>
                <span style={{ color: '#fff', fontSize: '1rem', letterSpacing: '1px', fontWeight: 'bold' }}>
                    PenguinStore — Checkout
                </span>
                <button
                    onClick={() => router.push('/')}
                    style={{
                        marginLeft: 'auto',
                        background: 'transparent',
                        border: '2px solid transparent',
                        borderRadius: '4px',
                        color: '#fff',
                        fontSize: '0.85rem',
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
            </div>

            <div style={{
                maxWidth: '1100px',
                margin: '2rem auto',
                padding: '0 2rem',
                display: 'flex',
                gap: '2rem',
                alignItems: 'flex-start',
            }}>
                {/* Left — form */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Shipping address */}
                    <section style={sectionStyle}>
                        <h2 style={sectionHeader}>📍 Shipping Address</h2>

                        <div style={rowStyle}>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>First Name</label>
                                <input
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    style={inputStyle(errors.firstName)}
                                    placeholder="Jack"
                                />
                                {errors.firstName && <span style={errorStyle}>{errors.firstName}</span>}
                            </div>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>Last Name</label>
                                <input
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    style={inputStyle(errors.lastName)}
                                    placeholder="Frost"
                                />
                                {errors.lastName && <span style={errorStyle}>{errors.lastName}</span>}
                            </div>
                        </div>

                        <div style={fieldWrapper}>
                            <label style={labelStyle}>Street Address</label>
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                style={inputStyle(errors.address)}
                                placeholder="1 Penguin Way"
                            />
                            {errors.address && <span style={errorStyle}>{errors.address}</span>}
                        </div>

                        <div style={rowStyle}>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>City</label>
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    style={inputStyle(errors.city)}
                                    placeholder="McMurdo"
                                />
                                {errors.city && <span style={errorStyle}>{errors.city}</span>}
                            </div>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>State / Province</label>
                                <input
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    style={inputStyle(errors.state)}
                                    placeholder="Antarctica"
                                />
                                {errors.state && <span style={errorStyle}>{errors.state}</span>}
                            </div>
                        </div>

                        <div style={rowStyle}>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>ZIP / Postal Code</label>
                                <input
                                    name="zip"
                                    value={form.zip}
                                    onChange={handleChange}
                                    style={inputStyle(errors.zip)}
                                    placeholder="00000"
                                />
                                {errors.zip && <span style={errorStyle}>{errors.zip}</span>}
                            </div>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>Country</label>
                                <input
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    style={inputStyle(errors.country)}
                                    placeholder="Antarctica"
                                />
                                {errors.country && <span style={errorStyle}>{errors.country}</span>}
                            </div>
                        </div>
                    </section>

                    {/* Payment info */}
                    <section style={sectionStyle}>
                        <h2 style={sectionHeader}>💳 Payment Information</h2>

                        <div style={fieldWrapper}>
                            <label style={labelStyle}>Name on Card</label>
                            <input
                                name="cardName"
                                value={form.cardName}
                                onChange={handleChange}
                                style={inputStyle(errors.cardName)}
                                placeholder="Jack Frost"
                            />
                            {errors.cardName && <span style={errorStyle}>{errors.cardName}</span>}
                        </div>

                        <div style={fieldWrapper}>
                            <label style={labelStyle}>Card Number</label>
                            <input
                                name="cardNumber"
                                value={form.cardNumber}
                                onChange={handleChange}
                                style={inputStyle(errors.cardNumber)}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                            />
                            {errors.cardNumber && <span style={errorStyle}>{errors.cardNumber}</span>}
                        </div>

                        <div style={rowStyle}>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>Expiry Date</label>
                                <input
                                    name="expiry"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    style={inputStyle(errors.expiry)}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                />
                                {errors.expiry && <span style={errorStyle}>{errors.expiry}</span>}
                            </div>
                            <div style={fieldWrapper}>
                                <label style={labelStyle}>CVV</label>
                                <input
                                    name="cvv"
                                    value={form.cvv}
                                    onChange={handleChange}
                                    style={inputStyle(errors.cvv)}
                                    placeholder="123"
                                    maxLength={4}
                                />
                                {errors.cvv && <span style={errorStyle}>{errors.cvv}</span>}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right — order summary */}
                <div style={{
                    width: '320px',
                    flexShrink: 0,
                    position: 'sticky',
                    top: '5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    <div style={sectionStyle}>
                        <h2 style={sectionHeader}>🧾 Order Summary</h2>

                        {/* Item list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                            {cart.map(c => (
                                <div key={c.item} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '0.5rem',
                                    fontSize: '0.85rem',
                                }}>
                                    <span style={{ color: '#1a2e3b', flex: 1, lineHeight: 1.4 }}>
                                        {c.item}
                                        <span style={{ color: '#6a9ab0', display: 'block', fontSize: '0.75rem' }}>
                                            Qty: {c.quantity}
                                        </span>
                                    </span>
                                    <span style={{ color: '#1a3a4a', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                                        ${(c.price * c.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid #d0e8f2', margin: '0.5rem 0' }} />

                        {/* Totals */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={summaryRow}>
                                <span style={{ color: '#5a7a8a', fontSize: '0.85rem' }}>
                                    Items ({totalItems}):
                                </span>
                                <span style={{ fontSize: '0.85rem', color: '#1a2e3b' }}>
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div style={summaryRow}>
                                <span style={{ color: '#5a7a8a', fontSize: '0.85rem' }}>Shipping:</span>
                                <span style={{ fontSize: '0.85rem', color: '#2a8a5a', fontWeight: 'bold' }}>FREE</span>
                            </div>
                            <div style={summaryRow}>
                                <span style={{ color: '#5a7a8a', fontSize: '0.85rem' }}>Tax (8%):</span>
                                <span style={{ fontSize: '0.85rem', color: '#1a2e3b' }}>${tax.toFixed(2)}</span>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #d0e8f2', margin: '0.25rem 0' }} />

                            <div style={summaryRow}>
                                <span style={{ color: '#1a3a4a', fontWeight: 'bold', fontSize: '1rem' }}>
                                    Order Total:
                                </span>
                                <span style={{ color: '#1a3a4a', fontWeight: 'bold', fontSize: '1rem' }}>
                                    ${total.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            style={{
                                marginTop: '1rem',
                                background: '#f0a500',
                                color: '#1a2e3b',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '0.75rem',
                                fontSize: '0.95rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontFamily: 'Georgia, serif',
                                width: '100%',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#d08800'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f0a500'}
                        >
                            🐧 Place Your Order
                        </button>

                        <p style={{ margin: 0, fontSize: '0.72rem', color: '#8ab4c8', textAlign: 'center' }}>
                            By placing your order, you agree to PenguinStore's privacy policy and conditions of use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Shared styles
const sectionStyle = {
    background: '#fff',
    border: '1px solid #d0e8f2',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

const sectionHeader = {
    margin: 0,
    fontSize: '1.1rem',
    color: '#1a3a4a',
    paddingBottom: '0.75rem',
    borderBottom: '1px solid #d0e8f2',
};

const rowStyle = {
    display: 'flex',
    gap: '1rem',
};

const fieldWrapper = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    flex: 1,
};

const labelStyle = {
    fontSize: '0.82rem',
    color: '#1a3a4a',
    fontWeight: 'bold',
};

const inputStyle = (hasError) => ({
    padding: '0.6rem 0.85rem',
    borderRadius: '8px',
    border: `1.5px solid ${hasError ? '#e07a7a' : '#d0e8f2'}`,
    fontSize: '0.9rem',
    color: '#1a2e3b',
    fontFamily: 'Georgia, serif',
    outline: 'none',
    background: '#f9fdff',
    transition: 'border-color 0.15s',
});

const errorStyle = {
    color: '#e07a7a',
    fontSize: '0.75rem',
};

const summaryRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const primaryBtn = {
    background: '#1a3a4a',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '0.6rem 1.5rem',
    fontSize: '0.9rem',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
};
