.ONESHELL:


start:
	docker-compose up

restart:
	docker-compose up --build

build:
	docker-compose build

stop:
	docker-compose down


gen.config:
	cp backend/src/configuration/frontend.config.ts frontend/src/app/client/config/frontend.config.ts
	cp backend/src/common/definitions/banned-words.ts frontend/src/app/client/config/banned-words.ts

gen.client:
	rm -rf generator/api-client/generated
	cp backend/schema.json generator/api-client/schema.json
	cp generator/api-client/nswag.json nswag.json
	nswag run
	rm nswag.json
	cp generator/api-client/api.ts frontend/src/app/client/api.ts

gen.assets:
	cd generator/game-assets
	sh start

clear.assets:
	rm -rf generator/game-assets/input/*
	rm -rf generator/game-assets/output/*


git.push:
	git add .
	git commit -m "$(m)"
	git push
