#!/bin/bash

# This script is used to deploy the application to the server.
# It is called by the deploy.sh script in the root of the project.

docker-compose exec node sh -c 'npm build && npm run build'
