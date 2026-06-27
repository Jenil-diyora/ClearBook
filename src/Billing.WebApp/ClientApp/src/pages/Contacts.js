import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts, deleteContact, updateContact } from '../store/contacts';
import ContactsTable from '../components/Contacts/ContactsTable';
import Pagination from '../components/Tables/Pagination';
import SearchBox from '../components/Tables/SearchBox';
import { paginate } from '../utils/paginate';

const FILTER_TAGS = [
    { id: '',  name: 'All Contacts',   value: null  },
    { id: 1,   name: '⭐ Favourited',  value: true  },
    { id: 2,   name: 'Not Favourited', value: false },
];

const Contacts = () => {
    const dispatch    = useDispatch();
    const allContacts = useSelector(state => state.entities.contacts.data);
    const loading     = useSelector(state => state.entities.contacts.loading);

    const [pageSize]                      = useState(8);
    const [currentPage, setCurrentPage]   = useState(1);
    const [selectedTag, setSelectedTag]   = useState(FILTER_TAGS[0]);
    const [sortColumn, setSortColumn]     = useState({ path: 'firstName', order: 'asc' });
    const [searchQuery, setSearchQuery]   = useState('');
    const [contacts, setContacts]         = useState([]);

    useEffect(() => { dispatch(loadContacts()); }, [dispatch]);
    useEffect(() => { setContacts(allContacts); }, [allContacts]);

    const handleDelete = contact => {
        if (window.confirm('Delete this contact?')) {
            dispatch(deleteContact(contact.id));
            setContacts(prev => prev.filter(c => c.id !== contact.id));
        }
    };

    const handleFavourite = contact => {
        const updated = contacts.map(c =>
            c.id === contact.id ? { ...c, favourited: !c.favourited } : c
        );
        dispatch(updateContact({ ...contact, favourited: !contact.favourited }));
        setContacts(updated);
    };

    const handleSearch = query => {
        setSearchQuery(query);
        setCurrentPage(1);
        setSelectedTag(FILTER_TAGS[0]);
    };

    const handleTagSelect = tag => {
        setSelectedTag(tag);
        setSearchQuery('');
        setCurrentPage(1);
    };

    const getPagedData = () => {
        let filtered = [...contacts];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = contacts.filter(c =>
                c.firstName?.toLowerCase().includes(q) ||
                c.lastName?.toLowerCase().includes(q) ||
                c.businessName?.toLowerCase().includes(q)
            );
        } else if (selectedTag?.id) {
            filtered = contacts.filter(c => c.favourited === selectedTag.value);
        }
        const sorted = filtered.sort((a, b) =>
            (sortColumn.order === 'asc'
                ? a[sortColumn.path] > b[sortColumn.path]
                : b[sortColumn.path] > a[sortColumn.path]) ? 1 : -1
        );
        return { totalCount: filtered.length, data: paginate(sorted, currentPage, pageSize) };
    };

    const { totalCount, data } = getPagedData();

    return (
        <div>
            <div className="page-header">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="page-title">Contacts</h1>
                        <p className="page-subtitle">
                            {loading ? 'Loading…' : `${totalCount} contact${totalCount !== 1 ? 's' : ''} found`}
                        </p>
                    </div>
                    <Link to="/contacts/new" className="btn btn-primary">
                        + New Contact
                    </Link>
                </div>
            </div>

            <div className="page-body">
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    {/* Filter sidebar */}
                    <div className="card" style={{ width: 180, flexShrink: 0, padding: 12 }}>
                        <p className="form-label" style={{ marginBottom: 8 }}>Filter</p>
                        {FILTER_TAGS.map(tag => (
                            <button
                                key={tag.id}
                                onClick={() => handleTagSelect(tag)}
                                className="sidebar-link"
                                style={{
                                    color: selectedTag?.id === tag.id
                                        ? 'var(--color-accent)'
                                        : 'var(--color-text-dim)',
                                    background: selectedTag?.id === tag.id
                                        ? 'var(--color-accent-light)'
                                        : 'transparent',
                                    fontSize: 13,
                                    padding: '8px 10px',
                                }}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>

                    {/* Main table */}
                    <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                            <SearchBox
                                value={searchQuery}
                                placeholder="Search by name or business…"
                                onChange={handleSearch}
                            />
                        </div>

                        {loading ? (
                            <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                <div className="spinner spinner-dark" style={{ margin: '0 auto 12px' }} />
                                Loading contacts…
                            </div>
                        ) : data.length === 0 ? (
                            <div style={{ padding: 48, textAlign: 'center' }}>
                                <div style={{ fontSize: 40, marginBottom: 12 }}>
                                    <span role="img" aria-label="Contacts">👥</span>
                                </div>
                                <p style={{ color: 'var(--color-text-muted)' }}>
                                    {searchQuery ? 'No contacts match your search.' : 'No contacts yet. Add your first one!'}
                                </p>
                                {!searchQuery && (
                                    <Link to="/contacts/new" className="btn btn-primary" style={{ marginTop: 16 }}>
                                        + Add Contact
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <>
                                <ContactsTable
                                    contacts={data}
                                    sortColumn={sortColumn}
                                    onFavourite={handleFavourite}
                                    onDelete={handleDelete}
                                    onSort={setSortColumn}
                                />
                                <div style={{ padding: '12px 20px', borderTop: '1px solid var(--color-border)' }}>
                                    <Pagination
                                        itemsCount={totalCount}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacts;