.ONESHELL:


start:
	docker-compose up

build:
	docker-compose build

restart:
	docker-compose build
	docker-compose up


client.gen.openapi:
	rm -rf generator/generated
	cp backend/schema.json generator/schema.json
	cp generator/openapitools.json openapitools.json 
	npx @openapitools/openapi-generator-cli generate
	rm openapitools.json

client.gen.nswag:
	rm -rf generator/generated
	cp backend/schema.json generator/schema.json
	cp generator/nswag.json nswag.json
	nswag run
	rm nswag.json
	cp generator/api.ts frontend/src/app/client/api.ts


git.push:
	git add .
	git commit -m "$(m)"
	git push
