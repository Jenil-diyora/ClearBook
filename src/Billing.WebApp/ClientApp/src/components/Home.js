import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadInvoices } from '../store/invoices';
import { loadContacts } from '../store/contacts';
import { FaFileInvoice, FaUsers, FaCheckCircle, FaHourglassHalf } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const invoices = useSelector(state => state.entities.invoices.data);
  const contacts = useSelector(state => state.entities.contacts.data);

  useEffect(() => {
    dispatch(loadInvoices());
    dispatch(loadContacts());
  }, [dispatch]);

  const totalInvoices = invoices.length;
  const totalContacts = contacts.length;
  const paidInvoices = invoices.filter(i => i.status === 'PUBLISHED' && i.paid).length;
  const pendingInvoices = invoices.filter(i => i.status !== 'PUBLISHED' || !i.paid).length;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back — here's a quick overview of your billing activity.</p>
      </div>

      <div className="page-body">
        {/* Stats Row */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaFileInvoice size={22} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div className="stat-value">{totalInvoices}</div>
            <div className="stat-label">Total Invoices</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaUsers size={22} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div className="stat-value">{totalContacts}</div>
            <div className="stat-label">Contacts</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaCheckCircle size={22} style={{ color: '#10b981' }} />
            </div>
            <div className="stat-value">{paidInvoices}</div>
            <div className="stat-label">Paid Invoices</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaHourglassHalf size={20} style={{ color: '#f59e0b' }} />
            </div>
            <div className="stat-value">{pendingInvoices}</div>
            <div className="stat-label">Pending / Drafts</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <span className="card-title">Quick Actions</span>
          </div>
          <div className="flex gap-2" style={{ flexWrap: 'wrap', padding: '0 20px 20px' }}>
            <a href="/invoices/new" className="btn btn-primary">
              + New Invoice
            </a>
            <a href="/contacts/new" className="btn btn-secondary">
              + Add Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Home };
