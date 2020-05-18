# README.md

[![Build Status](https://github.com/burgesQ/api-express/workflows/TestAndCover/badge.svg)](https://github.com/burgesQ/api-express/actions?query=workflow%3ATestAndCover)
[![codecov](https://codecov.io/gh/burgesQ/api-express/branch/master/graph/badge.svg)](https://codecov.io/gh/burgesQ/api-express)

## What

`api-express` is a boilerplate which aim to be a learning project (Frafos GmbH FTW :tada:). 

The api is written in `nodejs`, using the `express` framework. 
A resilent redis connection is hanlded (unsing `ioredis` :wink:). 

CRUD operation are available via a the H* redis operation.

The project can be run in docker, but npm is required if you want to run in developement mode. 
The `node_modules` directory need to be in the root package, but the root directory is also 
shared via a volume with the docker. 

The dev target of the docker iamge run the code via `nodemon`, which allow a hot reload of the content.

## Use it 

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

A JSON API, contacting redis, serving a swagger doc. 

#### external library 

Use of: [`express`](1), [`express-prettify`](2), [`swagger-ui-exoress`](3), [`swagger-jsdoc`](4), [`morgan`](5), [`ioredis`](6), [`ioredis-mock`](7), [`dotenv`](8), [`mocha`](9), [`chai`](10)

[1]: https://github.com/expressjs/express
[1]: https://github.com/stipsan/express-prettiffy
#### targets

| **target** | **description**                          | **where**      |
| :-         | :-                                       | -:             |
| `lint`     | run eslint                               | `package.json` |
| `lintfix`  | run eslint + fixer                       | `package.json` |
| `pretty`   | run prettier                             | `package.json` |
| `start`    | start the API                            | `package.json` |
| `test`     | run the test via mocha                   | `package.json` |
| `swagger`  | generate a swagger.json file             | `package.json` |
| `coverage` | generate code coverage                   | `package.json` |
| `codecov`  | generate and publish coverage to codecov | `package.json` |
|            |                                          |                |
|            |                                          | `Makefile`     |


### docker

The dockerfile hold 2 steps : `dev` and `prod`. Provide the `--target` arguemnt to `docker build` 
to stop at the desired target.
