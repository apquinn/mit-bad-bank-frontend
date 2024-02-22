FROM node:20.11.0-alpine
WORKDIR /usr/src/bad-bank-frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000:3000
CMD [ "npm", "start" ]