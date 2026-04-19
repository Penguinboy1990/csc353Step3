"use client";
import Image from "next/image";
import db from './backend/db.json';
import React, { useState } from 'react';
export default function Home() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>
                🐧 The Penguin's Store 🐧
            </h1>
            {db.todos.map((item) => (
                <p key={item.id}>
                    {item.task} {item.completed ? "✅" : "❌"}
                </p>
            ))}
            <>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                </div>
            </>
        </div>
    );
}
