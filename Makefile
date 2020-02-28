MAJOR_VERSION := 2
MINOR_VERSION := 0

.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# Setup docker
req-install: ## Install and setup requisites: docker-ce and docker-compose
	@sudo chmod +x ./bin/docker-setup.sh
	@sh ./bin/docker-setup.sh
	@echo "All configurations are set. System restart maybe required."
	@echo "Login to Gitlab for docker container registry (Use your conventional Gitlab credentials)"
	@echo "Command - docker login registry.gitlab.com"
	@echo "After registry login, use 'make run' command to start development. Development server will run on 0.0.0.0:8001"
	newgrp docker

# First time data setup
initialize: ## Sync with DB and Populate with default data
	@sh ./bin/post-installation.sh

# Build and run the container
build: ## Rebuilds container without cache
	docker-compose build --no-cache

run: ## Build and spin up the project in development mode for first time on system start
	@sudo sysctl vm.max_map_count=262144
	docker-compose down && docker-compose up -d --build

rerun: ## Run the project again
	docker-compose down && docker-compose up -d


# Logging
be-logs: ## View recent backend logs
	@docker-compose logs web

fe-logs: ## View recent frontend logs
	@docker-compose logs frontend

be-attach: ## Attach to backend logger
	@docker attach rentality_web_1

fe-attach: ## Attach to frontend logger
	@docker attach rentality_frontend_1


# Backend
cd-backend: ## Start STANDALONE container from web image which will be ready for development and package installations
	@sh ./bin/isolated-BE-container.sh

# Frontend
cd-frontend: ## Start STANDALONE container from frontend image which will be ready for development and package installations
	@sh ./bin/isolated-FE-container.sh


# Frontend

# Docker release - build, tag and push the container
# release: build publish ## Make a release by building and publishing the `{version}` ans `latest` tagged containers to ECR

# Docker publish
# publish: repo-login publish-latest publish-version ## publish the `{version}` ans `latest` tagged containers to ECR

# publish-latest: tag-latest ## publish the `latest` tagged container to ECR
# 	@echo 'publish latest to $(DOCKER_REPO)'
# 	docker push $(DOCKER_REPO)/$(APP_NAME):latest

# publish-version: tag-version ## publish the `{version}` tagged container to ECR
# 	@echo 'publish $(VERSION) to $(DOCKER_REPO)'
# 	docker push $(DOCKER_REPO)/$(APP_NAME):$(VERSION)

# Docker tagging
# tag: tag-latest tag-version ## Generate container tags for the `{version}` ans `latest` tags

# tag-latest: ## Generate container `{version}` tag
# 	@echo 'create tag latest'
# 	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):latest

# tag-version: ## Generate container `latest` tag
# 	@echo 'create tag $(VERSION)'
# 	docker tag $(APP_NAME) $(DOCKER_REPO)/$(APP_NAME):$(VERSION)