import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../store/auth';
import { FaFileInvoiceDollar, FaFileInvoice, FaUsers, FaKey } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

export const NavMenu = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const auth  = useSelector(state => state.entities.auth.token);
  const user  = useSelector(state => state.entities.auth.user);
  const admin = useSelector(state => state.entities.auth.admin);

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'U';

  return (
    <nav className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaFileInvoiceDollar size={24} style={{ color: 'var(--color-primary)' }} />
        </div>
        <div>
          <div className="sidebar-logo-text">ClearBook</div>
          <div className="sidebar-logo-sub">Management System</div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav">
        <span className="sidebar-section-label">Menu</span>

        {/* Always show Dashboard */}
        <Link
          to="/"
          className={`sidebar-link${isActive('/') ? ' active' : ''}`}
        >
          <span className="link-icon" style={{ display: 'flex', alignItems: 'center' }}>
            <MdDashboard size={20} />
          </span>
          Dashboard
        </Link>

        {/* Protected links */}
        {auth && (
          <>
            <Link
              to="/invoices"
              className={`sidebar-link${isActive('/invoices') ? ' active' : ''}`}
            >
              <span className="link-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <FaFileInvoice size={18} />
              </span>
              Invoices
            </Link>
            <Link
              to="/contacts"
              className={`sidebar-link${isActive('/contacts') ? ' active' : ''}`}
            >
              <span className="link-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <FaUsers size={18} />
              </span>
              Contacts
            </Link>
          </>
        )}

        {!auth && (
          <>
            <span className="sidebar-section-label" style={{ marginTop: 12 }}>Account</span>
            <Link
              to="/login"
              className={`sidebar-link${isActive('/login') ? ' active' : ''}`}
            >
              <span className="link-icon" style={{ display: 'flex', alignItems: 'center' }}>
                <FaKey size={18} />
              </span>
              Login
            </Link>
          </>
        )}
      </div>

      {/* Footer / User area */}
      {auth && (
        <div className="sidebar-footer">
          <div className="sidebar-user" onClick={handleLogout} title="Click to logout">
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.email || 'User'}</div>
              <div className="sidebar-user-role">{admin ? 'Administrator' : 'Viewer'} · Logout</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};