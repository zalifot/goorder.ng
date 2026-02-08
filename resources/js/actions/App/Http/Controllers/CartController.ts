import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/customer/cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CartController::index
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
export const addItem = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addItem.url(options),
    method: 'post',
})

addItem.definition = {
    methods: ["post"],
    url: '/customer/cart/add',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
addItem.url = (options?: RouteQueryOptions) => {
    return addItem.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
addItem.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: addItem.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
    const addItemForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: addItem.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::addItem
 * @see app/Http/Controllers/CartController.php:49
 * @route '/customer/cart/add'
 */
        addItemForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: addItem.url(options),
            method: 'post',
        })
    
    addItem.form = addItemForm
/**
* @see \App\Http\Controllers\CartController::updateItem
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
export const updateItem = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateItem.url(args, options),
    method: 'patch',
})

updateItem.definition = {
    methods: ["patch"],
    url: '/customer/cart/items/{cartItem}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\CartController::updateItem
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
updateItem.url = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateItem.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::updateItem
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
updateItem.patch = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateItem.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\CartController::updateItem
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
    const updateItemForm = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateItem.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::updateItem
 * @see app/Http/Controllers/CartController.php:98
 * @route '/customer/cart/items/{cartItem}'
 */
        updateItemForm.patch = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateItem.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateItem.form = updateItemForm
/**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
export const removeItem = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeItem.url(args, options),
    method: 'delete',
})

removeItem.definition = {
    methods: ["delete"],
    url: '/customer/cart/items/{cartItem}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
removeItem.url = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return removeItem.definition.url
            .replace('{cartItem}', parsedArgs.cartItem.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
removeItem.delete = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: removeItem.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
    const removeItemForm = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: removeItem.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::removeItem
 * @see app/Http/Controllers/CartController.php:122
 * @route '/customer/cart/items/{cartItem}'
 */
        removeItemForm.delete = (args: { cartItem: number | { id: number } } | [cartItem: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: removeItem.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    removeItem.form = removeItemForm
/**
* @see \App\Http\Controllers\CartController::clearCart
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
export const clearCart = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: clearCart.url(args, options),
    method: 'delete',
})

clearCart.definition = {
    methods: ["delete"],
    url: '/customer/cart/{cart}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CartController::clearCart
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
clearCart.url = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return clearCart.definition.url
            .replace('{cart}', parsedArgs.cart.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::clearCart
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
clearCart.delete = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: clearCart.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CartController::clearCart
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
    const clearCartForm = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clearCart.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CartController::clearCart
 * @see app/Http/Controllers/CartController.php:143
 * @route '/customer/cart/{cart}'
 */
        clearCartForm.delete = (args: { cart: number | { id: number } } | [cart: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clearCart.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    clearCart.form = clearCartForm
/**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
export const getShopCart = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getShopCart.url(args, options),
    method: 'get',
})

getShopCart.definition = {
    methods: ["get","head"],
    url: '/api/cart/shop/{shop}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
getShopCart.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { shop: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { shop: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    shop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        shop: typeof args.shop === 'object'
                ? args.shop.id
                : args.shop,
                }

    return getShopCart.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
getShopCart.get = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getShopCart.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
getShopCart.head = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getShopCart.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
    const getShopCartForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getShopCart.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
        getShopCartForm.get = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getShopCart.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CartController::getShopCart
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
        getShopCartForm.head = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getShopCart.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getShopCart.form = getShopCartForm
const CartController = { index, addItem, updateItem, removeItem, clearCart, getShopCart }

export default CartController