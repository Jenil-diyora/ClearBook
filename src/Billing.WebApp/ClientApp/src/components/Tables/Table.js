import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ data, columns, sortColumn, onSort }) => {
    return (
        <div className="table-container" style={{ borderRadius: 0, border: 'none' }}>
            <table className="data-table">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody data={data} columns={columns} />
            </table>
        </div>
    );
};

export default Table;