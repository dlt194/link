# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy and install deps
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

# Copy the rest and build
COPY frontend/ ./
RUN npm run build

# Serve with a tiny web server
FROM nginx:alpine AS runner

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]
