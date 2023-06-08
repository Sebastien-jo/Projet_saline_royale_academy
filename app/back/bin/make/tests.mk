test-behat: 	##@tests Execute functional behat tests optional (scenario=path/to/my_scenario.feature:123)"
	@echo "${BLUE}Executing functional behat tests${RESET}"
	$(call run-in-container, php, vendor/bin/behat $(scenario) --format=progress --suite=${BEHAT_SUITE} -vv)