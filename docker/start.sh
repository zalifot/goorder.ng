#!/bin/bash
set -e

echo "Starting application..."

# Skip database wait if SKIP_DB_WAIT is set
if [ "${SKIP_DB_WAIT:-false}" = "true" ]; then
    echo "Skipping database wait (SKIP_DB_WAIT=true)"
else
    # Wait for database to be ready with timeout
    echo "Waiting for database connection..."
    MAX_RETRIES=10
    RETRY_COUNT=0
    until php artisan migrate:status > /dev/null 2>&1; do
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
            echo "Database not ready after $MAX_RETRIES attempts, continuing anyway..."
            break
        fi
        echo "Database not ready, waiting 5 seconds... (attempt $RETRY_COUNT/$MAX_RETRIES)"
        sleep 5
    done
fi

# Run database migrations conditionally
if [ "${RUN_MIGRATIONS:-true}" = "true" ]; then
    echo "Running database migrations..."
    php artisan migrate --force || echo "Migration failed, continuing..."
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
