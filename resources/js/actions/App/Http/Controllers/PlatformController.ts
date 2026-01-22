import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
const users6e8299a085c11017e62ab420951fb27c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'get',
})

users6e8299a085c11017e62ab420951fb27c.definition = {
    methods: ["get","head"],
    url: '/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
users6e8299a085c11017e62ab420951fb27c.url = (options?: RouteQueryOptions) => {
    return users6e8299a085c11017e62ab420951fb27c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
users6e8299a085c11017e62ab420951fb27c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
users6e8299a085c11017e62ab420951fb27c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users6e8299a085c11017e62ab420951fb27c.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
    const users6e8299a085c11017e62ab420951fb27cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users6e8299a085c11017e62ab420951fb27c.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
        users6e8299a085c11017e62ab420951fb27cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users6e8299a085c11017e62ab420951fb27c.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/users'
 */
        users6e8299a085c11017e62ab420951fb27cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users6e8299a085c11017e62ab420951fb27c.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users6e8299a085c11017e62ab420951fb27c.form = users6e8299a085c11017e62ab420951fb27cForm
    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
const users4a47f1fc35ebf9b2e4ec0472a82562c1 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users4a47f1fc35ebf9b2e4ec0472a82562c1.url(options),
    method: 'get',
})

users4a47f1fc35ebf9b2e4ec0472a82562c1.definition = {
    methods: ["get","head"],
    url: '/platform/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
users4a47f1fc35ebf9b2e4ec0472a82562c1.url = (options?: RouteQueryOptions) => {
    return users4a47f1fc35ebf9b2e4ec0472a82562c1.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
users4a47f1fc35ebf9b2e4ec0472a82562c1.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users4a47f1fc35ebf9b2e4ec0472a82562c1.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
users4a47f1fc35ebf9b2e4ec0472a82562c1.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users4a47f1fc35ebf9b2e4ec0472a82562c1.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
    const users4a47f1fc35ebf9b2e4ec0472a82562c1Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users4a47f1fc35ebf9b2e4ec0472a82562c1.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
        users4a47f1fc35ebf9b2e4ec0472a82562c1Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users4a47f1fc35ebf9b2e4ec0472a82562c1.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/platform/users'
 */
        users4a47f1fc35ebf9b2e4ec0472a82562c1Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users4a47f1fc35ebf9b2e4ec0472a82562c1.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users4a47f1fc35ebf9b2e4ec0472a82562c1.form = users4a47f1fc35ebf9b2e4ec0472a82562c1Form

export const users = {
    '/users': users6e8299a085c11017e62ab420951fb27c,
    '/platform/users': users4a47f1fc35ebf9b2e4ec0472a82562c1,
}

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/users/{user}/toggle-status'
 */
const toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.url(args, options),
    method: 'patch',
})

toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.definition = {
    methods: ["patch"],
    url: '/users/{user}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/users/{user}/toggle-status'
 */
toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/users/{user}/toggle-status'
 */
toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/users/{user}/toggle-status'
 */
    const toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964eForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/users/{user}/toggle-status'
 */
        toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964eForm.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e.form = toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964eForm
    /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/platform/users/{user}/toggle-status'
 */
const toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.url(args, options),
    method: 'patch',
})

toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.definition = {
    methods: ["patch"],
    url: '/platform/users/{user}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/platform/users/{user}/toggle-status'
 */
toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/platform/users/{user}/toggle-status'
 */
toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/platform/users/{user}/toggle-status'
 */
    const toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282fForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/platform/users/{user}/toggle-status'
 */
        toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282fForm.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f.form = toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282fForm

export const toggleUserStatus = {
    '/users/{user}/toggle-status': toggleUserStatus80284dd8ccce6bc822aaa4a22e5f964e,
    '/platform/users/{user}/toggle-status': toggleUserStatus3b6c8aa6d9f588f5b669a64105b8282f,
}

/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
 */
export const analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/platform/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
 */
analytics.url = (options?: RouteQueryOptions) => {
    return analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
 */
analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
 */
analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
 */
    const analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
 */
        analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::analytics
 * @see app/Http/Controllers/PlatformController.php:18
 * @route '/platform/analytics'
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
 * @route '/platform/shops'
 */
export const shops = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shops.url(options),
    method: 'get',
})

shops.definition = {
    methods: ["get","head"],
    url: '/platform/shops',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/platform/shops'
 */
shops.url = (options?: RouteQueryOptions) => {
    return shops.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/platform/shops'
 */
shops.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shops.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/platform/shops'
 */
shops.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shops.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/platform/shops'
 */
    const shopsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shops.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/platform/shops'
 */
        shopsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shops.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::shops
 * @see app/Http/Controllers/PlatformController.php:97
 * @route '/platform/shops'
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
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/platform/shops/{shop}/toggle-status'
 */
export const toggleShopStatus = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleShopStatus.url(args, options),
    method: 'patch',
})

toggleShopStatus.definition = {
    methods: ["patch"],
    url: '/platform/shops/{shop}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/platform/shops/{shop}/toggle-status'
 */
toggleShopStatus.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleShopStatus.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/platform/shops/{shop}/toggle-status'
 */
toggleShopStatus.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleShopStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/platform/shops/{shop}/toggle-status'
 */
    const toggleShopStatusForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleShopStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/platform/shops/{shop}/toggle-status'
 */
        toggleShopStatusForm.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleShopStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleShopStatus.form = toggleShopStatusForm
/**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/platform/admins'
 */
export const createAdmin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAdmin.url(options),
    method: 'post',
})

createAdmin.definition = {
    methods: ["post"],
    url: '/platform/admins',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/platform/admins'
 */
createAdmin.url = (options?: RouteQueryOptions) => {
    return createAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/platform/admins'
 */
createAdmin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAdmin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/platform/admins'
 */
    const createAdminForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createAdmin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/platform/admins'
 */
        createAdminForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createAdmin.url(options),
            method: 'post',
        })
    
    createAdmin.form = createAdminForm
/**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/platform/admins/{user}'
 */
export const deleteAdmin = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAdmin.url(args, options),
    method: 'delete',
})

deleteAdmin.definition = {
    methods: ["delete"],
    url: '/platform/admins/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/platform/admins/{user}'
 */
deleteAdmin.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteAdmin.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/platform/admins/{user}'
 */
deleteAdmin.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAdmin.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/platform/admins/{user}'
 */
    const deleteAdminForm = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteAdmin.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/platform/admins/{user}'
 */
        deleteAdminForm.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteAdmin.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteAdmin.form = deleteAdminForm
const PlatformController = { users, toggleUserStatus, analytics, shops, toggleShopStatus, createAdmin, deleteAdmin }

export default PlatformController