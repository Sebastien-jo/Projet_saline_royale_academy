#!/bin/bash

envsubst '${ENV_NAME}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

bash /docker-entrypoint.sh nginx

exec /usr/sbin/nginx
