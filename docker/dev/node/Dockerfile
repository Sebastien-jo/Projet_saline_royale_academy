# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY ./app/front/package.json ./
RUN npm install --legacy-peer-deps
RUN npm install react-scripts -g

## add app
#COPY /app/front/ ./

# start app
CMD ["npm", "start"]