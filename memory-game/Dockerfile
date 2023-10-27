# Use an official Node.js runtime as the base image
FROM node:current-alpine3.17

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Expose a port (if your app listens on a specific port)
EXPOSE 3001

# Define the command to start your app
CMD ["npm", "start"]
