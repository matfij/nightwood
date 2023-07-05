FROM node:18-alpine

WORKDIR /app/backend

COPY . .

RUN npm i -g @nestjs/cli
RUN yarn install
RUN yarn run build
