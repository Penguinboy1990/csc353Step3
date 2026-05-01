"use client";
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CATEGORIES = ['All', 'Toys', 'Food', 'Clothing', 'Gear', 'Home', 'Art', 'Books'];

function NavBar({ cart, products, activeCategory, onCategoryChange, searchQuery, onSearchChange }) {
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // ← add this line

    function handleSearch(e) {
        const query = e.target.value;
        onSearchChange(query); // ← update parent state
        if (query.trim()) {
            const results = products.filter(p =>
                p.item.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }

    // Add a clear search function for when a dropdown result is clicked:
    function selectResult(item) {
        onSearchChange(item);
        setShowResults(false);
    }

    return (
        <nav style={{
            width: '100%',
            background: '#1a3a4a',
            fontFamily: 'Georgia, serif',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
        }}>
            {/* Main navbar row */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.6rem 1.5rem',
                gap: '1rem',
            }}>
                {/* Logo */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '2px solid transparent',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                    <span style={{ fontSize: '1.4rem' }}>🐧</span>
                    <span style={{ color: '#fff', fontSize: '0.7rem', letterSpacing: '1px' }}>PenguinStore</span>
                </div>

                {/* Deliver to */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid transparent',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                    <span style={{ color: '#8ab4c8', fontSize: '0.65rem' }}>📍 Deliver to</span>
                    <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>South Pole</span>
                </div>

                {/* Search bar */}
                <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
                    <select style={{
                        background: '#d0e8f2',
                        border: 'none',
                        borderRadius: '4px 0 0 4px',
                        padding: '0 0.5rem',
                        fontSize: '0.75rem',
                        color: '#1a2e3b',
                        cursor: 'pointer',
                        height: '38px',
                    }}>
                        {CATEGORIES.map(cat => (
                            <option key={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        onBlur={() => setTimeout(() => setShowResults(false), 150)}
                        onFocus={() => searchQuery && setShowResults(true)}
                        placeholder="Search products..."
                        style={{
                            flex: 1,
                            padding: '0 1rem',
                            border: 'none',
                            fontSize: '0.95rem',
                            color: '#1a2e3b',
                            outline: 'none',
                            height: '38px',
                            background: '#fff',
                        }}
                    />
                    {/* Clear Search Bar Button */}
                    {searchQuery && (
                        <button
                            onClick={() => { onSearchChange(''); setShowResults(false); }}
                            style={{
                                background: '#fff',
                                border: 'none',
                                padding: '0 0.5rem',
                                cursor: 'pointer',
                                color: '#8ab4c8',
                                fontSize: '0.9rem',
                                height: '38px',
                            }}
                        >
                            ✕
                        </button>
                    )}
                    <button style={{
                        background: '#6a9ab0',
                        border: 'none',
                        borderRadius: '0 4px 4px 0',
                        padding: '0 1rem',
                        cursor: 'pointer',
                        height: '38px',
                        fontSize: '1rem',
                    }}
                            onMouseEnter={e => e.currentTarget.style.background = '#a8dfc0'}
                            onMouseLeave={e => e.currentTarget.style.background = '#6a9ab0'}
                    >
                        🔍
                    </button>

                    {/* Search dropdown */}
                    {showResults && (
                        <div style={{
                            position: 'absolute',
                            top: '42px',
                            left: '0',
                            right: '0',
                            background: '#fff',
                            border: '1px solid #d0e8f2',
                            borderRadius: '4px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            zIndex: 1001,
                            maxHeight: '200px',
                            overflowY: 'auto',
                        }}>
                            {searchResults.length === 0 ? (
                                <div style={{ padding: '0.75rem 1rem', color: '#8ab4c8', fontSize: '0.85rem' }}>
                                    No products found
                                </div>
                            ) : (
                                searchResults.map(p => (
                                    <div
                                        key={p.id}
                                        onClick={() => selectResult(p.item)}
                                        style={{
                                            padding: '0.6rem 1rem',
                                            fontSize: '0.85rem',
                                            color: '#1a2e3b',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#f0f8ff'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                                    >
                                        <span style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: '#6a9ab0',
                                            flexShrink: 0,
                                        }} />
                                        {p.item}
                                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#8ab4c8' }}>
                                            {p.category}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Account */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid transparent',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                    <span style={{ color: '#8ab4c8', fontSize: '0.65rem' }}>Hello, Penguin</span>
                    <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>Account & Lists ▾</span>
                </div>

                {/* Orders */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '2px solid transparent',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                    <span style={{ color: '#8ab4c8', fontSize: '0.65rem' }}>Returns</span>
                    <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>&amp; Orders</span>
                </div>

                {/* Cart icon */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    border: '2px solid transparent',
                    borderRadius: '4px',
                    padding: '0.2rem 0.5rem',
                    cursor: 'pointer',
                    position: 'relative',
                }}
                     onMouseEnter={e => e.currentTarget.style.borderColor = '#fff'}
                     onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                    <div style={{ position: 'relative' }}>
                        <span style={{ fontSize: '1.6rem' }}>🛒</span>
                        {totalItems > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                background: '#a8dfc0',
                                color: '#1a3a4a',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                fontSize: '0.7rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {totalItems}
                            </span>
                        )}
                    </div>
                    <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold' }}>Cart</span>
                </div>
            </div>

            {/* Secondary navbar — category filters */}
            <div style={{
                background: '#254d63',
                padding: '0.4rem 1.5rem',
                display: 'flex',
                gap: '0.25rem',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        style={{
                            background: activeCategory === cat ? '#a8dfc0' : 'transparent',
                            border: `2px solid ${activeCategory === cat ? '#a8dfc0' : 'transparent'}`,
                            borderRadius: '4px',
                            color: activeCategory === cat ? '#1a2e3b' : '#fff',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Georgia, serif',
                            fontWeight: activeCategory === cat ? 'bold' : 'normal',
                            transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => {
                            if (activeCategory !== cat) e.currentTarget.style.borderColor = '#fff';
                        }}
                        onMouseLeave={e => {
                            if (activeCategory !== cat) e.currentTarget.style.borderColor = 'transparent';
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </nav>
    );
}

NavBar.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.shape({
        item: PropTypes.string,
        quantity: PropTypes.number,
    })),
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        item: PropTypes.string,
        category: PropTypes.string,
    })),
    activeCategory: PropTypes.string,
    onCategoryChange: PropTypes.func,
    searchQuery: PropTypes.string,
    onSearchChange: PropTypes.func,
};

export default NavBar;
