FROM node:16

ENV FOO =/usr/src/app

WORKDIR ${FOO}

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "nodemon", "src/" ] 
