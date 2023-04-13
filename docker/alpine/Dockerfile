FROM php:8.2-fpm-alpine3.17

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

WORKDIR /var/www/
RUN composer create-project symfony/skeleton symfony
WORKDIR /var/www/symfony

CMD nginx && php-fpm