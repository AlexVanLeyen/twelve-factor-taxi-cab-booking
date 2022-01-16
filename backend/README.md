# Taxi Booking System

Greetings! This solution offers a containerized backend, ready for deployment!

## Starting the service

`docker-compose up`: Running this command on your CLI will immediately build and start your service.

## Environment Variables

- PORT, default:`8080`, The port your service will listen on.

## Teardown

You can kill the service with `CTRL+C` on Windows and Linux or `CMD+C` on Mac.

## API Endpoints

- POST api/book
- PUT  api/reset
- POST api/tick

### POST api/book

Attempt to book a taxi within the booking system.

Input: Requires the following JSON object to be present in the body:
```JSON
{
    "source": {
        "x": 0,
        "y": 0
    },
    "destination": {
        "x": 0,
        "y": 0
    }
}
```

Returns: May return a JSON object (see below) or an empty body if taxis are unavailable.
```JSON
{
    "car_id": 0,
    "total_time": 0
}
```

The server will respond with a `200 OK` HTTP status code on a successful booking. 
The server will respond with `202 Accepted` HTTP status code when taxis are unavailable.


### PUT  api/reset

Will reset the taxi booking system.

### POST api/tick

Will advance the simulated taxis by one tick.
