FROM node:8.6.0-slim

WORKDIR /app

COPY ./ .

RUN npm install

WORKDIR /app/proxy-server

RUN npm install

WORKDIR /app

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
