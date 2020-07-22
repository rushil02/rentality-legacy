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
	@echo "After registry login, use 'make initialize' command to start development server for first time after this setup."
	@echo "Thereafter use, 'make run' command every time to start development server."
	@echo "Development server will run on 0.0.0.0:8001"
	newgrp docker

# First time data setup
initialize: ## Initialize the project first time from empty database
	@sudo sysctl -w vm.max_map_count=262144
	@cd ./bin/db_init/  && sh ./load-db.sh
	@docker-compose up -d --build
	@sh ./bin/post-installation.sh

# Build and run the container
build: ## Rebuilds container without cache
	@echo "Building rentality/backend-common:latest ..."
	@docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common --no-cache ./backend
	@echo "Building from docker-compose.yml ..."
	@docker-compose build --no-cache

build-run: ## Build and spin up the project in development mode for first time on system start
	@sudo sysctl -w vm.max_map_count=262144
	docker-compose down
	docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common ./backend
	docker-compose up -d --build

restart: ## Shutdown and Run the project again
	docker-compose down && docker-compose up -d

run: ## Spin up the project without build
	@sudo sysctl -w vm.max_map_count=262144
	@docker-compose up -d

# Logging
be-logs: ## View recent backend logs
	@docker-compose logs backend

fe-logs: ## View recent frontend logs
	@docker-compose logs frontend

be-attach: ## Attach to backend logger
	@docker attach rentality_backend_1

fe-attach: ## Attach to frontend logger
	@docker attach rentality_frontend_1


# Backend
#cd-backend: ## Start STANDALONE container from web image which will be ready for development and package installations
#	@sh ./bin/isolated-BE-container.sh
#
# Frontend
#cd-frontend: ## Start STANDALONE container from frontend image which will be ready for development and package installations
#	@sh ./bin/isolated-FE-container.sh

sync-pkg-list: ## Sync package.json and package-lock.json from running container. Useful after testing new 3rd party packages.
	@sh ./bin/sync-FE-kg-list.sh

# Reset DB to test custom migrations
reset-db-mig: ## Reset database to the provided dump file (in ./bin/db_reload and run migrate
	@cd ./bin/db_reload/  && sh ./reset-savepoint.sh

# Clean all persistent data and containers
clean: ## Clean all persistent data and Remove all containers
	@docker-compose down
	@docker system prune -f
	@docker volume prune -f

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
