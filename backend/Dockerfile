#
# Development
#

FROM node:14-alpine AS development

ARG BACKEND_SRC=/dh/src/app/backend

WORKDIR ${BACKEND_SRC}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE ${PORT}

#
# Production
#

FROM node:14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR ${BACKEND_SRC}

COPY --from=development ${BACKEND_SRC} .

CMD ["node", "dist/main"]
