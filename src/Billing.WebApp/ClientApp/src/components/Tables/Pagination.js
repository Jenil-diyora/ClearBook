import React from 'react';

const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount <= 1) return null;

    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return (
        <div className="pagination">
            <span
                className="page-link"
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
            >
                ‹
            </span>

            {pages.map(page => (
                <span
                    key={page}
                    className={`page-link${page === currentPage ? ' active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </span>
            ))}

            <span
                className="page-link"
                onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
                style={{ opacity: currentPage === pageCount ? 0.4 : 1, cursor: currentPage === pageCount ? 'default' : 'pointer' }}
            >
                ›
            </span>
        </div>
    );
};

export default Pagination;