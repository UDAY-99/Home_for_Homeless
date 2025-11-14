// Import required packages
const express = require('express');
const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sriram',
  database: 'your_database_name'
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// Create Express application
const app = express();

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route to handle form submission
app.post('/', (req, res) => {
  const { homeId, address, availableSlots, homeName } = req.body;
  
  // Insert form data into MySQL database
  const sql = 'INSERT INTO homes (homeId, address, availableSlots, homeName) VALUES (?, ?, ?, ?)';
  db.query(sql, [homeId, address, availableSlots, homeName], (err, result) => {
    if (err) {
      res.status(500).send('Error inserting data into database');
      throw err;
    }
    console.log('Data inserted into database');
    res.status(200).send('Form submitted successfully');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(5762);
