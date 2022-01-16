# Solution Checker

## Setup

You will need Python 3 and the python library `requests` installed before you can run the
basic_solution_checker.py script.

1. [How to install Python](https://chocolatey.org/install)
2. `pip install requests`

## Running the script

First, make sure the backend service is running. If you are using docker to host the backend,
run the following on your command-line interface (CLI):
```shell
cd path/to/project

docker-compose up -d

python solutionChecker/basic_solution_checker.py
```

The -d flag on docker-compose will detach the backend container from the command line, allowing you to move on to the next step.

## Tearing Down

Assuming you are using the docker backend, you can tear down your backend container by running
`docker-compose down`.

