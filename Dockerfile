# Use uma imagem Node.js como base
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 3000
