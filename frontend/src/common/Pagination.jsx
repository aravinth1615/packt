import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const renderPageNumbers = () => {
    const pageRange = 2;
    const totalPagesArray = range(1, totalPages);
    let pagesToShow = [];

    if (totalPages <= 5) {
      pagesToShow = totalPagesArray;
    } else {
      if (currentPage <= pageRange + 1) {
        pagesToShow = [...range(1, pageRange * 2 + 1), '...', totalPages];
      } else if (currentPage >= totalPages - pageRange) {
        pagesToShow = [1, '...', ...range(totalPages - pageRange * 2, totalPages)];
      } else {
        pagesToShow = [1, '...', ...range(currentPage - pageRange, currentPage + pageRange), '...', totalPages];
      }
    }

    return pagesToShow.map((page, index) => (
      <span
        key={index}
        className={` px-3 py-1 rounded 
          ${currentPage === page ? 'bg-primary text-white rounded-full pe-auto' : ''}
          ${page === '...' ? 'text-muted cursor-not-allowed' : ''}
          hover-bg-light rounded-full hover-text-primary
          ${currentPage === page ? 'pointer-events-none' : ''}
        `}
        onClick={page !== '...' ? () => onPageChange(page) : null}
      >
        {page}
      </span>
    ));
  };

  return (

    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item px-1 pe-auto ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {renderPageNumbers()}
        <li className={`page-item px-1 pe-auto ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
