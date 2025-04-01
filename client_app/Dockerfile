FROM node:latest

RUN mkdir /client

WORKDIR /client

COPY . /client/

RUN npm install

EXPOSE 5173

CMD [ "npm", "start" ]