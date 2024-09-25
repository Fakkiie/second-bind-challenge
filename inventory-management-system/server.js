// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');  // Import the SQLite database connection

const app = express();
const PORT = 5001;

// Middlewares
app.use(cors());  // Enables Cross-Origin Resource Sharing (CORS)
app.use(express.json());  // Parses incoming requests with JSON payloads

// Add New Book
app.post('/books', (req, res) => {
  const { title, author, genre, publicationDate, isbn } = req.body;

  // Validate input data to ensure no fields are empty
  if (!title || !author || !genre || !publicationDate || !isbn) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // SQL query to insert the book data into the database
  const query = `
    INSERT INTO Inventory (title, author, genre, publicationDate, isbn)
    VALUES (?, ?, ?, ?, ?)
  `;

  // Execute the query and handle possible errors
  db.run(query, [title, author, genre, publicationDate, isbn], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to add book' });
    }
    // Return success message and the new book ID
    res.status(201).json({ message: 'Book added successfully', id: this.lastID });
  });
});

// Get All Books with Filtering
app.get('/books', (req, res) => {
  let query = 'SELECT * FROM Inventory';  // Base query to fetch all books
  const conditions = [];
  const params = [];

  // Apply filters if provided in the query parameters
  if (req.query.title) {
    conditions.push('title LIKE ?');
    params.push(`%${req.query.title}%`);
  }
  if (req.query.author) {
    conditions.push('author LIKE ?');
    params.push(`%${req.query.author}%`);
  }
  if (req.query.genre) {
    conditions.push('genre LIKE ?');
    params.push(`%${req.query.genre}%`);
  }
  if (req.query.publicationDate) {
    conditions.push('publicationDate = ?');
    params.push(req.query.publicationDate);
  }

  // If any filters were added, append them to the query
  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Execute the query with the conditions and send the result
  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve books' });
    }
    res.json(rows);  // Send the fetched book data as JSON
  });
});

// Delete a Book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;  // Get the book ID from the request parameters

  const query = 'DELETE FROM Inventory WHERE id = ?';  // SQL query to delete the book

  // Execute the delete query and handle the result
  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});

// Export Data in CSV or JSON format
app.get('/books/export', (req, res) => {
  const format = req.query.format || 'json';  // Get the format (CSV or JSON) from the query

  const query = 'SELECT * FROM Inventory';  // SQL query to select all books

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve books for export' });
    }

    // Handle CSV export
    if (format === 'csv') {
      const csv = [
        ['id', 'title', 'author', 'genre', 'publicationDate', 'isbn'],  // Header row
        ...rows.map(row => [
          row.id,
          row.title,
          row.author,
          row.genre,
          row.publicationDate,
          row.isbn
        ])
      ]
        .map(e => e.join(','))  // Join each row with commas
        .join('\n');  // Join rows with newlines

      res.header('Content-Type', 'text/csv');  // Set response header for CSV
      res.attachment('books.csv');  // Set the file name for the download
      return res.send(csv);  // Send the CSV data
    } else if (format === 'json') {
      res.header('Content-Type', 'application/json');  // Set response header for JSON
      res.attachment('books.json');  // Set the file name for the download
      return res.send(JSON.stringify(rows, null, 2));  // Send the JSON data
    } else {
      res.status(400).json({ error: 'Invalid format specified' });  // Error for invalid format
    }
  });
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
