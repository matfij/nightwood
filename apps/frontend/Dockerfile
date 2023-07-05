FROM node:18-alpine

WORKDIR /app/frontend

COPY . .

RUN npm i -g @angular/cli
RUN yarn install
RUN yarn run build
