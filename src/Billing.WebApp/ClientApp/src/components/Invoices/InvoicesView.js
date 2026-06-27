import React, { useState, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadInvoices } from "../../store/invoices";
import { loadInvoiceTaxes } from "../../store/invoiceTaxes";
import Spinner from '../Spinner/Spinner';
import InvoiceViewHeader from './InvoiceViewHeader';
import InvoiceViewBody from './InvoiceViewBody';
import InvoiceViewFooter from './InvoiceViewFooter';
import InvoiceTotal from './InvoiceTotal';

const InvoicesView = ({ match }) => {
    const dispatch = useDispatch();
    const allInvoices = useSelector(state => state.entities.invoices.data);
    const invoiceTaxes = useSelector(state => state.entities.invoiceTaxes.data);
    const [invoiceId] = useState(match.params.id);
    const [data, setdata] = useState();
  
    const count = allInvoices.length;

    useEffect(() => {
        dispatch(loadInvoices());
        dispatch(loadInvoiceTaxes());

        const invoice = allInvoices.find(c => c.id === parseInt(invoiceId));
        if (!invoice) return;
        setdata({
            ...invoice,
            contactId: invoice.contact.id       
        });
      }, [allInvoices, invoiceTaxes, invoiceId, dispatch]);

    const onPrint = () => {
        window.print();
    }

    if (count <= 0 || !data) return <Spinner showText={false} />;
    if (count >= 1 && !allInvoices.find(c => c.id === parseInt(invoiceId))) return <Redirect to="/not-found" />;

    return (
        <div className="form-container">
            <div className="card form-card">
                <div className="row print-title" style={{ alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                    <div className="col-8">
                        <h1 className="form-header-title" style={{ margin: 0 }}>{"Invoice #" + invoiceId}</h1>
                        <p className="form-header-subtitle" style={{ margin: 0 }}>View details and payment status of this invoice.</p>
                    </div>
                    <div className="col-4" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <span className={`badge ${data.status === "PUBLISHED" ? "badge-success" : "badge-warning"}`} style={{ fontSize: '14px', padding: '6px 16px' }}>
                            {data.status.charAt(0).toUpperCase() + data.status.substr(1).toLowerCase()}
                        </span>
                    </div>
                </div>
                
                <InvoiceViewHeader
                    data={data}
                />
                <InvoiceViewBody
                    data={data.invoiceItems}
                    invoiceTaxes={invoiceTaxes}
                />
                <InvoiceTotal 
                    data={data.invoiceItems}
                    taxInclusive={data.taxInclusive}
                />
                <InvoiceViewFooter
                    data={data}
                />
                <div className="form-actions no-print">
                    <button className="btn btn-primary" onClick={() => onPrint()}>Print</button>
                    <Link to="/invoices/" className="btn btn-secondary">Return to Invoices</Link>
                </div>
            </div>
        </div>
    );
}

export default InvoicesView;