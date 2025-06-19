FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install && npm ci && apk add fontconfig && npm install cors -g typescript ts-node && npm install -D @types/cors @types/archiver
RUN npm install cors && npm install --save-dev @types/node @types/sharp
RUN npm install -g tsx

# Copy source code
COPY . .

# Expose port
EXPOSE 5002

# Build the app
RUN echo "Building the app" && npm run build

# Start the app
CMD ["tsx", "/app/src/index.ts"]
