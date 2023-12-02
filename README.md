# tranquility-backend-v1

## Technical Pre_requisites for backend:
1. PostgreSQL 16
2. PgAdmin for PostgreSQL GUI
3. Node : v16.20.2
4. npm : 8.19.4

## Database Setup:
1. Assuming that postgreSQL 16 and PgAdmin is installed on you PC, open the pgAdmin GUI
2. In pgAdmin server, create a Database with name: `tranquilityDatabase`
3. Right click on the tranquilityDatabase DB in PgAdmin, and choose queryTool
4. In queryTool paste the SQL query present in file: `tablesMigration.sql` and click on Execute/Refresh option.
5. tranquilityDatabase is now created and setup with the required tables
6. Double check with database properties mentioned below and make necessary changes accordingly in `tranquility-backend-v1/index.js`  
            host: 'localhost',
            database: 'tranquilityDatabase',
            user: 'tranquilityAdmin',
            password: 'tranquilityAdmin',
            port: 5433
7. You are good to start the application now.(Check below steps)
8. Insert/create few user before you proceed with any other tasks. Refer Postman collection `Create User` and create users with different email addresses.


## To Start the app:
   1. Install dependencies : npm i (Skip this step if already installed)
   2. npm start

    Application by default starts on port: 3000

## Routes

- GET  /users
    This route fetches all the existing users

- POST  /users 
    This route used to create a user
    
    Note: field email is UNIQUE and hence duplicates are not allowed. Use different email value for every new request
    
    Refer: Postman Collection's `Create User /users`

- POST  /questionnaire
    This route is used to set the questionnaire for exisiting users

    Refer: Postman Collection's `Questionnaire /questionnaire`

- POST  /userinteractionfeedback
    This route is used to set the user interaction feedback for the media files

    Refer: Postman Collection's `Media Feedback /userinteractionfeedback`
          