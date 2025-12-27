#!/bin/bash
set -e

echo "Starting application..."

# Wait for database to be ready
echo "Waiting for database connection..."
until php artisan migrate:status > /dev/null 2>&1; do
    echo "Database not ready, waiting 5 seconds..."
    sleep 5
done

# Run database migrations conditionally
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    echo "Running database migrations..."
    php artisan migrate --force
else
    echo "Skipping migrations (RUN_MIGRATIONS=false)"
fi

# Clear and optimize caches
echo "Optimizing application caches..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
echo "Starting Apache server..."
apache2-foreground
