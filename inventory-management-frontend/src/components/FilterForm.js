// src/components/FilterForm.js
import React, { useState } from 'react';

// FilterForm component: provides filtering options for the book list
function FilterForm({ onFilter }) {
  const [filterCriteria, setFilterCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: ''
  });

  // Handles form input changes
  const handleChange = (e) => {
    setFilterCriteria({ ...filterCriteria, [e.target.name]: e.target.value });
  };

  // Handles form submission and passes filter criteria to the parent component
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterCriteria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Filter Books</h2>
      <input type="text" name="title" value={filterCriteria.title} onChange={handleChange} placeholder="Title" />
      <input type="text" name="author" value={filterCriteria.author} onChange={handleChange} placeholder="Author" />
      <input type="text" name="genre" value={filterCriteria.genre} onChange={handleChange} placeholder="Genre" />
      <input type="date" name="publicationDate" value={filterCriteria.publicationDate} onChange={handleChange} />
      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterForm;
