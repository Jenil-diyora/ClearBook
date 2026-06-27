import React from 'react';

const Button = ({ loading, text, name, variant = 'primary', block, size, onClick, type = 'submit' }) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        block ? 'btn-block' : '',
        size  ? `btn-${size}` : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            name={name || 'button'}
            type={type}
            className={classes}
            disabled={!!loading}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <span className="spinner" />
                    Loading…
                </>
            ) : text}
        </button>
    );
};

export default Button;