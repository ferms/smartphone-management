# mobile-device-management/Dockerfile
FROM node:20.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
