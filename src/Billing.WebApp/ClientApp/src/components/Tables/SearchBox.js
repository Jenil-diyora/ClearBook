import React from 'react';

const SearchBox = ({ value, placeholder = 'Search…', onChange }) => {
    return (
        <div style={{ position: 'relative' }}>
            <span role="img" aria-label="Search" style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                fontSize: 15,
                pointerEvents: 'none',
            }}>🔍</span>
            <input
                type="text"
                name="query"
                className="form-control"
                style={{ paddingLeft: 36 }}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
            />
        </div>
    );
};

export default SearchBox;