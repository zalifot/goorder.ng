import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/delivery-options/states'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/delivery-options/states',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/delivery-options/states'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::store
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/delivery-options/states'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/delivery-options/states/{state}'
 */
export const update = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/delivery-options/states/{state}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::update
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/delivery-options/states/{state}'
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
 * @route '/delivery-options/states/{state}'
 */
update.put = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/delivery-options/states/{state}'
 */
export const destroy = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/delivery-options/states/{state}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroy
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/delivery-options/states/{state}'
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
 * @route '/delivery-options/states/{state}'
 */
destroy.delete = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const states = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default states