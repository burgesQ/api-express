# README.md

Project `api-express`. 

`api-express` is a nodejs API (using the `express` fmwk) which handle the credential creation / feeding for a TURN authentification. 

The nodejs server is dockerized, so no need to install npm or anything else on the host. 

Run `make build` to build the docker image.

Run `make run` to start the docker image. 

The docker iamge run the code via `nodemon`, which allow a hot reload of the content (see `nodemon` for more info)
