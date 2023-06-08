db-init: ##@database Validate DB schemas
	@$(MAKE) db-create ENV=dev

db-create: ##@database create
	@echo "${BLUE}Drop dev database if exist${RESET}"
	$(call run-in-container, -u www-data:www-data symfony, php -dmemory_limit=-1, bin/console doctrine:database:drop --if-exists --force --env=${ENV})
	@echo "${BLUE}Creating dev database${RESET}"
	$(call run-in-container, -u www-data:www-data symfony, php -dmemory_limit=-1, bin/console doctrine:database:create --env=${ENV})
	@echo "${BLUE}Dropping/recreating dev database schema${RESET}"
	$(call run-php, bin/console doctrine:migrations:migrate --allow-no-migration --no-interaction --env=${ENV})
	$(MAKE) db-load-fixtures