FROM node:10

WORKDIR /usr/src/app

RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install

ENV PORT=4242
ENV REDIS_ADDR=
ENV NODE_ENV=development
ENV DEBUG=turn-express,redis,express

EXPOSE $PORT

CMD [ "nodemon" ]

# AS prod
# dev
# If you are building your code for production
# RUN npm ci --only=production
