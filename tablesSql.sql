-- Users table
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  passwordhash TEXT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  datecreated TIMESTAMP NOT NULL,
  lastlogin TIMESTAMP
);

-- Demographics table
CREATE TABLE demographics (
  demographicsid SERIAL PRIMARY KEY,
  userid INT NOT NULL REFERENCES users(userid),
  age INT,
  gender VARCHAR(50),
  location VARCHAR(255),
  educationlevel VARCHAR(255),
  employmentstatus VARCHAR(255)
);

-- Mood questionnaire table
CREATE TABLE moodquestionnaire (
  questionnaireid SERIAL PRIMARY KEY,
  userid INT NOT NULL REFERENCES users(userid),
  datetimefilled TIMESTAMP NOT NULL,
  moodscore INT,
  stresslevel INT,
  sleepquality INT,
  question1 INT CHECK (question1 >= 1 AND question1 <= 5),
  question2 INT CHECK (question2 >= 1 AND question2 <= 5),
  question3 INT CHECK (question3 >= 1 AND question3 <= 5),
  question4 INT CHECK (question4 >= 1 AND question4 <= 5),
  question5 INT CHECK (question5 >= 1 AND question5 <= 5)
);

-- Media content table
CREATE TABLE mediacontent (
  mediaid SERIAL PRIMARY KEY,
  mediatype VARCHAR(255),
  mediaurl TEXT,
  description TEXT,
  uploaddatetime TIMESTAMP
);

-- User interaction feedback table
CREATE TABLE userinteractionfeedback (
  interactionid SERIAL PRIMARY KEY,
  userid INT NOT NULL REFERENCES users(userid),
  mediaid INT NOT NULL REFERENCES mediacontent(mediaid),
  reaction VARCHAR(255),
  reactiondatetime TIMESTAMP
);

-- Media recommendation table
CREATE TABLE mediarecommendation (
  recommendationid SERIAL PRIMARY KEY,
  userid INT NOT NULL REFERENCES users(userid),
  mediaid INT NOT NULL REFERENCES mediacontent(mediaid),
  recommendeddatetime TIMESTAMP,
  viewed BOOLEAN
);