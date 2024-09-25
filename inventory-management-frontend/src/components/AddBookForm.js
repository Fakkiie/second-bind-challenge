// src/components/AddBookForm.js
import React, { useState } from 'react';

// AddBookForm component: a form for adding new books
function AddBookForm({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    isbn: ''
  });

  // Handles form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, author, genre, publicationDate, isbn } = formData;

    // Validate input data
    if (!title || !author || !genre || !publicationDate || !isbn) {
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newBook = await response.json();
        onBookAdded(newBook);  // Calls the parent component function to update the list
        setFormData({
          title: '',
          author: '',
          genre: '',
          publicationDate: '',
          isbn: ''
        });
      } else {
        alert('Failed to add book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Error adding book.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
      <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
      <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} required />
      <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="ISBN" required />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
