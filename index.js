const express = require('express');
const cors = require('cors');
const app = express();
const { Pool } = require('pg');

app.use(cors());
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
  const client = await pool.connect();
  try {
    console.log("inside /users");
    // const client = await pool.connect();
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
  const client = await pool.connect();
  try {
    console.log("inside POST /users");
    const { username, passwordhash, email } = req.body;
    const datecreated = new Date(); // Assuming the date created is the current date
    // const client = await pool.connect();
    const queryText = 'INSERT INTO users (username, passwordhash, email, datecreated) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, passwordhash, email, datecreated];
    const response = await client.query(queryText, values);
    console.log("Response :", response);
    console.log("New user created:", response.rows[0]);
    res.json(response.rows[0]);
    // client.release();
  } catch (err) {
    console.log("inside catch block");
    console.error(err.message);
    var errorMessage = err.message;
    //if the error message includes duplicate word it responds with error
    if(errorMessage.includes("duplicate")){
      return res.status(400).send('Cannot create user with duplicate email');
    }
    return res.status(500).send('Failed to create User');
  }
  finally {
    if (client) {
      client.release();
    }
  }
});

//route to insert questionnaire details into db
app.post('/questionnaire', async (req, res) => {
  const client = await pool.connect();

  try {
    console.log("inside POST /moodquestionnaire");
    const { userid, moodscore, stresslevel, sleepquality, question1, question2, question3, question4, question5 } = req.body;
    const datetimefilled = new Date(); // Assuming the date filled is the current date

    const queryText = 'INSERT INTO moodquestionnaire (userid, datetimefilled, moodscore, stresslevel, sleepquality, question1, question2, question3, question4, question5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const values = [userid, datetimefilled, moodscore, stresslevel, sleepquality, question1, question2, question3, question4, question5];

    const response = await client.query(queryText, values);
    console.log("Response: ", response);
    console.log("New mood questionnaire entry created: ", response.rows[0]);
    res.json(response.rows[0]);
  } catch (err) {
    console.log("inside catch block");
    console.error(err.message);
    // Handle specific errors as needed, for example, missing fields, foreign key violations, etc.
    return res.status(500).send('Failed to create Mood Questionnaire entry');
  } finally {
    if (client) {
      client.release();
    }
  }
});

//Route to insert userInteractionFeedback 
app.post('/userinteractionfeedback', async (req, res) => {
  const client = await pool.connect();

  try {
    console.log("inside POST /userinteractionfeedback");
    //reaction will either be liked, disliked, uncertain
    const { userid, mediaid, reaction } = req.body;
    const reactiondatetime = new Date(); // Assuming the date of the reaction is the current date

    const queryText = 'INSERT INTO userinteractionfeedback (userid, mediaid, reaction, reactiondatetime) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [userid, mediaid, reaction, reactiondatetime];

    const response = await client.query(queryText, values);
    console.log("Response: ", response);
    console.log("New user interaction feedback entry created: ", response.rows[0]);
    res.json(response.rows[0]);
  } catch (err) {
    console.log("inside catch block");
    console.error(err.message);
    // Handle specific errors as needed, for example, missing fields, foreign key violations, etc.
    return res.status(500).send('Failed to create User Interaction Feedback entry');
  } finally {
    if (client) {
      client.release();
    }
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
