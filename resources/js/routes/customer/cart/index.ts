import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
export const add = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

add.definition = {
    methods: ["post"],
    url: '/customer/cart/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
add.url = (options?: RouteQueryOptions) => {
    return add.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
add.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: add.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
    const addForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: add.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::add
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
        addForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: add.url(options),
            method: 'post',
        })
    
    add.form = addForm
/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
export const update = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/customer/cart/items/{cartItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
update.url = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cartItem: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cartItem: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cartItem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cartItem: typeof args.cartItem === 'object'
                ? args.cartItem.id
                : args.cartItem,
                }

    return update.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
update.patch = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
    const updateForm = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::update
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
        updateForm.patch = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
export const remove = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

remove.definition = {
    methods: ["delete"],
    url: '/customer/cart/items/{cartItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
remove.url = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cartItem: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cartItem: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cartItem: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cartItem: typeof args.cartItem === 'object'
                ? args.cartItem.id
                : args.cartItem,
                }

    return remove.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
remove.delete = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: remove.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
    const removeForm = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: remove.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::remove
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
        removeForm.delete = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: remove.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    remove.form = removeForm
/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
export const clear = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: clear.url(args, options),
    method: 'delete',
})

clear.definition = {
    methods: ["delete"],
    url: '/customer/cart/{cart}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
clear.url = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { cart: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { cart: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    cart: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        cart: typeof args.cart === 'object'
                ? args.cart.id
                : args.cart,
                }

    return clear.definition.url
            .replace('{cart}', parsedArgs.cart.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
clear.delete = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: clear.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
    const clearForm = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clear.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::clear
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
        clearForm.delete = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clear.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    clear.form = clearForm
const cart = {
    add: Object.assign(add, add),
update: Object.assign(update, update),
remove: Object.assign(remove, remove),
clear: Object.assign(clear, clear),
}

export default cart