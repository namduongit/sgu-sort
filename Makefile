all: docker

docker:
	@docker compose up --build

up:
	@docker compose up -d --build

down:
	@docker compose down -v

.PHONY: docker background
