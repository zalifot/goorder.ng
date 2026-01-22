import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryOptionController::index
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/delivery-options'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/delivery-options',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::index
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/delivery-options'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::index
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/delivery-options'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DeliveryOptionController::index
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/delivery-options'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeState
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/delivery-options/states'
 */
export const storeState = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeState.url(options),
    method: 'post',
})

storeState.definition = {
    methods: ["post"],
    url: '/delivery-options/states',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeState
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/delivery-options/states'
 */
storeState.url = (options?: RouteQueryOptions) => {
    return storeState.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeState
 * @see app/Http/Controllers/DeliveryOptionController.php:53
 * @route '/delivery-options/states'
 */
storeState.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeState.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateState
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/delivery-options/states/{state}'
 */
export const updateState = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateState.url(args, options),
    method: 'put',
})

updateState.definition = {
    methods: ["put"],
    url: '/delivery-options/states/{state}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateState
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/delivery-options/states/{state}'
 */
updateState.url = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateState.definition.url
            .replace('{state}', parsedArgs.state.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateState
 * @see app/Http/Controllers/DeliveryOptionController.php:69
 * @route '/delivery-options/states/{state}'
 */
updateState.put = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateState.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroyState
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/delivery-options/states/{state}'
 */
export const destroyState = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyState.url(args, options),
    method: 'delete',
})

destroyState.definition = {
    methods: ["delete"],
    url: '/delivery-options/states/{state}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroyState
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/delivery-options/states/{state}'
 */
destroyState.url = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroyState.definition.url
            .replace('{state}', parsedArgs.state.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroyState
 * @see app/Http/Controllers/DeliveryOptionController.php:81
 * @route '/delivery-options/states/{state}'
 */
destroyState.delete = (args: { state: number | { id: number } } | [state: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyState.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:89
 * @route '/delivery-options/locations'
 */
export const storeLocation = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLocation.url(options),
    method: 'post',
})

storeLocation.definition = {
    methods: ["post"],
    url: '/delivery-options/locations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:89
 * @route '/delivery-options/locations'
 */
storeLocation.url = (options?: RouteQueryOptions) => {
    return storeLocation.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:89
 * @route '/delivery-options/locations'
 */
storeLocation.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLocation.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:103
 * @route '/delivery-options/locations/{location}'
 */
export const updateLocation = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLocation.url(args, options),
    method: 'put',
})

updateLocation.definition = {
    methods: ["put"],
    url: '/delivery-options/locations/{location}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:103
 * @route '/delivery-options/locations/{location}'
 */
updateLocation.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { location: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    location: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        location: typeof args.location === 'object'
                ? args.location.id
                : args.location,
                }

    return updateLocation.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:103
 * @route '/delivery-options/locations/{location}'
 */
updateLocation.put = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateLocation.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroyLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:116
 * @route '/delivery-options/locations/{location}'
 */
export const destroyLocation = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLocation.url(args, options),
    method: 'delete',
})

destroyLocation.definition = {
    methods: ["delete"],
    url: '/delivery-options/locations/{location}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroyLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:116
 * @route '/delivery-options/locations/{location}'
 */
destroyLocation.url = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { location: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { location: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    location: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        location: typeof args.location === 'object'
                ? args.location.id
                : args.location,
                }

    return destroyLocation.definition.url
            .replace('{location}', parsedArgs.location.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroyLocation
 * @see app/Http/Controllers/DeliveryOptionController.php:116
 * @route '/delivery-options/locations/{location}'
 */
destroyLocation.delete = (args: { location: number | { id: number } } | [location: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyLocation.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeSlot
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
export const storeSlot = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSlot.url(options),
    method: 'post',
})

storeSlot.definition = {
    methods: ["post"],
    url: '/delivery-options/slots',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeSlot
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
storeSlot.url = (options?: RouteQueryOptions) => {
    return storeSlot.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::storeSlot
 * @see app/Http/Controllers/DeliveryOptionController.php:124
 * @route '/delivery-options/slots'
 */
storeSlot.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSlot.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateSlot
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
export const updateSlot = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSlot.url(args, options),
    method: 'put',
})

updateSlot.definition = {
    methods: ["put"],
    url: '/delivery-options/slots/{slot}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateSlot
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
updateSlot.url = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateSlot.definition.url
            .replace('{slot}', parsedArgs.slot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::updateSlot
 * @see app/Http/Controllers/DeliveryOptionController.php:144
 * @route '/delivery-options/slots/{slot}'
 */
updateSlot.put = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSlot.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroySlot
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
export const destroySlot = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySlot.url(args, options),
    method: 'delete',
})

destroySlot.definition = {
    methods: ["delete"],
    url: '/delivery-options/slots/{slot}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroySlot
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
destroySlot.url = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroySlot.definition.url
            .replace('{slot}', parsedArgs.slot.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::destroySlot
 * @see app/Http/Controllers/DeliveryOptionController.php:158
 * @route '/delivery-options/slots/{slot}'
 */
destroySlot.delete = (args: { slot: number | { id: number } } | [slot: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySlot.url(args, options),
    method: 'delete',
})
const DeliveryOptionController = { index, storeState, updateState, destroyState, storeLocation, updateLocation, destroyLocation, storeSlot, updateSlot, destroySlot }

export default DeliveryOptionController