// src/App.js
import React, { useState, useEffect } from 'react';
import AddBookForm from './components/AddBookForm';
import FilterForm from './components/FilterForm';
import BookList from './components/BookList';
import ExportButtons from './components/ExportButtons';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await fetch(`/books?${params}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleBookAdded = () => {
    fetchBooks();
  };

  const handleFilter = (filterCriteria) => {
    fetchBooks(filterCriteria);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/books/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBooks(books.filter(book => book.id !== id));
      } else {
        alert('Failed to delete book.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Inventory Management System</h1>
      <AddBookForm onBookAdded={handleBookAdded} />
      <FilterForm onFilter={handleFilter} />
      <BookList books={books} onDelete={handleDelete} />
      <ExportButtons />
    </div>
  );
}

export default App;
