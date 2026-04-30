"use client";
{/* This acts like App.jsx */}
import React, { useState, useEffect, useRef } from 'react';
import Card from './components/Card';
import ShoppingCart from './components/ShoppingCart';
import NavBar from './components/NavBar';

const apiURL = '/api/todos';

export default function Home() {
    const [todos, setTodos] = useState([]);
    const [cart, setCart] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const response = await fetch(apiURL);
        const data = await response.json();
        setTodos(data);
    }

    async function addTodo() {
        const newTask = inputRef.current.value;
        if (!newTask.trim()) return;

        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: newTask, completed: false }),
        });

        if (response.ok) {
            const added = await response.json();
            setTodos(prev => [...prev, added]);
            inputRef.current.value = '';
        }
    }

    function addToCart(task) {
        setCart(prev => {
            const existing = prev.find(item => item.task === task);
            if (existing) {
                return prev.map(item =>
                    item.task === task
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { task, quantity: 1 }];
        });
    }

    function removeFromCart(task) {
        setCart(prev => prev.filter(item => item.task !== task));
    }

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
            padding: '3rem 1.5rem',
            fontFamily: 'Georgia, serif',
            display: 'flex',
            gap: '2rem',
            alignItems: 'flex-start',
        }}>
            <div style={{ flex: 1 }}>
                {/* Nav Bar */}
                <div style={{
                    minHeight: '100vh',
                    background: 'linear-gradient(160deg, #e8f4fb, #f5fbff)',
                    fontFamily: 'Georgia, serif',
                }}>
                    <NavBar cart={cart} todos={todos} />

                    <div style={{ padding: '3rem 1.5rem', display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                        {/* rest of the existing content */}
                    </div>
                </div>

                {/* Todo list — grid layout for product cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                    gap: '1rem',
                    maxWidth: '900px',
                    margin: '0 auto',
                }}>
                    {todos.map((item) => (
                        <Card
                            key={item.id}
                            id={item.id}
                            task={item.task}
                            description={item.description}
                            image={item.image}
                            price={item.price}
                            isCompleted={item.completed}
                            onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
                            onAddToCart={addToCart}
                        />
                    ))}
                </div>
            </div>

            {/* Shopping cart sidebar */}
            <ShoppingCart cart={cart} onRemove={removeFromCart} />
        </div>
    );
}