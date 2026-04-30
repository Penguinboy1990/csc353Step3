"use client";
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const apiURL = '/api/todos';

function Card({ id, task: initialTask, description, image, price, isCompleted: initialIsCompleted, onDelete, onAddToCart }) {
    const [task, setTask] = useState(initialTask ?? 'Do Something');
    const [isCompleted, setIsCompleted] = useState(initialIsCompleted ?? false);
    const [showCrud, setShowCrud] = useState(false);

    // Star rating — pseudo-random but stable per id
    const rating = ((id * 7) % 10) / 2 + 3; // between 3.0 and 4.5
    const roundedRating = Math.round(rating * 2) / 2;
    const reviewCount = ((id * 13) % 900) + 100;

    function renderStars(r) {
        return Array.from({ length: 5 }, (_, i) => {
            if (i < Math.floor(r)) return '★';
            if (i < r) return '⯨';
            return '☆';
        }).join('');
    }

    async function toggleComplete() {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !isCompleted }),
        });
        if (response.ok) setIsCompleted(!isCompleted);
    }

    async function editTodo() {
        const newTask = prompt('Edit your todo:');
        if (!newTask) return;
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: newTask }),
        });
        if (response.ok) setTask(newTask);
    }

    async function deleteTodo() {
        const response = await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        if (response.ok) onDelete(id);
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
            opacity: isCompleted ? 0.75 : 1,
        }}
             onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.13)'}
             onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)'}
        >
            {/* Product image */}
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#f0f8ff' }}>
                <img
                    src={image}
                    alt={task}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                    }}
                    onError={e => { e.target.style.display = 'none'; }}
                />
                {/* ID badge */}
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
                {/* Completed badge */}
                {isCompleted && (
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
                    }}>✅ Purchased</span>
                )}
            </div>

            {/* Product info */}
            <div style={{ padding: '0.85rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {/* Title */}
                <p style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    fontWeight: 'bold',
                    color: '#1a2e3b',
                    textDecoration: isCompleted ? 'line-through' : 'none',
                    lineHeight: 1.3,
                }}>
                    🐧 {task}
                </p>

                {/* Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: '#f0a500', fontSize: '0.85rem', letterSpacing: '1px' }}>
                        {renderStars(roundedRating)}
                    </span>
                    <span style={{ color: '#6a9ab0', fontSize: '0.75rem' }}>
                        {roundedRating.toFixed(1)} ({reviewCount.toLocaleString()})
                    </span>
                </div>

                {/* Description */}
                <p style={{
                    margin: 0,
                    fontSize: '0.78rem',
                    color: '#5a7a8a',
                    lineHeight: 1.5,
                }}>
                    {description}
                </p>

                {/* Price */}
                <p style={{ margin: 0, fontSize: '1.2rem', color: '#1a3a4a', fontWeight: 'bold' }}>
                    ${price != null ? price.toFixed(2) : '—'}
                </p>

                {/* Prime badge */}
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
                    onClick={() => onAddToCart(task)}
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

function crudBtn(bg) {
    return {
        background: bg,
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.3rem 0.6rem',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontFamily: 'Georgia, serif',
    };
}

Card.propTypes = {
    id: PropTypes.number,
    task: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    isCompleted: PropTypes.bool,
    onDelete: PropTypes.func,
    onAddToCart: PropTypes.func,
};

export default Card;
