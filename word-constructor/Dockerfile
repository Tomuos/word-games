# Use the official Node.js image as the base image
FROM node:current-alpine3.17

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files to the container
COPY . .

# Expose the port your app will run on (assuming it's 3000)
EXPOSE 3000

# Define the command to start your app
CMD ["npm", "start"]
