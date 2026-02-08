import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
export const shop = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shop.url(args, options),
    method: 'get',
})

shop.definition = {
    methods: ["get","head"],
    url: '/api/cart/shop/{shop}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
shop.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return shop.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
shop.get = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shop.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
shop.head = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shop.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
    const shopForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shop.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
        shopForm.get = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shop.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CartController::shop
 * @see app/Http/Controllers/CartController.php:158
 * @route '/api/cart/shop/{shop}'
 */
        shopForm.head = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shop.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shop.form = shopForm
const cart = {
    shop: Object.assign(shop, shop),
}

export default cart