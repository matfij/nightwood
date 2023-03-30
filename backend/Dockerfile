FROM node:16-alpine AS development

ARG BACKEND_SRC=/dh/src/app/backend

WORKDIR ${BACKEND_SRC}

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN npm i -g @nestjs/cli
RUN yarn install
RUN yarn run build

EXPOSE ${BACKEND_PORT}
