
FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./
COPY models ./models
COPY routes ./routes

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]
