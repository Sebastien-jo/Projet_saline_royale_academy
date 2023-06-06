#!/bin/bash

export DD_AGENT_HOST=$(curl --connect-timeout 5 -s http://169.254.169.254/latest/meta-data/local-ipv4)

readonly JWT_DIRECTORY=/var/www/symfony/config/jwt

# Fetch JWT public and private keys from environment
if [ ! -z "$JWT_PRIVATE_KEY" ] && [ ! -z "$JWT_PUBLIC_KEY" ]
then
    # create JWT config directory if not exists
    [ ! -d "${JWT_DIRECTORY}" ] && mkdir -p $JWT_DIRECTORY
    echo "Writing JWT_PRIVATE_KEY (${#JWT_PRIVATE_KEY} chars) to ${JWT_DIRECTORY}/private.pem"
    echo "$JWT_PRIVATE_KEY" > "${JWT_DIRECTORY}/private.pem"
    echo "Writing JWT_PUBLIC_KEY (${#JWT_PUBLIC_KEY} chars) to ${JWT_DIRECTORY}/public.pem"
    echo "$JWT_PUBLIC_KEY" > "${JWT_DIRECTORY}/public.pem"
fi

bin/console cache:warmup

exec /usr/local/sbin/php-fpm -F
