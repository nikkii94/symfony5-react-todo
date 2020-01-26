Template for creating Symfony 5 applications with Docker

/etc/hosts
``` 
127.0.0.1   mysite.local
```

## Useful commands:

``` 
# List running docker containers
docker ps
docker container ps

# Remove container
docker container rm CONTAINER_ID

docker ps -a

docker states

docker image ls

docker image rm IMAGE_ID

# Start containers
docker-compose up
docker-compose up -d

# Stop containers
docker-compose stop

# Remove containers
docker-compose down
docker-compose down --rmi all

# Enter a container
docker exec -it CONTAINER_ID_OR_CONTAINER_NAME bash
```

For Environment variables and arguments:
[https://vsupalov.com/docker-arg-env-variable-guide]
