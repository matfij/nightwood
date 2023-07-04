FROM node:16-alpine AS development

ARG FRONTEND_SRC=/dh/src/app/frontend

WORKDIR ${FRONTEND_SRC}

RUN npm install -g @angular/cli
RUN yarn

COPY . .

RUN npm run build

EXPOSE ${FRONTEND_PORT}
