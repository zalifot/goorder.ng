import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/user-dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:221
 * @route '/user-dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/user/orders',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:225
 * @route '/user/orders'
 */
        ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
/**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
export const cart = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})

cart.definition = {
    methods: ["get","head"],
    url: '/user/cart',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
cart.url = (options?: RouteQueryOptions) => {
    return cart.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
cart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
cart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
    const cartForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cart.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
        cartForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cart.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:229
 * @route '/user/cart'
 */
        cartForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cart.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cart.form = cartForm
/**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
export const favorites = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: favorites.url(options),
    method: 'get',
})

favorites.definition = {
    methods: ["get","head"],
    url: '/user/favorites',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
favorites.url = (options?: RouteQueryOptions) => {
    return favorites.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
favorites.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: favorites.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
favorites.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: favorites.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
    const favoritesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: favorites.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
        favoritesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: favorites.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:233
 * @route '/user/favorites'
 */
        favoritesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: favorites.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    favorites.form = favoritesForm
const user = {
    dashboard: Object.assign(dashboard, dashboard),
orders: Object.assign(orders, orders),
cart: Object.assign(cart, cart),
favorites: Object.assign(favorites, favorites),
}

export default user