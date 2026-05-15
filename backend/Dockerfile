#Base image
FROM node:20
# create app directory
WORKDIR /backend
# copy all the packages
COPY package*.json ./
# install dependencies
RUN npm install
# copy all the files
COPY . .

#run
CMD ["npm", "start"]
