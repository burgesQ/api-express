NAME	= api-express

# docker build target
BUILD_TARGET	=	dev
# docker runtime shared volumes
VOLUMES = -v `pwd`:/usr/src/app

# VOLUMES = -v `pwd`/src:/usr/src/app/src \
#       -v `pwd`/package.json:/usr/src/app/package.json \
# 			-v `pwd`/package-lock.json:/usr/src/app/package-lock.json \
# 			-v `pwd`/.env:/usr/src/app/.env \
# 			-v `pwd`/Makefile:/usr/src/app/Makefile
# docker run/exec command
CMD	=

.PHONY: $(NAME)
## api-express: Default target, run build
$(NAME): build

.PHONY: build
## build: Build the nodejs docker image (default target)
build:
	@echo " -- Building $(NAME) docker image (target: $(BUILD_TARGET)) ..."
	@docker build -t $(NAME) --target=$(BUILD_TARGET) .
	@echo " -- Building $(NAME) docker image: done"

.PHONY: build-prod
## build-prod: Build a production readu nodejs docker image
build-prod:
	@echo " -- Building $(NAME) prod docker image ..."
	@ $(MAKE) build -e BUILD_TARGET=prod
	@echo " -- Building $(NAME) prod docker image: done"

.PHONY: run
## run: Run the nodejs server from the docker image
run:
	@echo " -- Running $(NAME) docker image ..."
	@docker run	--rm -it \
			--user "$(id -u):$(id -g)" \
      $(VOLUMES) \
			--env-file .dockerenv \
      -p 4242:4242 \
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
	docker run --rm --name $(NAME)-redis -p 6379:6379 redis

.PHONY: stop-redis
## stop-redis: Stop the redis container
stop-redis:
	$(MAKE) stop -e NAME="$(NAME)-redis"

.PHONY: help
## help: Prints this help message
 help:
	@echo "Usage: \n"
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'
