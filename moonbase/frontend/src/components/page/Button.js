import React from 'react';

function Button({ className, text, disabled, onClick }) {
    return (
        <button onClick={onClick} disabled={!disabled ? false : true} className={`btn ${className && className}`}>{text}</button>
    )
}

export default Button;
