FROM node:10 AS dev

WORKDIR /usr/src/app

RUN npm install -g nodemon

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# copy src
COPY src/* /usr/src/app/src/

ENV NODE_ENV=development
ENV PORT=4242
ENV DEBUG=api-express,redis,express

EXPOSE $PORT

CMD [ "nodemon" ]

FROM node:10-alpine AS prod

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=4242

COPY --from=dev /usr/src/app/package*.json .
RUN npm install --production && npm ci --only=production

COPY src/* /usr/src/app/src/

EXPOSE $PORT

CMD [ "npm", "run", "start" ]
# dev
# If you are building your code for production
# RUN npm ci --only=production
