FROM node:18-alpine

# Set working directory

# Install dependencies
COPY package*.json ./
RUN npm install --force --legacy-peer-deps && npm ci && apk update && apk add fontconfig && npm install -g @types/express && npm install --save exiftool-vendored && npm rebuild exiftool-vendored
COPY node_modules ./node_modules
ENV NODE_PATH=/app/node_modules:/usr/local/lib/node_modules

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "dist/index.js"]
