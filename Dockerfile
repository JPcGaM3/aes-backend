FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./

RUN npm install -g nodemon

EXPOSE 8080
CMD ["nodemon", "index.js"]