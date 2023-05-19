#!/bin/bash

#
# Execute php-cs-fixer on all given files.
#
# Usage:
# > ./lint-php-fix.sh /path/to/file1 /path/to/file2
#

if [ ! -f  "app/back/composer.json" ]; then
    echo "ERR: This script must be executed from the back root directory."
    exit 1
fi

if [ ! -z $1 ]; then
    app/back/vendor/bin/php-cs-fixer fix --diff --config=./app/back/.php_cs.strict $@;
fi
