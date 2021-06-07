# password_pusher_node
 pglombardo/PasswordPusher but in node and APIs  
 This project is pretty much this project but in Node and APIs https://github.com/pglombardo/PasswordPusher

##### How things fit together
* Everything is written in JS and uses Sequelize as the ORM and MySQL as the backend and jsonvalidator to validate JSON  
* app.js calls apiRoutes.js which calls passwordController.js This is pretty much the main flow. The project is small and simple

##### Docker
You can build the image with the included Dockerfile, or get it from here: https://hub.docker.com/repository/docker/necrolingus/password_pusher_node  
The best way to run this is in docker compose, with a mysql container.  

##### Want to use a different DBMS?
* Install the appropriate driver: https://sequelize.org/master/manual/getting-started.html  
* In dbConfig.js change your dialect  
* In createDb.js add the relevant code to create the DB in your chosen DMBS. This is done so I did not have to bootstrap stuff outside of this project. This way everything is contained in one project  

##### The main takeaways:
* dbConfig.js is the main place for all configs  
* There is a POST to create a password. A GET to GET a password. A DELETE to delete a password (the DELETE will probably never be used)  
* Passwords are stored encrypted in the DB. Check out cipherHandler.js  
* Old records are deleted automatically by vacuumDb.js which runs as a setInterval

##### What environment variables do I need to pass
There is a .env.sample file in the api folder. For docker, you of course have to pass these variables.  
ENCRYPTIONKEY  
DBHOST  
DBPORT  
DBUSER  
DBPASSWORD  
DATABASE  

#### A quick rundown
##### POST:  
<your_url>:8080/api/password  
**Request:** {"password":"i am a super strong password!","hoursToLive":2,"viewsToLive":3}  
**Response:** {"status": "good","outcome": "db9d3915-2ecb-4671-b8d5-3519df48f0a1"}  
This UUID is what you share with the peson so they can get the password  
hoursToLive is how long this password should be in the DB before it gets deleted  
viewToLive is how many times it can be viewed before it gets deleted  

##### GET:
<your_url>:8080/api/db9d3915-2ecb-4671-b8d5-3519df48f0a1  
**Response:**  
{  
    "status": "good",  
    "outcome": {  
        "uniqueId": "c53d5b02-2361-4228-a283-5e53bee683a7",  
        "password": "i am a super strong password!",  
        "hoursToLive": "2021-06-07T19:14:29.531Z",  
        "viewsToLive": 3,  
        "createdAt": "2021-06-07T15:14:29.000Z",  
        "updatedAt": "2021-06-07T15:14:29.000Z"  
    }  
}  
After every view viewsToLive will get decremented

##### DELETE:
<your_url>:8080/api/c53d5b02-2361-4228-a283-5e53bee683a7  
**Response:** {"status": "good", "outcome": 1}    
Outcome contains the number of records deleted (will always be 1 or 0)  
I dont think anyone will ever use DELETE, but there will for sure be a use case for it somewhere  


#### Will I create a gui for it?
* Probably at some point
