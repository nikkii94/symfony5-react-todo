app_container_name=sf5_react_todo_app

build:
	@docker-compose -f docker-compose.yml build

start:
	@docker-compose -f docker-compose.yml up -d

config:
	@docker-compose -f docker-compose.yml config

ssh:
	@docker exec -it $(app_container_name) bash

exec:
	@docker exec -it $(app_container_name) $$cmd

clear-composer:
	@make exec cmd="php -d memory_limit=-1 `which composer` update"

composer-install:
	@make exec cmd="composer install"

yarn-install:
	@make exec cmd="yarn install"
