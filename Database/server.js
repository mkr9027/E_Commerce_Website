const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // change if different
  password: '12345678',     // your DB password
  database: 'dstore'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('✅ Connected to MySQL');
});

// Route to handle checkout form POST
app.post('/checkout', (req, res) => {
  const { fullname, email, address, cardName, expiry } = req.body;

  const sql = `INSERT INTO orders (fullname, email, address, card_name, expiry) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [fullname, email, address, cardName, expiry], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).send('Error saving order');
    }
    res.send('success');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
