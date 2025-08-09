# Use the official Node.js image as a base
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3301
# EXPOSE 3303

# Command to run the application
# ENTRYPOINT ["nodemon", "/usr/src/app/backend/server.js"]
CMD ["node", "server.js"]