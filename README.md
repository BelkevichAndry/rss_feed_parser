> ### Node (Express + MySQL) application containing RSS feed parsing codebase.

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MySQL (https://www.mysql.com/downloads/).
- Create database with feeds name.
- Use dump file(dump.sql) to create suitable tables.
- `nodemon npm start` to start the local server.

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mysql](https://github.com/mysqljs/mysql) - This is a node.js driver for mysql. 
- [async](https://github.com/caolan/async) - Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript
- [feed-read](https://github.com/sentientwaffle/feed-read) - Node.js module for parsing RSS feeds into a common article object.
- [express-basic-auth ](https://github.com/LionC/express-basic-auth) - Simple plug & play HTTP basic auth middleware for Express.


## Application Structure

- `app.js` - The entry point to our application. 
- `routes/` - This folder contains the route definitions for our API and main logic.
- `views/` - This folder contains views pages.

## API
  
- POST /feeds - to add a source of rss feeds example (http://feeds.bbci.co.uk/news/video_and_audio/world/rss.xml) .
- GET /posts - get all current rss feeds from all sources.
- POST /register - an API for use registration. You should include your user information in the body of your request like this:
```json
        {
          "user": {
            "name": "1",
            "password": "1"
          }
        }
```
- All API except /register require to be authenticated.
