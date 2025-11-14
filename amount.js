const express = require('express');
const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sriram',
  database: 'your_database_name'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

// Handle form submission
app.post('/', (req, res) => {
  const { username, email, amount } = req.body;
  const donation = { username, email, amount };

  // Insert donation into MySQL
  db.query('INSERT INTO donations SET ?', donation, (err, result) => {
    if (err) {
      throw err;
    }
    console.log('Donation added');
    res.send('Thank you for your donation!');
  });
});



app.listen(5762);
