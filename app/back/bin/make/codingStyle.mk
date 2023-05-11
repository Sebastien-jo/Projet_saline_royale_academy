
cs: cs-php-fix cs-rector cs-php-phpstan

cs-php-phpstan: ##@coding-style Run PHPStan static analysis on PHP staged changes
	@echo "${BLUE}Running php static analysis checks ${RESET}"
	@$(call run-docker-compose, exec -T symfony bash -c "rm -f .phpstan/container.xml; (ls var/cache/dev/App_KernelDevDebugContainer.xml > /dev/null 2>&1 && echo \"Found application cache. Skip cache building.\") || (echo \"Application cache not found. Building it...\" && bin/console --env=dev > /dev/null 2>&1); cp var/cache/dev/App_KernelDevDebugContainer.xml .phpstan/container.xml")
	@$(call run-shell-script, $(DOCKER_IMAGE_PHP), app/back/bin/lint-php-sa.sh `git diff --name-only --cached --diff-filter=d | grep "\.php"`)

cs-rector: ##@coding-style Refactor code following the PHP version standards all php files
	@echo "${BLUE}Running rector on all files ${RESET}"
	@$(call run-php-script, app/back/vendor/bin/rector)

cs-php-fix: ##@coding-style Fixes PHP staged changes according to coding style
	@echo "${BLUE}Fixing PHP syntax${RESET}"
	$(call run-shell-script, $(DOCKER_IMAGE_PHP), app/back/bin/lint-php-fix.sh `git diff --name-only --cached --diff-filter=d | grep "\.php"`)