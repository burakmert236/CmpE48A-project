# Pull Docker Hub base image
FROM node:14-alpine
# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn* ./

RUN apk update 
RUN apk add git

# Install app dependencies
RUN yarn

# Copy app to container
COPY . .
# Create a build
RUN yarn build
# Install server
RUN yarn global add serve
# Run the app
CMD ["serve", "-s", "build"]