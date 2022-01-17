# Taxi Booking System

Greetings! This solution offers a containerized backend, ready for deployment!

## Starting the service

`docker-compose up`: Running this command on your CLI will immediately build and start your service.

## Environment Variables

- PORT, default:`8080`, The port your service will listen on.

## Teardown

You can kill the service with `CTRL+C` on Windows and Linux or `CMD+C` on Mac.

## API Docs

Once your service is running, you can find the API documentation at http://localhost:8080/docs

## Local Development and Testing

For local development, you will require NodeJS v17.3.1 installed on your local machine.

```shell
# Make sure you've installed all of the production and development dependencies
npm install
# The following will run the jest test suite.
npm test
# If you want the coverage report, run the following command:
npm test -- --coverage
# To start the service on your machine
npm start
# To start the service with automatic restarting
npm run dev
```
