FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate && npm run build

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN apk add --no-cache tzdata font-noto

ENV LANG=th_TH.UTF-8
ENV LC_ALL=th_TH.UTF-8
ENV NODE_ENV=PRODUCTION

EXPOSE 8080

COPY start.sh .
RUN chmod +x start.sh
CMD ["sh", "./start.sh"]