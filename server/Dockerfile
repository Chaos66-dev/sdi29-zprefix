FROM node:latest

RUN mkdir /server

WORKDIR /server

COPY . /server/

RUN npm install

EXPOSE 4000

CMD [ "sh", "-c", "npx knex migrate:rollback && npx knex migrate:latest && npx knex seed:run && npm run dev" ]