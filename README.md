# URL Shortener

Live Demo (Hosted by AWS): http://shorturl.hopto.org/

This is a web application which allows users to easily shorten their URLs similar to https://bitly.com/.

## Tech Stack

1. React
2. Node.js
3. PostgreSQL
4. Docker
5. AWS

## Prerequisites for setting up locally

1. NPM 7
2. Docker
3. Make

## Instructions for setting up locally

1. Either clone the repository or download and extract the zip folder
2. Run `cd url_shortener_app` to enter the root directory
3. Run `make build` in the root directory to build the containers
4. Run `make run` in the root directory to run the containers with docker-compose
5. Once the containers are running successfully, the app will be available at http://localhost:3000/

## Instructions for running tests

1. Make sure that the containers built previously are still up and running
2. Run `cd server` to enter the server directory
3. Run `npm install` in the server directory
4. Run `npm test` to execute the tests
