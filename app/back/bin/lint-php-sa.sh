#!/bin/bash

#
# Execute phpstan on staged files if there are some.
#
# Usage:
# > ./lint-php-sa.sh /path/to/file1 /path/to/file2
#

if [ ! -f  "app/back/composer.json" ]; then
    echo "ERR: This script must be executed from the project root directory."
    exit 1
fi

if [ -z "$1" ]; then
    echo "No PHP files to check."
    exit 0;
fi

if [ ! -f "app/back/.phpstan/container.xml" ]; then
    echo "ERR: No dev cache found. PHPStan requires it, please run the following command and retry."
    echo "make build-symfony-container"
    exit 1;
fi

# Clear result cache as it can make phpstan miss some errors at run
php -d memory_limit=-1 app/back/vendor/bin/phpstan clear-result-cache

php -d memory_limit=-1 app/back/vendor/bin/phpstan analyse $@
