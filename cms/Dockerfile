# Build stage
FROM node:20-alpine AS builder

# Install build dependencies
RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application files
COPY . .

# Build Strapi admin panel
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:20-alpine

# Install runtime dependencies
RUN apk add --no-cache vips-dev

# Create app user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S strapi -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder
COPY --from=builder --chown=strapi:nodejs /app ./

# Create necessary directories with correct permissions
RUN mkdir -p /app/.tmp /app/public/uploads && \
    chown -R strapi:nodejs /app

# Switch to non-root user
USER strapi

# Expose port
EXPOSE 1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD node -e "require('http').get('http://localhost:1337/_health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start Strapi
CMD ["npm", "run", "start"]
