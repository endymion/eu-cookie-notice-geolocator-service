FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm i -g serverless && npm i -g serverless-offline

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD sls offline start
