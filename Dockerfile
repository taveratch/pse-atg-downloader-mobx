FROM gcr.io/google_appengine/nodejs

WORKDIR /app

COPY ./ .

RUN npm install

WORKDIR /app/proxy-server

RUN npm install

WORKDIR /app

EXPOSE 8080

CMD ["npm", "run", "build-start"]


# FROM gcr.io/google_appengine/nodejs

# WORKDIR /app

# COPY ./ .

# RUN npm install

# WORKDIR /app/proxy-server

# RUN npm install

# WORKDIR /app

# EXPOSE 8080

# CMD ["npm", "run", "build-start"]