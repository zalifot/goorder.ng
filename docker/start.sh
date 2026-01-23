#!/bin/bash

echo "Starting application..."

# Fix storage permissions at runtime
echo "Setting storage permissions..."
chmod -R 775 /var/www/html/storage 2>/dev/null || true
chmod -R 775 /var/www/html/bootstrap/cache 2>/dev/null || true
mkdir -p /var/www/html/storage/logs 2>/dev/null || true
touch /var/www/html/storage/logs/laravel.log 2>/dev/null || true
chown -R www-data:www-data /var/www/html/storage 2>/dev/null || true

# Show database connection info (without password)
echo "Database connection info:"
echo "  DB_CONNECTION: ${DB_CONNECTION:-not set}"
echo "  DB_HOST: ${DB_HOST:-not set}"
echo "  DB_PORT: ${DB_PORT:-not set}"
echo "  DB_DATABASE: ${DB_DATABASE:-not set}"
echo "  DB_USERNAME: ${DB_USERNAME:-not set}"

# Run migrations with verbose output
echo "Running database migrations..."
if php artisan migrate --force 2>&1; then
    echo "✅ Migrations completed successfully!"
else
    echo "❌ Migration failed! Check database connection."
    echo "Showing migration status..."
    php artisan migrate:status 2>&1 || true
fi

# Clear and optimize caches
echo "Optimizing application caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
echo "Starting Apache server..."
apache2-foreground
