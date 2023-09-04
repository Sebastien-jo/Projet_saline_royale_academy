.PHONY: logs

include app/back/bin/make/variables.mk
include app/back/bin/make/functions.mk

include app/back/bin/make/codingStyle.mk
include app/back/bin/make/vendors.mk
include app/back/bin/make/docker.mk
include app/back/bin/make/database.mk
include app/back/bin/make/behat.mk
