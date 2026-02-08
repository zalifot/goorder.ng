import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PlatformController::store
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vendor/platform/admins',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlatformController::store
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::store
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PlatformController::store
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::store
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PlatformController::destroy
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
 */
export const destroy = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/vendor/platform/admins/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlatformController::destroy
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
 */
destroy.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: args.user,
                }

    return destroy.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::destroy
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
 */
destroy.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PlatformController::destroy
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
 */
    const destroyForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::destroy
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
 */
        destroyForm.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const admins = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default admins