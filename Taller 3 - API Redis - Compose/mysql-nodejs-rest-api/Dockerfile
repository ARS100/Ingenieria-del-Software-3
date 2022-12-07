#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR C:\Users\alero\OneDrive\Escritorio\UIS\9 NOVENO SEMESTRE\Ingenieria-del-Software-3\Taller 3 - API Redis - Compose\mysql-nodejs-rest-api

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
RUN npm install -g nodemon mysql cors express


#Default command
CMD ["npm","start"]

