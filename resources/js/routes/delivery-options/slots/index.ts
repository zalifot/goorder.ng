import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
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
const slots = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default slots