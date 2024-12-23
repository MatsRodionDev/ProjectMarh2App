import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalUsers, pageSize, setCurrentPage }) => {
    const totalPages = Math.ceil(totalUsers / pageSize);

    return (
        <Pagination className="justify-content-center">
            <Pagination.First onClick={() => setCurrentPage(0)} disabled={currentPage === 0} />
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))} disabled={currentPage === 0} />
            {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item key={index} active={index === currentPage} onClick={() => setCurrentPage(index)}>
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={currentPage === totalPages - 1} />
            <Pagination.Last onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage === totalPages - 1} />
        </Pagination>
    );
};

export default PaginationComponent;
