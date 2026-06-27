import React from 'react';

const Input = ({ name, label, inputType = 'text', value, error, onChange, placeholder }) => {
    return (
        <div className="form-group">
            {label && (
                <label className="form-label" htmlFor={name}>{label}</label>
            )}
            <input
                id={name}
                type={inputType}
                className={`form-control${error ? ' is-invalid' : ''}`}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder || ''}
            />
            {error && <p className="form-error">{error}</p>}
        </div>
    );
};

export default Input;