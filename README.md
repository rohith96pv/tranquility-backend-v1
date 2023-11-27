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
Note: email is UNIQUE and hence duplicates are not allowed. Use different email value for every new request.
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
---------------
