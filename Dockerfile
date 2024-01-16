FROM node:21-alpine3.18

WORKDIR /usr/src/app

ENV TZ=Asia/Bangkok
RUN apk add --no-cache tzdata

RUN npm install -g pnpm
COPY package*.json ./
RUN pnpm install
COPY . .

RUN pnpm run build

CMD ["pnpm", "start"]