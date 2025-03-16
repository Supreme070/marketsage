# Use Node.js 20 slim for latest features with reduced size
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy only necessary files
COPY server.js ./

# Expose port
EXPOSE 3000

# Start with npm for consistency with package.json scripts
CMD ["npm", "start"]