import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadInvoices, deleteInvoice } from '../store/invoices';
import InvoicesTable from '../components/Invoices/InvoicesTable';
import Pagination from '../components/Tables/Pagination';
import SearchBox from '../components/Tables/SearchBox';
import { paginate } from '../utils/paginate';

const Invoices = () => {
    const dispatch    = useDispatch();
    const allInvoices = useSelector(state => state.entities.invoices.data);
    const loading     = useSelector(state => state.entities.invoices.loading);

    const [pageSize]                  = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn]   = useState({ path: 'id', order: 'asc' });
    const [searchQuery, setSearchQuery] = useState('');
    const [invoices, setInvoices]       = useState([]);

    useEffect(() => {
        dispatch(loadInvoices());
    }, [dispatch]);

    useEffect(() => {
        setInvoices(allInvoices);
    }, [allInvoices]);

    const handleDelete = invoice => {
        if (window.confirm('Delete this invoice?')) {
            dispatch(deleteInvoice(invoice.id));
            setInvoices(prev => prev.filter(i => i.id !== invoice.id));
        }
    };

    const getPagedData = () => {
        let filtered = [...invoices];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = invoices.filter(i =>
                i.reference && i.reference.toLowerCase().includes(q)
            );
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
                        <h1 className="page-title">Invoices</h1>
                        <p className="page-subtitle">
                            {loading ? 'Loading…' : `${totalCount} invoice${totalCount !== 1 ? 's' : ''} found`}
                        </p>
                    </div>
                    <Link to="/invoices/new" className="btn btn-primary">
                        + New Invoice
                    </Link>
                </div>
            </div>

            <div className="page-body">
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* Toolbar */}
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                        <SearchBox
                            value={searchQuery}
                            placeholder="Search by reference…"
                            onChange={q => { setSearchQuery(q); setCurrentPage(1); }}
                        />
                    </div>

                    {loading ? (
                        <div style={{ padding: 40, textAlign: 'center', color: 'var(--color-text-muted)' }}>
                            <div className="spinner spinner-dark" style={{ margin: '0 auto 12px' }} />
                            Loading invoices…
                        </div>
                    ) : data.length === 0 ? (
                        <div style={{ padding: 48, textAlign: 'center' }}>
                            <div style={{ fontSize: 40, marginBottom: 12 }}>
                                <span role="img" aria-label="Invoice">🧾</span>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)' }}>
                                {searchQuery ? 'No invoices match your search.' : 'No invoices yet. Create your first one!'}
                            </p>
                            {!searchQuery && (
                                <Link to="/invoices/new" className="btn btn-primary" style={{ marginTop: 16 }}>
                                    + Create Invoice
                                </Link>
                            )}
                        </div>
                    ) : (
                        <>
                            <InvoicesTable
                                invoices={data}
                                sortColumn={sortColumn}
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
    );
};

export default Invoices;