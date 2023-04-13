install:
		sh bin/install.sh

deploy:
		sh bin/deploy.sh

ps:
		docker-compose ps

up:
		docker-compose up -d

bash:
	docker-compose exec symfony bash

stop:
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