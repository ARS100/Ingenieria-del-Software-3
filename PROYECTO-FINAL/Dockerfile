FROM node:16

ENV FOO=/usr/src/app

WORKDIR ${FOO}

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "src/index.js" ] 
