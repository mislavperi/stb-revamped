install:
	@go mod tidy

gen-sqlc:
	@sqlc vet
	@sqlc generate

gen-openapi:
	@go run github.com/ogen-go/ogen/cmd/ogen@latest \
		--target ./internal/server \
		-package server \
		--config ./openapi/.ogen.yml \
		--clean \
		./openapi/schema.yml

gen-all: gen-sqlc gen-openapi

build: gen-all
	@go build -o bin/main cmd/api/main.go

run: build
	@./bin/main

dev:
	@. .env.local && air