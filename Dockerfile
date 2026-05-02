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

# Cloud Run requires the container to listen on the port defined by the PORT environment variable
# Nginx default is 80, we change it to 8080 which is the Cloud Run default
RUN sed -i 's/listen  80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
