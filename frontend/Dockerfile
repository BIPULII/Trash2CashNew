# Frontend Dockerfile
FROM node:18 as build

ARG VITE_API_URL=http://localhost:5000

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN VITE_API_URL=${VITE_API_URL} npm run build

# Serve static files using nginx
FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
