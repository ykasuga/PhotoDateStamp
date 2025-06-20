FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install necessary packages
RUN apk add --no-cache fontconfig font-noto

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Expose port
EXPOSE 5002

# Build the app
RUN npm run build

# Start the app
CMD ["npx", "tsx", "/app/src/index.ts"]
