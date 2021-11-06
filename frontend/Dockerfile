#
# Development
#
FROM node:14-alpine AS development

ARG FRONTEND_SRC=/dh/src/app/frontend

WORKDIR ${FRONTEND_SRC}

COPY package*.json ./

RUN npm install
RUN npm install -g @angular/cli

COPY . .

RUN npm run build

EXPOSE ${FRONTEND_PORT}
