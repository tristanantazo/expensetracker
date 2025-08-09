# Use the official Node.js image as a base
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app/frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3302
# EXPOSE 3303

