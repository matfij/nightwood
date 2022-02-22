.ONESHELL:


start:
	docker-compose up

restart:
	docker-compose up --build

build:
	docker-compose build

stop:
	docker-compose down


gen.client:
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
