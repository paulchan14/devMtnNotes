/* 

Express Sessions


Middleware can:

parse text (any words you don't want),
do pretty much anything you want.

In some cases you won't need it, in some you will.

In the lecture example, we're using middleware for authentication on one endpoint instead of using it for everything.



Session:
Based on ID, we can send specific info to different clients.

Sessions - the reason why we don't have to log on EVERYTIME we visit a certain website.

Cookie - a small piece of information a website can store on your browser.

This means you don't have to authenticate over and over again.



Session Store:
This will be created for us with the express sessions package.
It's a part of our server. IDs will be generated by Express Session.

When visiting a website, the server will give the user a cookie with a session ID. When user makes a request, their
session ID will be sent along as well. The session ID will also be stored in the Session Store.

the config object within our session:

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))

By default. No need to resave if nothing has changed.

saveUninitialized: even though they have no info stored on the website, do you want to save their session?

secret: a string of randomized characters. Used for encryption reasons.

There are other properties that can be added to the config object as well.


When a session is created, you can access that information on the req object:
req.session.stuff

Session Store: lots of key/value pairs

With subsequent requests from the client, the session ID will be sent,
and any info associated with the session ID will be sent on the req.session object.


If the user authentication is correct, we want to add it to their session info, so that they don't have to log in again and again.

SESSION_SECRET - for now, just make a randomized hash of characters,

Step 1: Require the package.
Step 2: add it as a top-level middleware.

You could add a property called "authenticate" on the session object(?)

Each ID is unique to the browser.


Look into Express Session docs, Compatible Stores


req.params - required on the url

query ? is optional





When using query, remember that numbers will always be sent across as strings (JSON stuff).
So === will yield false,
and == will yield true.

## Difference between `req.query` and `req.params`

### req.params

- Data comes from the URL.
- Can access data on the `req` object.
- Indicate in the endpoint path that the endpoint requires params by using a colon.
 - An endpoint using params would look like:
 
  ```app.get('/api/user/:id', ctrl.getUser);```
  
 - An HTTP request to this endpoint would look like:
 
  ```axios.get('/api/user/3').then(res => ...)```
  
 - Accessing this data on the `req` object would look like:
 
  ```req.params.id // the value being '3'```
  
- Must include params in the request URL.
- Use case: Looking at the detail view of a single product from a list of products. The id is required, you can't see that page
 without sending a param.

### req.query

- Data comes from the URL.
- Can access data on the `req` object
- The endpoint _does not_ need to indicate that it can accept queries.
 - An endpoint using queries would look like:
 
  ```app.get('/api/user', ctrl.getUserByInfo)```
  
 - An HTTP request to this enpoint would look like:
 
  ```axios.get('/api/user?name=Jenny').then(res => ...)```
  
 - Accessing this data on the `req` object would look like:
 
  ```req.query.name // the value being 'Jenny'```
  
- Including queries in the request URL is optional.
- Use case: Search functionality. A user can search by name, age and/or city. They can choose one or all three. It isn't required,
 it's optional. You must check in your endpoint if it's the query is there and how to use it. How do I know what query will be
  sent? Whatever you send from your frontend will be what you receive. You get to decide. (edited)
*/