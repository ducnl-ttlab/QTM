FROM node:14.16-alpine

WORKDIR /src
ADD package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD ["npm", "start"]