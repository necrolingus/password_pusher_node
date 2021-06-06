# password_pusher_node
 pglombardo/PasswordPusher but in node and APIs  
 This project is pretty much this project but in Node and APIs https://github.com/pglombardo/PasswordPusher

##### How things fit together
* Everything is written in JS and uses Sequelize as the ORM and MySQL as the backend and jsonvalidator to validate JSON  
* app.js calls apiRoutes.js which calls passwordController.js This is pretty much the main flow. The project is small and simple

##### Want to use a different DBMS?
* Install the appropriate driver: https://sequelize.org/master/manual/getting-started.html  
* In dbConfig.js change your dialect  
* In createDb.js add the relevant code to create the DB in your chosen DMBS. This is done so I did not have to bootstrap stuff outside of this project. This way everything is contained in one project  

##### The main takeaways:
* dbConfig.js is the main place for all configs  
* There is a POST to create a password. A GET to GET a password. A DELETE to delete a password (the DELETE will probably never be used)  
* Passwords are stored encrypted in the DB. Check out cipherHandler.js  
* Old records are deleted automatically by vacuumDb.js which runs as a setInterval


#### What is left to do?
* Some minor cleanups


#### Will I create a gui for it?
* Probably at some point
