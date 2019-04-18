FROM node:11-alpine
WORKDIR /app
COPY ./package.json .
RUN npm install
WORKDIR /app/frontend
COPY . .
RUN npm run build