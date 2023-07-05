FROM node:18-alpine AS development

WORKDIR /app/backend

COPY . .

RUN npm i -g @nestjs/cli
RUN yarn install
RUN yarn run build


FROM node:18-alpine AS production

WORKDIR /app/backend

COPY . .

RUN npm i -g @nestjs/cli
RUN yarn install
RUN yarn run build
