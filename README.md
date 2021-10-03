# listen-together

- docker-compose up

### App is live with port 3001

## Deploy

- create app on heroku
- heroku login
- heroku container:push web -a `your-app-name`
- herok container:release web -a `your-app-name`

## Env

- REACT_APP_YOUTUBE_API_KEY=`your-youtube-v3-api-key`
- REACT_APP_API_URL=`localhost:3001/your-host`
