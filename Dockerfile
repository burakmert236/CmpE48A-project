FROM node:18.0-slim
COPY . .
RUN npm install
# Create a build
RUN yarn build
# Install server
RUN yarn global add serve
# Run the app
CMD ["serve", "-s", "build"]