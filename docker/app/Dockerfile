ARG PHP_VERSION
ARG PHP_FROM="php:$PHP_VERSION-fpm"

FROM $PHP_FROM

ARG APP_ENV
ARG PROJECT_ROOT
ARG TIMEZONE

ENV APP_ENV=$APP_ENV

# Install dependencies & php extensions
RUN apt-get update && apt-get install -y

RUN apt-get update && apt-get install -y --no-install-recommends \
        git \
        curl \
        nano \
        unzip \
        libicu-dev \
        zlib1g-dev \
        libssl-dev \
        libpq-dev \
        libxml2-dev \
        libzip-dev \
        pkg-config \
        supervisor \
        cron \
    && docker-php-ext-configure \
        pdo_mysql --with-pdo-mysql=mysqlnd \
    && docker-php-ext-install \
        zip \
        opcache \
        intl \
		mysqli \
		pdo pdo_mysql \
    && pecl install \
        apcu \
        xdebug \
        mongodb \
        redis \
    && docker-php-ext-enable \
       apcu \
       xdebug \
       mongodb \
       redis

# Copy php ini file
COPY ./env/$APP_ENV/php.ini /usr/local/etc/php/php.ini
RUN sed -i -e "s#TIMEZONE#$TIMEZONE#g" /usr/local/etc/php/php.ini

# Copy Xdebug
COPY ./debug/xdebug.ini /tmp/
RUN cat /tmp/xdebug.ini >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN rm /tmp/xdebug.ini

# Composer install
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
# or
# RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser
ENV COMPOSER_ALLOW_SUPERUSER 1

# create composer cache directory
RUN mkdir -p /var/www/.composer && chown -R www-data /var/www/.composer

# Node.js 12 && Yarn install
RUN apt-get update && \
    apt-get install -y --no-install-recommends gnupg && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get update && \
    apt-get install -y --no-install-recommends nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends yarn && \
    npm install -g npm

RUN usermod -u 1000 www-data

WORKDIR $PROJECT_ROOT

