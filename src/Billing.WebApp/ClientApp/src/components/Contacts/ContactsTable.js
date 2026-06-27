import React from 'react';
import { Link } from 'react-router-dom';
import Favourite from '../Tables/Favourite';
import Table from '../Tables/Table';
import { FaStar } from 'react-icons/fa';

const ContactsTable = ({ contacts, sortColumn, onFavourite, onDelete, onSort }) => {
    const columns = [
        {
            key: 'name',
            name: 'Name',
            content: c => (
                <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>
                        {c.firstName} {c.lastName}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--color-text-muted)' }}>{c.email}</div>
                </div>
            )
        },
        { path: 'businessName', name: 'Business' },
        {
            key: 'favourite',
            name: <FaStar style={{ color: '#f59e0b' }} />,
            content: c => (
                <Favourite favourited={c.favourited} onClick={() => onFavourite(c)} />
            )
        },
        {
            key: 'actions',
            name: '',
            content: c => (
                <div className="flex gap-2">
                    <Link to={`/contacts/${c.id}`} className="btn btn-secondary btn-sm">Edit</Link>
                    <button onClick={() => onDelete(c)} className="btn btn-danger btn-sm">Delete</button>
                </div>
            )
        },
    ];

    return (
        <Table
            data={contacts}
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
        />
    );
};

export default ContactsTable;