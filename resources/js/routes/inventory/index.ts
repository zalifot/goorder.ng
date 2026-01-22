import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::dashboard
 * @see app/Http/Controllers/ProductController.php:21
 * @route '/inventory'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::dashboard
 * @see app/Http/Controllers/ProductController.php:21
 * @route '/inventory'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::dashboard
 * @see app/Http/Controllers/ProductController.php:21
 * @route '/inventory'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::dashboard
 * @see app/Http/Controllers/ProductController.php:21
 * @route '/inventory'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})
const inventory = {
    dashboard: Object.assign(dashboard, dashboard),
}

export default inventory