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

db-load-fixtures:
	@echo "${BLUE}Loading fixtures${RESET}"
	$(call run-php, bin/console doctrine:fixtures:load --env=dev --no-interaction)

test-db-init: ## Init the test database
	@echo "${BLUE}Init the test database with fixtures${RESET}"
	@echo "${BLUE}Drop test database if exist${RESET}"
	$(call run-in-container, -u www-data:www-data symfony, bin/console doctrine:database:drop --if-exists --force --env=test)
	@echo "${BLUE}Creating test database${RESET}"
	$(call run-in-container, -u www-data:www-data symfony, bin/console doctrine:database:create --env=test)
	@echo "${BLUE}Dropping/recreating database schema${RESET}"
	$(call run-php, bin/console doctrine:migrations:migrate --allow-no-migration --no-interaction --env=test)
	$(MAKE) test-load-fixtures

test-load-fixtures: ## Load fixtures
	@echo "${BLUE}Loading Alice fixtures${RESET}"
	$(call run-in-container, -u www-data:www-data symfony, bin/console doctrine:fixtures:load --env=test --no-interaction)
