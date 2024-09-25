// src/components/FilterForm.js
import React, { useState } from 'react';

function FilterForm({ onFilter }) {
  const [filterCriteria, setFilterCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: ''
  });

  const handleChange = (e) => {
    setFilterCriteria({ ...filterCriteria, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterCriteria);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Filter Books</h2>
      <input
        type="text"
        name="title"
        value={filterCriteria.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <br />
      <input
        type="text"
        name="author"
        value={filterCriteria.author}
        onChange={handleChange}
        placeholder="Author"
      />
      <br />
      <input
        type="text"
        name="genre"
        value={filterCriteria.genre}
        onChange={handleChange}
        placeholder="Genre"
      />
      <br />
      <input
        type="date"
        name="publicationDate"
        value={filterCriteria.publicationDate}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterForm;
