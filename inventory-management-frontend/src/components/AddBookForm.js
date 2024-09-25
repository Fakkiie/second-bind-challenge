// src/components/AddBookForm.js
import React, { useState } from 'react';

function AddBookForm({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    isbn: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input data
    const { title, author, genre, publicationDate, isbn } = formData;
    if (!title || !author || !genre || !publicationDate || !isbn) {
      alert('All fields are required.');
      return;
    }

    // Optionally, add more validation here (e.g., ISBN format)

    try {
      const response = await fetch('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newBook = await response.json();
        onBookAdded(newBook);
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
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <br />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        required
      />
      <br />
      <input
        type="text"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
        placeholder="Genre"
        required
      />
      <br />
      <input
        type="date"
        name="publicationDate"
        value={formData.publicationDate}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="isbn"
        value={formData.isbn}
        onChange={handleChange}
        placeholder="ISBN"
        required
      />
      <br />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddBookForm;
