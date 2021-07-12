.DEFAULT_GOAL := all
.PHONY: all

install:
	npm i

lint:
	npm run lint

test: lint
	npm run test

build: install
	npm run build

run: build
	./dist/myob.js "Mary Song" 60000

all: build test run