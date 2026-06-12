FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port (Render sets PORT dynamically, but this is for local reference)
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
