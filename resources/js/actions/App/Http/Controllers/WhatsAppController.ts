import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
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
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:146
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
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
setupCatalog.url = (options?: RouteQueryOptions) => {
    return setupCatalog.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
setupCatalog.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: setupCatalog.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
    const setupCatalogForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: setupCatalog.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::setupCatalog
 * @see app/Http/Controllers/WhatsAppController.php:146
 * @route '/vendor/integrations/whatsapp/catalog/setup'
 */
        setupCatalogForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: setupCatalog.url(options),
            method: 'post',
        })
    
    setupCatalog.form = setupCatalogForm
/**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:165
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
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
syncProducts.url = (options?: RouteQueryOptions) => {
    return syncProducts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
syncProducts.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: syncProducts.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
    const syncProductsForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: syncProducts.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::syncProducts
 * @see app/Http/Controllers/WhatsAppController.php:165
 * @route '/vendor/integrations/whatsapp/catalog/sync'
 */
        syncProductsForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: syncProducts.url(options),
            method: 'post',
        })
    
    syncProducts.form = syncProductsForm
/**
* @see \App\Http\Controllers\WhatsAppController::sendMessage
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
export const sendMessage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage.url(options),
    method: 'post',
})

sendMessage.definition = {
    methods: ["post"],
    url: '/vendor/integrations/whatsapp/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::sendMessage
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
sendMessage.url = (options?: RouteQueryOptions) => {
    return sendMessage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::sendMessage
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
sendMessage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sendMessage.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::sendMessage
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
    const sendMessageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sendMessage.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::sendMessage
 * @see app/Http/Controllers/WhatsAppController.php:193
 * @route '/vendor/integrations/whatsapp/send'
 */
        sendMessageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sendMessage.url(options),
            method: 'post',
        })
    
    sendMessage.form = sendMessageForm
/**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
export const webhookVerify = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: webhookVerify.url(options),
    method: 'get',
})

webhookVerify.definition = {
    methods: ["get","head"],
    url: '/webhooks/whatsapp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
webhookVerify.url = (options?: RouteQueryOptions) => {
    return webhookVerify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
webhookVerify.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: webhookVerify.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
webhookVerify.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: webhookVerify.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
    const webhookVerifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: webhookVerify.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
        webhookVerifyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: webhookVerify.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WhatsAppController::webhookVerify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
        webhookVerifyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: webhookVerify.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    webhookVerify.form = webhookVerifyForm
/**
* @see \App\Http\Controllers\WhatsAppController::webhookHandle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
export const webhookHandle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookHandle.url(options),
    method: 'post',
})

webhookHandle.definition = {
    methods: ["post"],
    url: '/webhooks/whatsapp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::webhookHandle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
webhookHandle.url = (options?: RouteQueryOptions) => {
    return webhookHandle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::webhookHandle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
webhookHandle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: webhookHandle.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::webhookHandle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
    const webhookHandleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: webhookHandle.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::webhookHandle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
        webhookHandleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: webhookHandle.url(options),
            method: 'post',
        })
    
    webhookHandle.form = webhookHandleForm
const WhatsAppController = { redirect, callback, disconnect, setupCatalog, syncProducts, sendMessage, webhookVerify, webhookHandle }

export default WhatsAppController