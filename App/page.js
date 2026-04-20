"use client";
import React, { useState, useEffect } from 'react';
import Card from './components/Card';

const apiURL = '/api/todos';
export default function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const response = await fetch(apiURL);
        const data = await response.json();
        setTodos(data);
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            padding: '3rem 1.5rem',
            fontFamily: 'Georgia, serif',
        }}>
            <h1 style={{ textAlign: 'center', color: '#1a3a4a', marginBottom: '0.25rem' }}>
                🐧 The Penguin's Store 🐧
            </h1>
            <p style={{ textAlign: 'center', color: '#6a9ab0', fontStyle: 'italic', marginBottom: '2rem' }}>
                Your icy-cool task list
            </p>

            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {todos.map((item) => (
                    <Card
                        key={item.id}
                        id={item.id}
                        task={item.task}
                        isCompleted={item.completed}
                        onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
                    />
                ))}
            </div>
        </div>
    );
}
