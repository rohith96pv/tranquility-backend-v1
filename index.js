const express = require('express');
const app = express();
const { Pool } = require('pg');

// Middleware to parse JSON bodies
app.use(express.json());

console.log("inside index.js");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tranquilityDatabase',
  password: 'rohith',
  port: 5433,
});


//GET all users
app.get('/users', async (req, res) => {
  try {
    console.log("inside /users");
    const client = await pool.connect();
    // Query to select all users from the database
    const response = await client.query('SELECT * FROM users');
    console.log("users response =", response.rows);
    // Respond with the list of users
    res.json(response.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


//Create user
app.post('/users', async (req, res) => {
  try {
    console.log("inside POST /users");

    // Extract user details from request body
    const { username, passwordhash, email } = req.body;
    const datecreated = new Date(); // Assuming the date created is the current date

    const client = await pool.connect();

    // SQL query to insert user into the database
    const queryText = 'INSERT INTO users (username, passwordhash, email, datecreated) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, passwordhash, email, datecreated];

    // Execute the query
    const response = await client.query(queryText, values);

    console.log("New user created:", response.rows[0]);
    
    // Respond with the newly created user data
    res.json(response.rows[0]);

    // Release the client back to the pool
    client.release();
  } catch (err) {
    console.error(err.message);
    client && client.release();
    res.status(500).send('Server Error');
  }
});







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// // GET route to fetch all users
// app.get('/users', async (req, res) => {
//   try {
//     console.log("inside /users");
//     // Query to select all users from the database
//     const users = await pool.query('SELECT * FROM users');
//     console.log("users response =", users);
//     // Respond with the list of users
//     res.json(users.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// // GET route to fetch a user by ID
// app.get('/users/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Query to select the user from the database
//     const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

//     // Check if user was found
//     if (user.rows.length === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Respond with the user data
//     res.json(user.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });



// // POST route to add a new user
// app.post('/users', async (req, res) => {
//   try {
//     // Extract user details from request body
//     const { name, email, age } = req.body;

//     // Insert user into the database
//     const newUser = await pool.query(
//       'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
//       [name, email, age]
//     );

//     // Respond with the newly created user
//     res.json(newUser.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// const express = require('express');
// const app = express();
// const pool = require('./db');
// const { Pool } = require('pg');

// console.log("inside index.js");//

// const pool = new Pool({
//   user: 'rohith_pv',
//   host: 'localhost',
//   database: 'tranquilityD',
//   // password: 'your_password',
//   port: 5432,  // PostgreSQL server port
// });

// pool.connect((err, client, done) => {
//   if (err) throw err;
//   console.log('Connected to PostgreSQL');
//   // You can now use the client to execute queries, etc.
//   // ...
  
//   // Make sure to release the client back to the pool when done
//   done();
// });

// ///////
// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });

// // get all data
// app.get('/data', async (req, res) => {
//     try {
//       const { rows } = await pool.query('SELECT * FROM your_table');
//       res.json(rows);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


// // Get all users
// app.get('/users', async (req, res) => {
//     try {
//       console.log("entered users");
//       const users = await pool.query('SELECT * FROM users');
//       res.json(users.rows);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });
  
  
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
