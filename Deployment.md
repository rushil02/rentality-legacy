# Deployment Steps

## Pre requisites
1. Set Secrets in `./secrets`
2. Install docker on server
3. Set docker on swarm mode: `docker swarm init [OPTIONS]` [Refer](https://docs.docker.com/engine/reference/commandline/swarm_init/)
4. Get latest version of `docker-compose.prod.yml`
5. Push latest images to gitlab registry.
6. Keep latest DB backup handy.

## Deploying first time
- `docker stack deploy --with-registry-auth -c docker-compose.prod.yml rentality`

- Check services by `docker stack ps rentality`

## Restoring DB

- Get Postgres container ID

- `docker exec [POSTGRES_CONTAINER] mkdir /backup`
- `docker cp [DB_FILE_LOCATION] [POSTGRES_CONTAINER]:/backup`
- `docker exec [POSTGRES_CONTAINER] psql rentality < [DB_FILENAME].sql`
- Delete the sql file from container

## Syncing Nginx, DB with WEB

- `docker exec [Any-Web-Container] sh sync_services.sh`

## Updating with latest images

- Push latest images to Gitlab.
- `docker service update --with-registry-auth --image registry.gitlab.com/rushil0195/rentality/web:latest rentality_web`

- Sync Services Again