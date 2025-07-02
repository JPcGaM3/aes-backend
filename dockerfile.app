FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080

ENV HOST=http://localhost
ENV PORT=8080
ENV DATABASE_URL=postgresql://postgres.fzsqzkaljjeldmxijdpj:aesadmin1234@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres=value

CMD [ "npm", "run", "start" ]