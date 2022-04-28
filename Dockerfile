FROM node:14.16-alpine

WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install
COPY . .

EXPOSE 7500
CMD ["npm", "start"]