.PHONY: help

help: ## This help
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
	@echo "Development server will run on 0.0.0.0:8000"
	newgrp docker

initialize: ## Initialize the project first time from empty database
	@sudo sysctl -w vm.max_map_count=262144
	@cd ./bin/db_init/  && sh ./load-db.sh
	@docker-compose up -d --build
	@sh ./bin/post-installation.sh

build: ## Rebuilds docker images without cache
	@make fe-vol-clean
	@echo "Building rentality/backend-common:latest ..."
	@docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common --no-cache ./backend
	@echo "Building from docker-compose.yml ..."
	@docker-compose build --no-cache --parallel

build-run: ## Build and spin up the project in development mode for first time on system start or when app configs are changed
	@sudo sysctl -w vm.max_map_count=262144
	@docker-compose down
	@make fe-vol-clean
	@docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common ./backend
	@docker-compose up -d --build

restart: ## Shutdown and Run the project again
	@docker-compose down
	@make fe-vol-clean
	@docker-compose up -d

run: ## Spin up the project from last build
	@sudo sysctl -w vm.max_map_count=262144
	@docker-compose up -d

run-migration-service: ## Closely imitates production behaviour for migration-control
	@sudo sysctl -w vm.max_map_count=262144
	@docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common ./backend
	@docker-compose -f ./docker-compose.migrate.yml up -d --build
	docker wait rentality_migration_1
	@echo "Task complete"


### Backend ###
#cd-backend: ## Start STANDALONE container from web image which will be ready for development and package installations
#	@sh ./bin/isolated-BE-container.sh

be-attach: ## Attach to backend - service 'web' logger
	@docker attach rentality_web_1

be-logs: ## View recent backend - service 'web' logs
	@docker-compose logs web


### Frontend ###

#cd-frontend: ## Start STANDALONE container from frontend image which will be ready for development and package installations
#	@sh ./bin/isolated-FE-container.sh

fe-logs: ## View recent frontend logs
	@docker-compose logs frontend

fe-vol-clean: ## Clean frontend persistent data
	docker volume rm rentality_frontend_data rentality_frontend_cache || true

fe-attach: ## Attach to frontend logger
	@docker attach rentality_frontend_1

sync-pkg-list: ## Sync package.json and package-lock.json from running container. Useful after testing new 3rd party packages.
	@sh ./bin/sync-FE-kg-list.sh

build-prod-FE-run: ## Start Frontend service using gatsby production build (using gatsby's server)
	@sudo sysctl -w vm.max_map_count=262144
	@docker-compose down
	@make fe-vol-clean
	@docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common ./backend
	@docker-compose -f docker-compose.yml -f docker-compose.prod-dev-1.yml up -d --build

build-nx-prod-FE-run: ## Start Frontend service using gatsby production build (using nginx)
	@sudo sysctl -w vm.max_map_count=262144
	@docker-compose down
	@make fe-vol-clean
	@docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common ./backend
	@docker-compose -f docker-compose.yml -f docker-compose.prod-dev-2.yml up -d --build


# Reset DB to test custom migrations
reset-db-mig: ## Reset database to the provided dump file (in ./bin/db_reload) and run migrate
	@cd ./bin/db_reload/  && sh ./reset-savepoint.sh

# Clean all persistent data and containers
clean: ## Clean all persistent data and Remove all containers
	@docker-compose down
	@docker system prune -f
	@docker volume prune -f

### Docker release - build, tag and push the container ###

ci-build: ## Build and Tag containers versioned as per docker-compose.prod-build.yml
	# TODO: check if working directory is clean in terms of git
	docker build -t rentality/backend-common:latest -f ./backend/Dockerfile.common --no-cache ./backend
	COMMIT_BRANCH="$$(git rev-parse --abbrev-ref HEAD)" GIT_HEAD_HASH="$$(git rev-parse --short HEAD)" docker-compose -f docker-compose.prod-build.yml build --no-cache --parallel

publish:  ## Push all containers to registry
	COMMIT_BRANCH="$$(git rev-parse --abbrev-ref HEAD)" GIT_HEAD_HASH="$$(git rev-parse --short HEAD)" docker-compose -f docker-compose.prod-build.yml push

release: ci-build publish ## Make a release by building and publishing images as per docker-compose.prod-build.yml


###### Other ######


### Stripe ###

# Stripe WebHook container
stripe-webhook:  ## Start the stripe CLI webHook
	@cd ./bin/stripe_cli/webhook && docker run --rm -it $$(docker build -q .)

# Stripe CLI
stripe-test-cli:  ## Start the stripe CLI via docker
	@echo "Run 'stripe login' first and 'stripe help' for how to work with it."
	@docker run --rm -it --entrypoint sh stripe/stripe-cli:latest