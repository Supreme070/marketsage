# Use official Node.js 20 slim image as base
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy application code
COPY server.js ./

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]