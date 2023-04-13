#!/bin/bash

# Copy config files
DOCKER_ENV_FILE=".env"
if [ ! -f "DOCKER_ENV_FILE" ]; then
  cp .env.dist .env
fi

DOCKER_COMPOSE_FILE="docker-compose.override.yml"
if [ ! -f "$DOCKER_COMPOSE_FILE" ]; then
  cp docker-compose.override.yml.dist docker-compose.override.yml
fi

SYMFONY_ENV_FILE="app/back/.env"
if [ ! -f "$SYMFONY_ENV_FILE" ]; then
  cp app/back/.env.dist app/back/.env
fi

# build docker compose
docker-compose up --force-recreate --build -d --remove-orphans

# install dependencies
docker-compose exec symfony sh -c 'composer install'
docker-compose exec symfony sh -c 'bin/console assets:install public'

# Create database + update schema
docker-compose exec symfony sh -c 'bin/console doctrine:database:create --if-not-exists'
docker-compose exec symfony sh -c 'bin/console cache:clear'

# Update var directory permissions
docker-compose exec symfony sh -c 'chown -Rf www-data: var/'

#create keypair
docker-compose exec symfony sh -c 'set -e ;apt-get install -y openssl;'
docker-compose exec symfony sh -c 'set -e ;apt-get install -y acl;'
docker-compose exec symfony sh -c 'php bin/console lexik:jwt:generate-keypair'
docker-compose exec symfony sh -c 'setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt'
docker-compose exec symfony sh -c' setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt'