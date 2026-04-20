"use client";
import React, { useState } from 'react';
import Card from './components/Card';
import db from './backend/db.json';

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            padding: '3rem 1.5rem',
            fontFamily: 'Georgia, serif',
        }}>
            <h1 style={{ textAlign: 'center', color: '#1a3a4a', marginBottom: '0.25rem' }}>
                🐧 The Penguin's Store
            </h1>
            <p style={{ textAlign: 'center', color: '#6a9ab0', fontStyle: 'italic', marginBottom: '2rem' }}>
                Your icy-cool task list
            </p>

            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {db.todos.map((item) => (
                    <Card key={item.id} id={item.id} task={item.task} isCompleted={item.completed} />
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <button
                    onClick={() => setCount((c) => c + 1)}
                    style={{
                        background: '#1a3a4a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '0.65rem 1.5rem',
                        fontSize: '1rem',
                        cursor: 'pointer',
                    }}
                >
                    🐧 Penguins counted: {count}
                </button>
            </div>
        </div>
    );
}
