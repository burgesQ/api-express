#! /bin/bash

redis_ip=`docker inspect -f "{{.NetworkSettings.Networks.bridge.IPAddress}}" turn-express-redis 2> /dev/null`
express_ip=`docker inspect -f "{{.NetworkSettings.Networks.bridge.IPAddress}}" turn-express 2> /dev/null`
echo -e "redis ip:   $redis_ip"
echo -e "express ip: $express_ip"
