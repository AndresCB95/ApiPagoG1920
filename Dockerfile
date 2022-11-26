FROM node:latest

ADD . .

RUN npm install

EXPOSE 8083

ENTRYPOINT [ "node","index.js" ]