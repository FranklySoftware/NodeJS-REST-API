# Example NodeJS API APP

### Here are some steps to get up and running:

1. To run the skeleton app:

    `docker-compose up` or `docker-compose up -d`

2. To run the automated tests within the container, use the following command. Note that the port is overridden to prevent a collision with the process that is already running in the container.

    `docker exec -e PORT=3000 <container-id> npm run test`

3. If you install a new dependency, you will need to rebuild the container.

> ### Node application to store and query location points. 
>The app functions:
> - Post a location as an object to the DB
> - Query for locations near a given coordinate (sorted by distance)
