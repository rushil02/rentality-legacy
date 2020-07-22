MAJOR_VERSION := 1
MINOR_VERSION := 0

.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build: ## Build image with latest tag
	docker build -t backend-geo-base:latest .

push: ## Push image to Gitlab's container registry
	docker tag backend-geo-base:latest registry.gitlab.com/rushil0195/rentality/backend-geo-base:v${MAJOR_VERSION}.${MINOR_VERSION}
	docker push registry.gitlab.com/rushil0195/rentality/backend-geo-base:v${MAJOR_VERSION}.${MINOR_VERSION}
