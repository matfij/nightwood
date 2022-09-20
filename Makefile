.ONESHELL:


start:
	docker-compose up

restart:
	docker-compose up --build

build:
	docker-compose build

stop:
	docker-compose down

clear:
	docker system prune --all --volumes --force


copy.config:
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
	sh startwin
	py run.py $(m) 

clear.assets:
	rm -rf generator/game-assets/input/*
	rm -rf generator/game-assets/output/*

copy.static: 
	rm -rf backend/client/*
	cp -r frontend/dist/nightwood-frontend/* backend/client/

git.push:
	git add .
	git commit -m "$(m)"
	git push


system.init:
	sudo yum update -y
	sudo amazon-linux-extras install nginx1
	sudo yum install docker
	sudo service docker start
	sudo systemctl enable docker
	sudo usermod -a -G docker ec2-user
	sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose
