NAME	= turn-express

.PHONY: $(NAME)
## turn_express: Default target, run build
$(NAME): build

.PHONY: build
## build: Build the nodejs docker image (default target)
build:
	@echo " -- Building $(NAME) docker image ..."
	@docker build -t $(NAME) .
	@echo " -- Building $(NAME) docker image: done"

CMD	=

.PHONY: run
## run: Run the nodejs server from the docker image
run:
	@echo " -- Running $(NAME) docker image ..."
	@docker run \
			--rm \
			-it \
			--user "$(id -u):$(id -g)" \
			-v `pwd`:/usr/src/app \
			--network host \
			--name $(NAME) \
			$(NAME) $(CMD)
	@echo " -- Running $(NAME) docker image: done"

.PHONY: test
## test: Run the mocha unit test
test:
	@echo " -- Testing $(NAME) ..."
	@ $(MAKE) run -e CMD="npm run test"
	@echo " -- Testing $(NAME): done"

.PHONY: exec
## exec: Run a custom command inside a running the docker container
exec:
	@echo " -- Runnin $(CMD) in $(NAME) ..."
	@ docker exec -it $(NAME) $(CMD)
	@echo " -- Runnin $(CMD) in $(NAME): done"

.PHONY: stop
## stop: Stop the docker image
stop:
	@echo " -- Stopping $(NAME) docker image ..."
	@docker stop -t 0 $(NAME) 2> /dev/null ; true
	@echo " -- Stopping $(NAME) docker image: done"

.PHONY: lint
## lint: Run the linter
lint:
	$(MAKE) run -e CMD="npm run lint"
	$(MAKE) run -e CMD="npm run pretty"

.PHONY: all
## all: Build then run the dockerized nodejs
all: build run

.PHONY: redis
## redis: Start the redis container
redis:
	docker run --rm --name $(NAME)-redis --network host redis

.PHONY: stop-redis
## stop-redis: Stop the redis container
stop-redis:
	$(MAKE) stop -e NAME="$(NAME)-redis"

.PHONY: help
## help: Prints this help message
 help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
