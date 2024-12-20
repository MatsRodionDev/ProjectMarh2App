import React from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 search-bar"
        />
    );
};

export default SearchBar;
