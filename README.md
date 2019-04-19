# Rentality

## Setup [FOR DEV ONLY]

##### First Time Build Will Take Time...

- To start the containers -
```
docker-compose up -d --build  
```
First time builds or after database reset will require to run the following command.
```
# After starting containers initialize the data with
sh ./post-installation.sh

# Select yes for all subsequent questions
```

- To see console logger of a particular service - 
```
docker attach rentality_<service_name_in_docker_compose_file>_1 
```

- To attach and execute commands inside a service container -
```
docker-compose exec <service_name_in_docker_compose_file> sh
# Shell will attach to contianer
<command_to_execute>      
```

- OR to directly execute command
```
docker-compose exec <service_name_in_docker_compose_file> <command_to_execute>
```

- Override docker-compose by creating new docker-compose file, eg - docker-compose.override.yml. And add '-f' flag to all 
docker commands -
```
docker-compose up -d --build -f ./docker-compose.override.yml
```

By default, Django and Webpack keep refreshing the server as you edit the files.


#### Other Commands

```
# Build the images
# First Time Build Will Take Time...
docker-compose build
```
```
# Create/start the containers
docker-compose up -d
```
```
# Do Both
docker-compose up -d --build
```
```
# Stop and Remove Containers
docker-compose down
```
```
# System Clean - Clears docker cache
docker system prune
```
```
# Volume Clean - Clears volumes 
# BEWARE - THIS WILL REMOVE THE DATA INSIDE VOLUMES LIKE DATABASE
docker volume prune
```
