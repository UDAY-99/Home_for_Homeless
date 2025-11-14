const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();


// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'sriram',
  database:'fir'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL: ', err);
      return;
    }
    console.log('Connected to MySQL!');
  });
  
  // Add error event listener
  connection.on('error', (err) => {
    console.error('MySQL connection error:', err);
  });

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Route for handling form submissions
app.post('/', (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;

  // Insert the form data into MySQL database
  const sql = 'INSERT INTO users (email, pass) VALUES (?, ?)';
  connection.query(sql, [email, pass], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL: ', err);
      res.send('Error occurred while processing your request.');
      return;
    }
    console.log('Data inserted into MySQL successfully!');
    res.send('Data inserted into MySQL successfully!');
  });
});

// Start the server
app.listen(5762);
