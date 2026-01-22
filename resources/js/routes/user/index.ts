import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:206
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
 * @see routes/web.php:206
 * @route '/user-dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:206
 * @route '/user-dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:206
 * @route '/user-dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
 * @see routes/web.php:268
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
 * @see routes/web.php:268
 * @route '/user/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:268
 * @route '/user/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:268
 * @route '/user/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

/**
 * @see routes/web.php:272
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
 * @see routes/web.php:272
 * @route '/user/cart'
 */
cart.url = (options?: RouteQueryOptions) => {
    return cart.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:272
 * @route '/user/cart'
 */
cart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:272
 * @route '/user/cart'
 */
cart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(options),
    method: 'head',
})

/**
 * @see routes/web.php:276
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
 * @see routes/web.php:276
 * @route '/user/favorites'
 */
favorites.url = (options?: RouteQueryOptions) => {
    return favorites.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:276
 * @route '/user/favorites'
 */
favorites.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: favorites.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:276
 * @route '/user/favorites'
 */
favorites.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: favorites.url(options),
    method: 'head',
})
const user = {
    dashboard: Object.assign(dashboard, dashboard),
orders: Object.assign(orders, orders),
cart: Object.assign(cart, cart),
favorites: Object.assign(favorites, favorites),
}

export default user