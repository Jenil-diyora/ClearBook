import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../store/auth';
import { FaFileInvoiceDollar, FaExclamationTriangle } from 'react-icons/fa';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading     = useSelector(state => state.entities.auth.loading);
  const serverError = useSelector(state => state.entities.auth.error);

  const [data, setData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!data.username.trim()) errs.username = 'Email / username is required';
    if (!data.password)        errs.password = 'Password is required';
    return errs;
  };

  const handleChange = e => {
    const { name, value } = e.target;          // capture before event is pooled
    setData(prev => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    dispatch(authLogin(data));
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <div className="login-logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FaFileInvoiceDollar size={28} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            <div className="login-logo-text">ClearBook</div>
            <div className="login-logo-sub">Management System</div>
          </div>
        </div>

        <h1 className="login-heading">Welcome back</h1>
        <p className="login-subheading">Sign in to your account to continue</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="username">Email / Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className={`form-control${errors.username ? ' is-invalid' : ''}`}
              placeholder="you@example.com"
              value={data.username}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.username && <p className="form-error">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: 24 }}>
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control${errors.password ? ' is-invalid' : ''}`}
              placeholder="••••••••"
              value={data.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="alert alert-danger mb-3" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaExclamationTriangle style={{ color: '#ef4444', flexShrink: 0 }} /> {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;