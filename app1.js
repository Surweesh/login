const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4001; // Changed port for standard usage

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" folder

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Update with your MySQL user
    password: '@Sp@sql123', // Update with your MySQL password
    database: 'Stock' // Update with your MySQL database name
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.post('/signin', (req, res) => {
    const { username, password } = req.body; // Changed email to username
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.log('Error querying the database:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
