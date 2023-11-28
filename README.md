# tranquility-backend-v1

---------------------------- 
Technical Pre_requisites:
----------------------------
1. PostgreSQL 16
2. PgAdmin for PostgreSQL GUI
3. Node : v16.20.2
4. npm : 8.19.4



----------------------------
Database Setup:
----------------------------
1. Assuming that postgreSQL 16 and PgAdmin is installed on you PC, open the pgAdmin GUI
2. In pgAdmin server, create a Database with name: tranquilityDatabase
3. Right click on the tranquilityDatabase DB in PgAdmin, and choose queryTool
4. In queryTool paste the SQL query present in file: tablesMigration.sql and click on Execute/Refresh option.
5. tranquilityDatabase is now setup with the required tables
6. Double check with database properties mentioned below and make necessary changes accordingly:  
            user: 'postgres',
            host: 'localhost',
            database: 'tranquilityDatabase',
            password: 'rohith',
            port: 5433
7. You are good to start the application now.(Check below steps)




----------------------------
To Start the app:
----------------------------
   1. Install dependencies : npm i (Skip this step if already installed)
   2. npm start

Application by default starts on port: 3000



----------------------------
ROUTES
----------------------------
GET || /users:
This route fetches all the existing users
---------------
POST || /users:
This route used to create a user
Note: email is UNIQUE and hence duplicates are not allowed. Use different email value for every new request
    --------------------
    sample curl request:
    ---------------------
    curl --location 'http://localhost:3000/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "username": "haarish",
    "passwordhash": "sdasdasca",
    "email": "user7@example.com"
    }
    '
-------------
POST || /questionnaire
This route is used to set the questionnaire for exisiting users
    ------------------
    Sample CURL request:
    ------------------
                curl --location 'http://localhost:3000/questionnaire' \
            --header 'Content-Type: application/json' \
            --data '{
            "userid": 2,
            "moodscore": 5,
            "stresslevel": 3,
            "sleepquality": 4,
            "question1": 2,
            "question2": 3,
            "question3": 4,
            "question4": 5,
            "question5": 1
            }
'
---------------
POST || /userinteractionfeedback
This route is used to set the user interaction feedback for the media files
    ------------------
    Sample CURL request:
    ------------------
          curl --location 'http://localhost:3000/userinteractionfeedback' \
        --header 'Content-Type: application/json' \
        --data '{
                    "userid": 2,
                    "mediaid":1,
                    "reaction": "uncertain"
                }
            '     
---------------            