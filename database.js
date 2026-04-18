const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the SQLite database (this creates a 'app.db' file in the directory if it doesn't exist)
const dbPath = path.resolve(__dirname, 'app.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create the 'users' table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                age INTEGER NOT NULL
            )
        `, (err) => {
            if (err) {
                console.error('Error creating table', err.message);
            } else {
                console.log('Users table initialized.');
            }
        });
    }
});

module.exports = db;
