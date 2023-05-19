FROM php:8.2-fpm-alpine3.17

ARG php_memory_limit=2048m

ENV PHP_MEMORY_LIMIT=${php_memory_limit}

RUN apk add --no-cache \
    git \
    bash \
    nano \
    curl \
    libzip-dev \
    icu-dev \
    zlib-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    openssh \
    sshpass \
    sudo \
    g++ \
    make \
    autoconf \
    nginx \
    supervisor \
    openssl \
    acl

# Configure PHP extensions
RUN docker-php-ext-configure intl
RUN docker-php-ext-install  pdo_mysql zip intl opcache calendar
RUN pecl install apcu
RUN docker-php-ext-enable apcu

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /

WORKDIR /var/www/symfony

COPY ./app/back .

COPY docker/prod/alpine/files/entrypoint.sh /
RUN chmod a+x /entrypoint.sh

RUN composer install --no-interaction --no-scripts

RUN chown -R www-data:www-data /var/www/symfony

VOLUME ["/var/www/symfony"]

EXPOSE 9000

ENTRYPOINT ["/entrypoint.sh"]

