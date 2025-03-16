FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --production
# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY server.js ./

EXPOSE 3000

CMD ["npm", "start"]