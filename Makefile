start-db:
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