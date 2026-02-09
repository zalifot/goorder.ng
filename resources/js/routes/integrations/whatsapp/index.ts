import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
import catalog from './catalog'
/**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/vendor/integrations/whatsapp/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WhatsAppController::redirect
 * @see app/Http/Controllers/WhatsAppController.php:19
 * @route '/vendor/integrations/whatsapp/redirect'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
/**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/vendor/integrations/whatsapp/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
        callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WhatsAppController::callback
 * @see app/Http/Controllers/WhatsAppController.php:40
 * @route '/vendor/integrations/whatsapp/callback'
 */
        callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    callback.form = callbackForm
/**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:136
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
 * @see app/Http/Controllers/WhatsAppController.php:136
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
disconnect.url = (options?: RouteQueryOptions) => {
    return disconnect.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:136
 * @route '/vendor/integrations/whatsapp/disconnect'
 */
disconnect.delete = (options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: disconnect.url(options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::disconnect
 * @see app/Http/Controllers/WhatsAppController.php:136
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
 * @see app/Http/Controllers/WhatsAppController.php:136
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
* @see \App\Http\Controllers\WhatsAppController::send
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::send
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::send
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::send
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::send
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
        sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(options),
            method: 'post',
        })
    
    send.form = sendForm
const whatsapp = {
    redirect: Object.assign(redirect, redirect),
callback: Object.assign(callback, callback),
disconnect: Object.assign(disconnect, disconnect),
catalog: Object.assign(catalog, catalog),
send: Object.assign(send, send),
}

export default whatsapp