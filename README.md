# Rentality

## Commands

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
```
# After starting containers initialize the data with
# Only for Development Purpose Only
./post-installation.sh
```