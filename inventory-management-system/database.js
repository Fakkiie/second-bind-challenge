// database.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./inventory.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS Inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT NOT NULL,
      publicationDate TEXT NOT NULL,
      isbn TEXT NOT NULL
    )
  `);
});

module.exports = db;
