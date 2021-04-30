delete-db-folder:
	rm -rf postgres-data/
.PHONY: create-db-folder

create-db-folder:
	mkdir -p postgres-data/
.PHONY: create-db-folder

start-db: create-db-folder
	@docker-compose up -d postgres
.PHONY: start-db

down:
	@docker-compose down -v --rmi local
.PHONY: down

build-dev:
	@docker-compose build dev-app
.PHONY: build-dev

dev:
	@docker-compose up dev-app
.PHONY: dev
