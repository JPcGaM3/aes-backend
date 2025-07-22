FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

RUN  npx prisma generate && npm run build
CMD [ "npm", "run", "prod" ]