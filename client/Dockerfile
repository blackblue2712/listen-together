FROM node:12.3.1 AS builder

WORKDIR /app

COPY ./package* .
RUN npm ci
COPY . .

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000

