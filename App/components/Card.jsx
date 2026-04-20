import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Card({ id, task: initialTask, isCompleted: initialIsCompleted }) {
    const [task] = useState(initialTask ?? "Do Something");
    const [isCompleted, setIsCompleted] = useState(initialIsCompleted ?? false);

    return (
        <div style={{
            background: isCompleted ? '#f0faf5' : '#fff',
            border: `2px solid ${isCompleted ? '#a8dfc0' : '#d0e8f2'}`,
            borderRadius: '12px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            opacity: isCompleted ? 0.8 : 1,
        }}>
            <span style={{ fontSize: '0.75rem', color: '#8ab4c8', fontFamily: 'monospace' }}>#{id}</span>
            <p style={{
                flex: 1,
                margin: 0,
                textDecoration: isCompleted ? 'line-through' : 'none',
                color: isCompleted ? '#7a9aaa' : '#1a2e3b',
            }}>
                {task}
            </p>
            <button
                onClick={() => setIsCompleted(!isCompleted)}
                style={{
                    background: isCompleted ? '#a8dfc0' : '#3a7ca5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.35rem 0.75rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                }}
            >
                {isCompleted ? '✅ Done' : 'Mark Done'}
            </button>
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.number,
    task: PropTypes.string,
    isCompleted: PropTypes.bool,
};

export default Card;
