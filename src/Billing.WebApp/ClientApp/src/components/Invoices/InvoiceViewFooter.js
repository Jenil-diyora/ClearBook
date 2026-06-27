import React from 'react';

const InvoiceViewFooter = ({ data }) => {

    return (
        <div className="row invoice-form-footer" style={{ marginTop: '24px' }}>
            <div className="col mb-3">
                { data.notes ?
                <div style={{
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px 20px',
                    marginBottom: '16px'
                }}>
                    <strong style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Notes:</strong>
                    <div style={{ color: 'var(--color-text)', fontSize: '14px', whiteSpace: 'pre-wrap' }}>{data.notes}</div>
                </div>
                : null}
                { data.paid ?
                    <div className="alert" style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid var(--color-success)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 20px',
                        color: 'var(--color-success)',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>✓ Paid on:</span>
                        <span>{new Date(data.paid).toLocaleDateString("en-GB")}</span>
                    </div>
                : null}
            </div>
        </div>
    );
}

export default InvoiceViewFooter;