.ONESHELL:


start.dev:
	cd .infra/dev && docker-compose up

restart.dev:
	cd .infra/dev && docker-compose up --build

stop.dev:
	cd .infra/dev && docker-compose down

prune.all:
	docker system prune --all --volumes --force


copy.config:
	cp apps/backend/src/configuration/frontend.config.ts apps/frontend/src/app/client/config/frontend.config.ts
	cp apps/backend/src/common/definitions/banned-words.ts apps/frontend/src/app/client/config/banned-words.ts

gen.api.client:
	mkdir .temp
	cp .scripts/nswag/* .temp/
	cp apps/backend/schema.json .temp/schema.json
	cd .temp && nswag run
	cp .temp/api.ts apps/frontend/src/app/client/api.ts
	rm -r .temp

gen.static: 
	cd apps/frontend && npm run build-prod
	rm -r apps/backend/client
	cp -r apps/frontend/dist/nightwood-frontend/ apps/backend/client/


start.prod:
	cd .infra/prod && docker-compose up


system.init:
	sudo yum update -y
	sudo yum install nginx
	sudo yum install docker
	sudo service docker start
	sudo systemctl enable docker
	sudo usermod -a -G docker ec2-user
	sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
