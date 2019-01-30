FROM node:11-alpine
WORKDIR /src/static/v2/frontend
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build