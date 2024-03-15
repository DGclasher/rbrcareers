FROM node:21-bookworm-slim

WORKDIR /app
COPY . /app/

RUN npm install
RUN npm install -g pm2

EXPOSE 5000

CMD ["pm2-runtime", "start", "index.js", "--name", "rbrcareer-api", "--watch"]
