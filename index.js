const express = require('express');
const app = express();
const { Pool } = require('pg');

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tranquilityDatabase',
  password: 'rohith',
  port: 5433,
});

/////////////
//Routes
////////////
//GET all users
app.get('/users', async (req, res) => {
  try {
    console.log("inside /users");
    const client = await pool.connect();
    const response = await client.query('SELECT * FROM users');
    console.log("users response =", response.rows);
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Could not fetch users');
  }
});


//Create new user
app.post('/users', async (req, res) => {
  try {
    console.log("inside POST /users");
    const { username, passwordhash, email } = req.body;
    const datecreated = new Date(); // Assuming the date created is the current date
    const client = await pool.connect();
    const queryText = 'INSERT INTO users (username, passwordhash, email, datecreated) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, passwordhash, email, datecreated];

    const response = await client.query(queryText, values);
    console.log("New user created:", response.rows[0]);

    res.json(response.rows[0]);
    client.release();
  } catch (err) {
    console.error(err.message);
    client && client.release();
    res.status(500).send('Could not create User');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
