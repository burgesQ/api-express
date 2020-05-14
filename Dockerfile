FROM node:10

WORKDIR /usr/src/app

RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

ENV PORT=4242
ENV REDIS_ADDR=
ENV NODE_ENV=development
ENV DEBUG=turn-express,redis,express

EXPOSE $PORT

CMD [ "nodemon" ]
