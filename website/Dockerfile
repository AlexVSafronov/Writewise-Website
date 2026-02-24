# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install Chromium and its dependencies for Puppeteer pre-rendering
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer to use the system Chromium instead of downloading its own
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_STRAPI_URL
ARG VITE_APP_URL
ARG VITE_API_URL
ARG VITE_STRIPE_PUBLIC_KEY

# Set environment variables for build
ENV VITE_STRAPI_URL=$VITE_STRAPI_URL
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY

# Build the app and pre-render marketing pages
RUN npm run build:prerender

# Production stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
