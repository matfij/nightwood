#
# Development
#

FROM node:16-alpine AS development

ARG BACKEND_SRC=/dh/src/app/backend

WORKDIR ${BACKEND_SRC}

COPY package.json ./
COPY yarn.lock ./

RUN npm i -g @nestjs/cli
RUN yarn install
RUN yarn run build

EXPOSE ${BACKEND_PORT}

#
# Production
#

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR ${BACKEND_SRC}

COPY package.json ./

COPY --from=development ${BACKEND_SRC} .

EXPOSE ${BACKEND_PORT}

CMD ["node", "dist/main"]
