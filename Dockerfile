FROM node:12.3.1 AS builder

WORKDIR /app

RUN mkdir client
COPY ./client/package* ./client
RUN cd client && npm ci
COPY . .

RUN cd client && npm run build

FROM node:alpine

WORKDIR /app

COPY ./package* .
RUN mkdir client && npm ci && cd client && mkdir build

COPY --from=builder /app/client/build ./client/build

COPY *.js .

CMD ["npm", "start"]

EXPOSE 3001

