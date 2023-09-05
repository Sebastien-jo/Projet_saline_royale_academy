test-behat: ##@tests Execute functional behat tests (optional: tests="path/to/myTest/orToTestFolder")
	@echo "${BLUE}Executing functional behat tests${RESET}"
	$(call run-in-container, symfony, php vendor/bin/behat $(scenario) --format=progress --suite=default -vv)
