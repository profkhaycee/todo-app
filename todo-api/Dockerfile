FROM php:8.3-cli

WORKDIR /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y zip unzip git curl libzip-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# ✅ Copy ALL files first (including artisan)
COPY . .

# ✅ Then run composer install
RUN composer install

# Generate app key if .env doesn't exist
RUN cp -n .env.example .env || true
RUN php artisan key:generate

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]