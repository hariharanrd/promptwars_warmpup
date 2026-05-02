# Use a Node.js base image to build the app
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Create a custom Nginx configuration to handle SPA routing if needed
# For now, we'll use the default which serves index.html for the root
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
