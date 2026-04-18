const express = require('express');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// 1. CREATE a new user
app.post('/users', (req, res) => {
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }

    const sql = `INSERT INTO users (name, email, age) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, age], function(err) {
        if (err) {
            // Handle error (e.g., duplicate email)
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({
            message: 'User created successfully',
            user: { id: this.lastID, name, email, age }
        });
    });
});

// 2. READ all users
app.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// 3. READ a single user by id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users WHERE id = ?`;
    
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(row);
    });
});

// 4. UPDATE a user by id
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    
    if (!name || !email || !age) {
        return res.status(400).json({ error: 'Name, email, and age are required' });
    }

    const sql = `UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?`;
    
    db.run(sql, [name, email, age, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            message: 'User updated successfully',
            user: { id: parseInt(id), name, email, age }
        });
    });
});

// 5. DELETE a user by id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ?`;
    
    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
