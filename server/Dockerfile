FROM node:18-alpine

# Set working directory

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "dist/src/index.js"]
