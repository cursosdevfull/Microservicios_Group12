FROM node:18.19.1-alpine 

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]