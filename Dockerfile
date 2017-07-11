FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm i -g serverless serverless-offline chai mocha underscore --save

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD sls offline start --noEnvironment --host 0.0.0.0
