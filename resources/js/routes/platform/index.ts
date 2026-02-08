import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import shops266a13 from './shops'
import users48860f from './users'
import admins from './admins'
/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/vendor/platform/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/vendor/platform/analytics'
 */
        analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
export const shops = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shops.url(options),
    method: 'get',
})

shops.definition = {
    methods: ["get","head"],
    url: '/vendor/platform/shops',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
shops.url = (options?: RouteQueryOptions) => {
    return shops.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
shops.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shops.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
shops.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shops.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
    const shopsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shops.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
        shopsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shops.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/vendor/platform/shops'
 */
        shopsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shops.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shops.form = shopsForm
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/vendor/platform/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
const platform = {
    analytics: Object.assign(analytics, analytics),
shops: Object.assign(shops, shops266a13),
users: Object.assign(users, users48860f),
admins: Object.assign(admins, admins),
}

export default platform