FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build && npx prisma generate
CMD [ "npm", "run", "prod" ]