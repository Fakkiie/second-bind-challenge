// server.js
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes

// Add New Book
app.post('/books', (req, res) => {
  const { title, author, genre, publicationDate, isbn } = req.body;

  // Validate input data
  if (!title || !author || !genre || !publicationDate || !isbn) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO Inventory (title, author, genre, publicationDate, isbn)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [title, author, genre, publicationDate, isbn], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to add book' });
    }
    res.status(201).json({ message: 'Book added successfully', id: this.lastID });
  });
});

// Get All Books with Filtering
app.get('/books', (req, res) => {
  let query = 'SELECT * FROM Inventory';
  const conditions = [];
  const params = [];

  // Filtering based on query parameters
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

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve books' });
    }
    res.json(rows);
  });
});

// Delete a Book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Inventory WHERE id = ?';

  db.run(query, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.json({ message: 'Book deleted successfully' });
  });
});

// Export Data
app.get('/books/export', (req, res) => {
  const format = req.query.format || 'json';

  const query = 'SELECT * FROM Inventory';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve books for export' });
    }

    if (format === 'csv') {
      const csv = [
        ['id', 'title', 'author', 'genre', 'publicationDate', 'isbn'],
        ...rows.map(row => [
          row.id,
          row.title,
          row.author,
          row.genre,
          row.publicationDate,
          row.isbn
        ])
      ]
        .map(e => e.join(','))
        .join('\n');

      res.header('Content-Type', 'text/csv');
      res.attachment('books.csv');
      return res.send(csv);
    } else if (format === 'json') {
      res.header('Content-Type', 'application/json');
      res.attachment('books.json');
      return res.send(JSON.stringify(rows, null, 2));
    } else {
      res.status(400).json({ error: 'Invalid format specified' });
    }
  });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
