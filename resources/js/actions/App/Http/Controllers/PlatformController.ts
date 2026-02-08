import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
const usersef7f0983f1006e5fcf50e3218c9e5d56 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usersef7f0983f1006e5fcf50e3218c9e5d56.url(options),
    method: 'get',
})

usersef7f0983f1006e5fcf50e3218c9e5d56.definition = {
    methods: ["get","head"],
    url: '/vendor/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
usersef7f0983f1006e5fcf50e3218c9e5d56.url = (options?: RouteQueryOptions) => {
    return usersef7f0983f1006e5fcf50e3218c9e5d56.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
usersef7f0983f1006e5fcf50e3218c9e5d56.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: usersef7f0983f1006e5fcf50e3218c9e5d56.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
usersef7f0983f1006e5fcf50e3218c9e5d56.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: usersef7f0983f1006e5fcf50e3218c9e5d56.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
    const usersef7f0983f1006e5fcf50e3218c9e5d56Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: usersef7f0983f1006e5fcf50e3218c9e5d56.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
        usersef7f0983f1006e5fcf50e3218c9e5d56Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usersef7f0983f1006e5fcf50e3218c9e5d56.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
        usersef7f0983f1006e5fcf50e3218c9e5d56Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: usersef7f0983f1006e5fcf50e3218c9e5d56.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    usersef7f0983f1006e5fcf50e3218c9e5d56.form = usersef7f0983f1006e5fcf50e3218c9e5d56Form
    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
const users5dca7613bd768e171579cb71b8678140 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users5dca7613bd768e171579cb71b8678140.url(options),
    method: 'get',
})

users5dca7613bd768e171579cb71b8678140.definition = {
    methods: ["get","head"],
    url: '/vendor/platform/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
users5dca7613bd768e171579cb71b8678140.url = (options?: RouteQueryOptions) => {
    return users5dca7613bd768e171579cb71b8678140.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
users5dca7613bd768e171579cb71b8678140.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users5dca7613bd768e171579cb71b8678140.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
users5dca7613bd768e171579cb71b8678140.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users5dca7613bd768e171579cb71b8678140.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
    const users5dca7613bd768e171579cb71b8678140Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users5dca7613bd768e171579cb71b8678140.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
        users5dca7613bd768e171579cb71b8678140Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users5dca7613bd768e171579cb71b8678140.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/platform/users'
 */
        users5dca7613bd768e171579cb71b8678140Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users5dca7613bd768e171579cb71b8678140.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users5dca7613bd768e171579cb71b8678140.form = users5dca7613bd768e171579cb71b8678140Form

export const users = {
    '/vendor/users': usersef7f0983f1006e5fcf50e3218c9e5d56,
    '/vendor/platform/users': users5dca7613bd768e171579cb71b8678140,
}

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/users/{user}/toggle-status'
 */
const toggleUserStatus25985e08f1f628f536cee3467c6c01b4 = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus25985e08f1f628f536cee3467c6c01b4.url(args, options),
    method: 'patch',
})

toggleUserStatus25985e08f1f628f536cee3467c6c01b4.definition = {
    methods: ["patch"],
    url: '/vendor/users/{user}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/users/{user}/toggle-status'
 */
toggleUserStatus25985e08f1f628f536cee3467c6c01b4.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleUserStatus25985e08f1f628f536cee3467c6c01b4.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/users/{user}/toggle-status'
 */
toggleUserStatus25985e08f1f628f536cee3467c6c01b4.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus25985e08f1f628f536cee3467c6c01b4.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/users/{user}/toggle-status'
 */
    const toggleUserStatus25985e08f1f628f536cee3467c6c01b4Form = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleUserStatus25985e08f1f628f536cee3467c6c01b4.url(args, {
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
 * @route '/vendor/users/{user}/toggle-status'
 */
        toggleUserStatus25985e08f1f628f536cee3467c6c01b4Form.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleUserStatus25985e08f1f628f536cee3467c6c01b4.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleUserStatus25985e08f1f628f536cee3467c6c01b4.form = toggleUserStatus25985e08f1f628f536cee3467c6c01b4Form
    /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/platform/users/{user}/toggle-status'
 */
const toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987 = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.url(args, options),
    method: 'patch',
})

toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.definition = {
    methods: ["patch"],
    url: '/vendor/platform/users/{user}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/platform/users/{user}/toggle-status'
 */
toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.url = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/platform/users/{user}/toggle-status'
 */
toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlatformController::toggleUserStatus
 * @see app/Http/Controllers/PlatformController.php:209
 * @route '/vendor/platform/users/{user}/toggle-status'
 */
    const toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987Form = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.url(args, {
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
 * @route '/vendor/platform/users/{user}/toggle-status'
 */
        toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987Form.patch = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987.form = toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987Form

export const toggleUserStatus = {
    '/vendor/users/{user}/toggle-status': toggleUserStatus25985e08f1f628f536cee3467c6c01b4,
    '/vendor/platform/users/{user}/toggle-status': toggleUserStatus93e55dd5d6bf485c4fb8e53c9d0e4987,
}

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
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/vendor/platform/shops/{shop}/toggle-status'
 */
export const toggleShopStatus = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleShopStatus.url(args, options),
    method: 'patch',
})

toggleShopStatus.definition = {
    methods: ["patch"],
    url: '/vendor/platform/shops/{shop}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/vendor/platform/shops/{shop}/toggle-status'
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
 * @route '/vendor/platform/shops/{shop}/toggle-status'
 */
toggleShopStatus.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleShopStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PlatformController::toggleShopStatus
 * @see app/Http/Controllers/PlatformController.php:143
 * @route '/vendor/platform/shops/{shop}/toggle-status'
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
 * @route '/vendor/platform/shops/{shop}/toggle-status'
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
 * @route '/vendor/platform/admins'
 */
export const createAdmin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAdmin.url(options),
    method: 'post',
})

createAdmin.definition = {
    methods: ["post"],
    url: '/vendor/platform/admins',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
createAdmin.url = (options?: RouteQueryOptions) => {
    return createAdmin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
createAdmin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createAdmin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
    const createAdminForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: createAdmin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PlatformController::createAdmin
 * @see app/Http/Controllers/PlatformController.php:236
 * @route '/vendor/platform/admins'
 */
        createAdminForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: createAdmin.url(options),
            method: 'post',
        })
    
    createAdmin.form = createAdminForm
/**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
 */
export const deleteAdmin = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAdmin.url(args, options),
    method: 'delete',
})

deleteAdmin.definition = {
    methods: ["delete"],
    url: '/vendor/platform/admins/{user}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
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
 * @route '/vendor/platform/admins/{user}'
 */
deleteAdmin.delete = (args: { user: string | number } | [user: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteAdmin.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PlatformController::deleteAdmin
 * @see app/Http/Controllers/PlatformController.php:264
 * @route '/vendor/platform/admins/{user}'
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
 * @route '/vendor/platform/admins/{user}'
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