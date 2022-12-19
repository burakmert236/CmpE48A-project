FROM node:18.0-slim
COPY . .
RUN npm install
CMD [ "npm", "start" ]