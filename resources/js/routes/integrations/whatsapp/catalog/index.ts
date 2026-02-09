import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WhatsAppController::setup
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
export const setup = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(options),
    method: 'post',
})

setup.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/catalog/setup',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::setup
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
setup.url = (options?: RouteQueryOptions) => {
    return setup.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::setup
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
setup.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setup.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::setup
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
    const setupForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setup.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::setup
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
        setupForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setup.url(options),
            method: 'post',
        })
    
    setup.form = setupForm
/**
* @see \App\Http\Controllers\WhatsAppController::sync
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
export const sync = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

sync.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/catalog/sync',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::sync
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
sync.url = (options?: RouteQueryOptions) => {
    return sync.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::sync
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
sync.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sync.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::sync
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
    const syncForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sync.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::sync
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
        syncForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sync.url(options),
            method: 'post',
        })
    
    sync.form = syncForm
const catalog = {
    setup: Object.assign(setup, setup),
sync: Object.assign(sync, sync),
}

export default catalog