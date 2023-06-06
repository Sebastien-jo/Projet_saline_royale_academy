define run-shell-script
	@$(call run-script, --entrypoint=/bin/sh $(1), $(2))
endef

define run-docker-compose
	docker-compose $(1)
endef

define run-php
	@$(call run-in-container, symfony, php -dmemory_limit=-1 $(1))
endef

define run-in-container
	@$(call run-docker-compose, exec $(1) $(2))
endef

define run-script
	@$(call run-docker, run -t -v $(shell pwd):/var/www/symfony $(1) $(2))
endef

define run-docker
	docker $(1)
endef

define run-php-script
	@$(call run-script, --entrypoint=/usr/local/bin/php $(DOCKER_IMAGE_PHP), $(1))
endef
