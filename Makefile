MAJOR_VERSION := 2
MINOR_VERSION := 0

.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Setup docker
req-install: ## Install and setup requisites: docker-ce and docker-compose
	@sudo chmod +x ./bin/docker-setup.sh
	@sudo ./bin/docker-setup.sh
	@echo "Login to Gitlab for docker container registry (Use your conventional Gitlab credentials)"
	sudo docker login registry.gitlab.com
	@echo "All configurations are set. System restart maybe required."
	@echo "Use 'make run' command to start development. Development port is running on 0.0.0.0:8001"
	@newgrp docker


# Build and run the container
build: ## Rebuilds container without cache
	docker-compose build --no-cache

run: ## Spin up the project in development mode
	@sudo sysctl vm.max_map_count=262144
	docker-compose down && docker-compose up -d --build

# Backend
start-pipenv: ## Install all build libraries in web container to enable package installation and open the container. Useful for all `pipenv` manipulations.
	docker-compose exec web apk add gcc musl-dev postgresql-dev build-base python-dev py-pip
	docker-compose exec web pipenv install --deploy
	docker-compose exec web sh

# Docker release - build, tag and push the container
release: build publish ## Make a release by building and publishing the `{version}` ans `latest` tagged containers to ECR

# Docker publish
publish: repo-login publish-latest publish-version ## publish the `{version}` ans `latest` tagged containers to ECR

publish-latest: tag-latest ## publish the `latest` taged container to ECR
	@echo 'publish latest to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(APP_NAME):latest

publish-version: tag-version ## publish the `{version}` taged container to ECR
	@echo 'publish $(VERSION) to $(DOCKER_REPO)'
	docker push $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

# Docker tagging
tag: tag-latest tag-version ## Generate container tags for the `{version}` ans `latest` tags

tag-latest: ## Generate container `{version}` tag
	@echo 'create tag latest'
	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):latest

tag-version: ## Generate container `latest` tag
	@echo 'create tag $(VERSION)'
	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):$(VERSION)