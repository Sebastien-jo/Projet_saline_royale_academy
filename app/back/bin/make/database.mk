db-init: ##@database Validate DB schemas
	@$(MAKE) db-create ENV=dev
	@$(MAKE) db-load-fixtures

db-create: ##@database create
	@echo "${BLUE}Drop dev database if exist${RESET}"
	$(call run-php, bin/console doctrine:database:drop --if-exists --force --env=${ENV})
	@echo "${BLUE}Creating dev database${RESET}"
	$(call run-php, bin/console doctrine:database:create --env=${ENV})
	@echo "${BLUE}Dropping/recreating dev database schema${RESET}"
	$(call run-php, bin/console doctrine:migrations:migrate --allow-no-migration --no-interaction --env=${ENV})
	$(MAKE) db-load-fixtures

db-load-fixtures:
	@echo "${BLUE}Loading fixtures${RESET}"
	$(call run-php, bin/console doctrine:fixtures:load --env=dev --no-interaction)