import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})

verify.definition = {
    methods: ["get","head"],
    url: '/webhooks/whatsapp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
verify.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
verify.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
    const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
        verifyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WhatsAppController::verify
 * @see app/Http/Controllers/WhatsAppController.php:216
 * @route '/webhooks/whatsapp'
 */
        verifyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify.form = verifyForm
/**
* @see \App\Http\Controllers\WhatsAppController::handle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
export const handle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

handle.definition = {
    methods: ["post"],
    url: '/webhooks/whatsapp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WhatsAppController::handle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
handle.url = (options?: RouteQueryOptions) => {
    return handle.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WhatsAppController::handle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
handle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: handle.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WhatsAppController::handle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
    const handleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: handle.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WhatsAppController::handle
 * @see app/Http/Controllers/WhatsAppController.php:231
 * @route '/webhooks/whatsapp'
 */
        handleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: handle.url(options),
            method: 'post',
        })
    
    handle.form = handleForm
const whatsapp = {
    verify: Object.assign(verify, verify),
handle: Object.assign(handle, handle),
}

export default whatsapp