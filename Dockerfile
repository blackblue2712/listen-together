FROM node:12.3.1 AS builder

WORKDIR /app

RUN mkdir client
COPY ./client/package* ./client/
RUN cd client && npm ci
COPY . .

RUN cd client && npm run build

FROM node:alpine

ENV REACT_APP_YOUTUBE_API_KEY=AIzaSyBi4u9F0lE9kqYzQhy9ZkC2A_WM8zOdrQc
ENV REACT_APP_API_URL=https://gcp-api-qqpyiv3e2a-as.a.run.app

WORKDIR /app

COPY ./package* ./
RUN mkdir client && npm ci && cd client && mkdir build

COPY --from=builder /app/client/build ./client/build

COPY *.js ./

CMD ["npm", "start"]

EXPOSE 3001

