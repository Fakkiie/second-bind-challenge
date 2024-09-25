// src/components/BookList.js
import React from 'react';

// BookList component: displays the list of books and a delete button for each book
function BookList({ books, onDelete }) {
  return (
    <div>
      <h2>Books List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication Date</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publicationDate}</td>
                <td>{book.isbn}</td>
                <td>
                  <button onClick={() => onDelete(book.id)}>Delete</button>  {/* Delete button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookList;
