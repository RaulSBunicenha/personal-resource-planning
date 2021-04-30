USER_ID=$(shell id -u)
GROUP_ID=$(shell id -g)

delete-db-folder:
	rm -rf postgres-data/
.PHONY: create-db-folder

create-db-folder:
	mkdir -p postgres-data/
.PHONY: create-db-folder

start-db: create-db-folder
	USER_ID=$(USER_ID) GROUP_ID=$(GROUP_ID) docker-compose up -d postgres
.PHONY: start-db

down:
	docker-compose down -v --rmi local
.PHONY: down

build-dev:
	docker-compose build dev-app
.PHONY: build-dev

dev:
	docker-compose up dev-app
.PHONY: dev
