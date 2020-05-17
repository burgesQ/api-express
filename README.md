# README.md

[![Build Status](https://github.com/burgesQ/api-express/workflows/TestAndCover/badge.svg)](https://github.com/burgesQ/api-express/actions?query=workflow%3ATestAndCover)
[![codecov](https://codecov.io/gh/burgesQ/api-express/branch/master/graph/badge.svg)](https://codecov.io/gh/burgesQ/api-express)

`api-express` is a boilerplate which aim to be a learning project. 

The api is written in `nodejs`, using the `express` framework. 
A resilent redis connection is hanlded (unsing `ioredis` :wink:). 

CRUD operation are available via a the H* redis operation.

The project can be run in docker, but npm is required if you want to run in developement mode. 
The `node_modules` directory need to be in the root package, but the root directory is also 
shared via a volume with the docker. 

The dev target of the docker iamge run the code via `nodemon`, which allow a hot reload of the content.

## use it 

### dev 

- `make build` to build the docker image
- npm install to install the node_modules (so it's not missing at runtime)
- `make run` to run the docker image
- `make redis` to run a redis docker image


Access 127.0.0.1:4242/api/v1/docs :) or `curl 127.0.0.1:4242/api/v1/docs.json`

### prod 

- `make build -e TARGET=prod`
- `make run`

## project

### nodejs

#### external library 

- `express`: api framework
- `express-pretty`: return pretty json via the `pretty` query param
- `swagger-ui-exoress`: serve a swagger doc 
- `swagger-jsdoc`: generate swagger from code
- `morgan`: handle api logging
- `ioredis`: redis connection
- `ioredis-mock`: mocked redis for testing
- `dotenv`: handle dotfile
- `moca`: test runner
- `chai`: http testing

#### package.json target

- `lint`: run eslint
- `lintfix`: run eslint + fixer
- `pretty`: run prettier
- `start`: start the API
- `test`: run the test via mocha
- `swagger`: generate a swagger.json file 
- `coverage`: generate code coverage
- `codecov`: generate and publish coverage to codecov

### make 

### docker
