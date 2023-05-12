.PHONY: install deploy ps up bash stop build-dev ky

install: up ##@docker First init docker's containers
		sh bin/install.sh
		$(MAKE) vendor-install
		php app/back/vendor/bin/grumphp git:init

deploy:
		sh bin/deploy.sh

ps:
		docker-compose ps

up: ##@docker start docker's containers
		docker-compose up -d

bash:
	docker-compose exec symfony bash

stop: ##@docker stop docker's containers
		docker-compose stop

build-dev:
	    docker-compose exec symfony chown -R www-data: /var/
		docker-compose exec symfony sh -c 'composer install'
		docker-compose exec symfony sh -c 'php bin/console doctrine:migrations:migrate --no-interaction'
		docker-compose exec symfony sh -c 'bin/console assets:install public'
		docker-compose exec symfony sh -c 'bin/console cache:clear'
		make ky
		cd app/front && npm install && npm run build
		cd ../..

ky:
		docker-compose exec symfony sh -c 'set -e ;apt-get install -y openssl;'
		docker-compose exec symfony sh -c 'set -e ;apt-get install -y acl;'
		docker-compose exec symfony sh -c 'php bin/console lexik:jwt:generate-keypair'
		docker-compose exec symfony sh -c 'setfacl -R -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt'
		docker-compose exec symfony sh -c' setfacl -dR -m u:www-data:rX -m u:"$(whoami)":rwX config/jwt'

build-symfony-container: ##@app Build dev symfony container
	@echo "${BLUE}Building dev container${RESET}"
	$(call run-php, bin/console --env=dev > /dev/null 2>&1)

fix-permissions: fix-permissions-composer ##@docker Fixes permissions in PHP container
	@echo "${BLUE}Fixing permissions...${RESET}"
	$(call run-docker-compose, exec symfony chown -R www-data:www-data /var/www/symfony/var/cache)
	$(call run-docker-compose, exec symfony chown -R www-data:www-data /var/www/symfony/var/log)

fix-permissions-composer: ##@docker Fixes composer cache permissions in PHP container
	@echo "${BLUE}Setting composer cache directory and permissions...${RESET}"
	$(call run-docker-compose, exec -u root symfony mkdir -p /var/www/.composer)
	$(call run-docker-compose, exec -u root symfony chown -R www-data:www-data /var/www/.composer)