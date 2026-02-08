import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/vendor/delivery-options/states'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vendor/delivery-options/states',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/vendor/delivery-options/states'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/vendor/delivery-options/states'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/vendor/delivery-options/states'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/vendor/delivery-options/states'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/vendor/delivery-options/states/{state}'
 */
export const update = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/vendor/delivery-options/states/{state}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/vendor/delivery-options/states/{state}'
 */
update.url = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { state: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { state: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    state: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        state: typeof args.state === 'object'
                ? args.state.id
                : args.state,
                }

    return update.definition.url
            .replace('{state}', parsedArgs.state.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/vendor/delivery-options/states/{state}'
 */
update.put = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/vendor/delivery-options/states/{state}'
 */
    const updateForm = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/vendor/delivery-options/states/{state}'
 */
        updateForm.put = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/vendor/delivery-options/states/{state}'
 */
export const destroy = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/vendor/delivery-options/states/{state}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/vendor/delivery-options/states/{state}'
 */
destroy.url = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { state: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { state: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    state: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        state: typeof args.state === 'object'
                ? args.state.id
                : args.state,
                }

    return destroy.definition.url
            .replace('{state}', parsedArgs.state.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/vendor/delivery-options/states/{state}'
 */
destroy.delete = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/vendor/delivery-options/states/{state}'
 */
    const destroyForm = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/vendor/delivery-options/states/{state}'
 */
        destroyForm.delete = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const states = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default states