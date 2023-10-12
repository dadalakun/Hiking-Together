# Use the official Node.js 18 image as base
FROM node:18.18.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock into the container
COPY package.json ./
COPY yarn.lock ./

# Install production dependencies
RUN yarn install --production

# Copy the rest of the app into the container
COPY . .

# Expose port 5001 for the app
EXPOSE 5001

# Start the application
CMD [ "node", "index.js" ]