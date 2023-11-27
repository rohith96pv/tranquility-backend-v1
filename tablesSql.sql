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
  sleepquality INT
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