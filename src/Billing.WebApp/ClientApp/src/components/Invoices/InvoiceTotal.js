import React from 'react';

const InvoiceTotal = ({ data, taxInclusive }) => {

    const calculateSubTotal = () => {
        let total = 0;

        data.forEach(d => {
            if (d.price > 0 && d.quantity > 0) { 
                const taxAmount = (parseInt(d.quantity) * parseFloat(d.price)) * parseInt(d.taxAmount) / 100;
                taxInclusive
                    ? total = total + (parseInt(d.quantity) * parseFloat(d.price)) - taxAmount
                    : total = total + (parseInt(d.quantity) * parseFloat(d.price));
            } else {
                total = total + 0;
            }
        });

        return total;
    }

    const calculateTaxTotal = () => {
        let total = 0;

        data.forEach(d => {
            const taxPercent = parseInt(d.taxAmount) / 100;
            if (taxPercent !== 0) total = total + ((parseInt(d.quantity) * (parseFloat(d.price)) * taxPercent));
        });

        return total;
    }

    const calculateTotal = () => {
        return calculateSubTotal() + calculateTaxTotal(); 
    }

    const subTotal = parseFloat(calculateSubTotal()).toFixed(2);
    const taxTotal = parseFloat(calculateTaxTotal()).toFixed(2);
    const finalTotal = parseFloat(calculateTotal()).toFixed(2);

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', marginBottom: '24px' }}>
            <div style={{
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 28px',
                minWidth: '320px',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--color-text-dim)', fontSize: '14px' }}>Subtotal:</span>
                    <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>${isNaN(subTotal) ? parseFloat(0).toFixed(2) : subTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                    <span style={{ color: 'var(--color-text-dim)', fontSize: '14px' }}>Tax:</span>
                    <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>${isNaN(taxTotal) ? parseFloat(0).toFixed(2) : taxTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--color-text)', fontWeight: 700, fontSize: '16px' }}>Total:</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 800, fontSize: '22px' }}>${isNaN(finalTotal) ? parseFloat(0).toFixed(2) : finalTotal}</span>
                </div>
            </div>
        </div>
    );
}

export default InvoiceTotal;