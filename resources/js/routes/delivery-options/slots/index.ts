import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/delivery-options/slots',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
export const update = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/delivery-options/slots/{slot}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
update.url = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slot: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slot: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    slot: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slot: typeof args.slot === 'object'
                ? args.slot.id
                : args.slot,
                }

    return update.definition.url
            .replace('{slot}', parsedArgs.slot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
update.put = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
    const updateForm = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
        updateForm.put = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
export const destroy = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/delivery-options/slots/{slot}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
destroy.url = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slot: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { slot: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    slot: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slot: typeof args.slot === 'object'
                ? args.slot.id
                : args.slot,
                }

    return destroy.definition.url
            .replace('{slot}', parsedArgs.slot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
destroy.delete = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
    const destroyForm = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
        destroyForm.delete = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const slots = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default slots