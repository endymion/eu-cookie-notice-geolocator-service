FROM node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
ENV PATH ./node_modules/.bin:$PATH

# Bundle app source
COPY . /usr/src/app

EXPOSE 3000

CMD sls offline start --noEnvironment --host 0.0.0.0
