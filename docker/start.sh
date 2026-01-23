#!/bin/bash

echo "Starting application..."

# Fix storage permissions at runtime
echo "Setting storage permissions..."
chmod -R 775 /var/www/html/storage 2>/dev/null || true
chmod -R 775 /var/www/html/bootstrap/cache 2>/dev/null || true
mkdir -p /var/www/html/storage/logs 2>/dev/null || true
touch /var/www/html/storage/logs/laravel.log 2>/dev/null || true
chown -R www-data:www-data /var/www/html/storage 2>/dev/null || true

# Always run migrations first - force them
echo "Running database migrations..."
php artisan migrate --force
echo "Migrations completed!"

# Clear and optimize caches
echo "Optimizing application caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
echo "Starting Apache server..."
apache2-foreground
