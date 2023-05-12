vendor-install: ##@vendor Install vendors on containers
	$(call run-composer, install -n)