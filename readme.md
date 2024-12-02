## Create a repository

## Initialize the repository

## node_modules, package.json, package-lock.json

## Install express

## Create a server

## Listen to port 7777

## Write request handlers for /test , /hello

## Install nodemon and update scripts inside package.json

## What are dependencies
- dependencies refer to the external libraries or modules that your project relies on to work correctly. These dependencies are usually specified in your project’s package.json file, which is the central configuration file for Node.js projects.

## What is the use of "-g" while npm install
 - This Means installing at the global level

## Difference between caret and tilde ( ^ vs ~ )
- ~1.2.3 → Allows updates to 1.2.x, but not 1.3.0 or higher.
- ~0.2.3 → Allows updates to 0.2.x, but not 0.3.0.
- To update to 2 you need to update manually

## initialize git


## Play with routes and route extensions ex. /hello, / , hello/2, /xyz

## Order of the routes matter a lot

## Install Postman app and make a workspace/collectio > test API call

## Write logic to handle GET, POST, PATCH, DELETE API Calls and test them on Postman

## Explore routing and use of ?, + , (), * in the routes

## Use of regex in routes /a/ , /.*fly$/

## Reading the query params in the routes

## Reading the dynamic routes

## Multiple Route Handlers - Play with the code

## next()

## next function and errors along with res.send()

## app.use("/route", rH, [rH2, rH3], rH4, rh5);

## What is a Middleware? Why do we need it?
- #### Middleware in web development acts as a pipeline through which HTTP requests pass before reaching the final route handler or after the response has been sent. It allows developers to:

#### Modularize and centralize logic like logging, authentication, and error handling.
- Control the flow of the request-response cycle.
- Perform tasks like validation, caching, and transformation in a reusable manner.
- Middleware is crucial for organizing complex logic, improving maintainability, and ensuring that applications - are secure, performant, and scalable.

## How express JS basically handles requests behind the scenes

## Difference app.use and app.all
- app.use() is primarily for middleware that handles requests globally (for all routes) or for specific paths,and it does not depend on HTTP methods.
- app.all() is a route handler that responds to all HTTP methods for a given route.

## Write a dummy auth middleware for admin

## Write a dummy auth middleware for all user routes, except /user/login

#  Error Handling using app.use("/", (err, req, res, next) = {});

## Create a free cluster on MongoDB official website (Mongo Atlas)

## Install mongoose library

## Connect your application to the Database "Connection-url"/devTinder

## Call the connectDB function and connect to database before starting application on 7777

## Create a userSchema & user Model

##Create POST /sigup API to add data to database