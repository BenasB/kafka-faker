FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

ENV WDS_SOCKET_PORT=0
CMD ["npm", "run", "start"]