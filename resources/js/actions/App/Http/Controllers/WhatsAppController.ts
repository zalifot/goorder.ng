import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WhatsAppController::connect
 * @see app/Http/Controllers/WhatsAppController.php:17
 * @route '/vendor/integrations/whatsapp/connect'
 */
export const connect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connect.url(options),
    method: 'post',
})

connect.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/connect',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::connect
 * @see app/Http/Controllers/WhatsAppController.php:17
 * @route '/vendor/integrations/whatsapp/connect'
 */
connect.url = (options?: RouteQueryOptions) => {
    return connect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::connect
 * @see app/Http/Controllers/WhatsAppController.php:17
 * @route '/vendor/integrations/whatsapp/connect'
 */
connect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: connect.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::connect
 * @see app/Http/Controllers/WhatsAppController.php:17
 * @route '/vendor/integrations/whatsapp/connect'
 */
    const connectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: connect.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::connect
 * @see app/Http/Controllers/WhatsAppController.php:17
 * @route '/vendor/integrations/whatsapp/connect'
 */
        connectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: connect.url(options),
            method: 'post',
        })
    
    connect.form = connectForm
/**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:98
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
export const disconnect = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(options),
    method: 'delete',
})

disconnect.definition = {
    methods: ["delete"],
    url: '/vendor/integrations/whatsapp/disconnect',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:98
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
disconnect.url = (options?: RouteQueryOptions) => {
    return disconnect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:98
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
disconnect.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:98
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
    const disconnectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: disconnect.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:98
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
        disconnectForm.delete = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: disconnect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    disconnect.form = disconnectForm
/**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:108
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
export const setupCatalog = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setupCatalog.url(options),
    method: 'post',
})

setupCatalog.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/catalog/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:108
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
setupCatalog.url = (options?: RouteQueryOptions) => {
    return setupCatalog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:108
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
setupCatalog.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setupCatalog.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:108
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
    const setupCatalogForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setupCatalog.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:108
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
        setupCatalogForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setupCatalog.url(options),
            method: 'post',
        })
    
    setupCatalog.form = setupCatalogForm
/**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:127
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
export const syncProducts = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncProducts.url(options),
    method: 'post',
})

syncProducts.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/catalog/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:127
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
syncProducts.url = (options?: RouteQueryOptions) => {
    return syncProducts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:127
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
syncProducts.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncProducts.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:127
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
    const syncProductsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: syncProducts.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:127
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
        syncProductsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: syncProducts.url(options),
            method: 'post',
        })
    
    syncProducts.form = syncProductsForm
const WhatsAppController = { connect, disconnect, setupCatalog, syncProducts }

export default WhatsAppController