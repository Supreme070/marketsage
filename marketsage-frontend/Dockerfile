# marketsage-frontend/Dockerfile
FROM nginx:alpine

# Copy static files to Nginx directory
COPY . /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]