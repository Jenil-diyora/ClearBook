import React from 'react';
import { Link } from 'react-router-dom';
import Table from '../Tables/Table';

const InvoicesTable = ({ invoices, sortColumn, onDelete, onSort }) => {
    const columns = [
        { path: 'id', name: '#' },
        { path: 'reference', name: 'Reference' },
        {
            key: 'customer',
            name: 'Customer',
            content: inv => inv.contact?.businessName || '—'
        },
        {
            key: 'price',
            name: 'Total',
            content: inv => {
                const total = inv.invoiceItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
                return <strong>${total.toFixed(2)}</strong>;
            }
        },
        {
            key: 'due',
            name: 'Due Date',
            content: inv => new Date(inv.due).toLocaleDateString()
        },
        {
            key: 'paid',
            name: 'Paid',
            content: inv => (
                <span className={`badge ${inv.paid ? 'badge-success' : 'badge-warning'}`}>
                    {inv.paid ? '✓ Paid' : 'Pending'}
                </span>
            )
        },
        {
            key: 'actions',
            name: '',
            content: inv => (
                <div className="flex gap-2">
                    <Link to={`/invoices/view/${inv.id}`} className="btn btn-secondary btn-sm">View</Link>
                    <Link to={`/invoices/${inv.id}`}      className="btn btn-secondary btn-sm">Edit</Link>
                    <button onClick={() => onDelete(inv)} className="btn btn-danger btn-sm">Delete</button>
                </div>
            )
        },
    ];

    return (
        <Table
            data={invoices}
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
};

export default InvoicesTable;