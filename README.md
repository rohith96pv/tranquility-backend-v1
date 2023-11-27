# tranquility-backend-v1

---------------------------- 
Technical Pre_requisites:
----------------------------
1. PostgreSQL 16
2. PgAdmin for PostgreSQL GUI
3. Node : v16.20.2
4. npm : 8.19.4
----------------------------
----------------------------


To Start the app:
   1. Install dependencies : npm i (Skip this step if already installed)
   2. npm start
----------------------------
Application by default starts on port: 3000
----------------------------
----------------------------

ROUTES
---------------
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
