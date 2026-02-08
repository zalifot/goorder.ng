import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import catalog from './catalog'
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
const whatsapp = {
    connect: Object.assign(connect, connect),
disconnect: Object.assign(disconnect, disconnect),
catalog: Object.assign(catalog, catalog),
}

export default whatsapp