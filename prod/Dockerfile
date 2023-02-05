FROM node:16-alpine AS production

ARG BACKEND_SRC=/nightwood/app 
ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR ${BACKEND_SRC}

COPY package.json ./
COPY yarn.lock ./

RUN npm i -g @nestjs/cli
RUN yarn install

EXPOSE ${BACKEND_PORT}

CMD ["node", "dist/main"]
