import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/vendor/shops',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:49
 * @route '/vendor/shops'
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
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
export const show = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
show.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publicId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                }

    return show.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
show.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
show.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
    const showForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
        showForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:77
 * @route '/vendor/manage/shop/{publicId}'
 */
        showForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
export const analytics = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(args, options),
    method: 'get',
})

analytics.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}/analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
analytics.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publicId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                }

    return analytics.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
analytics.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
analytics.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
    const analyticsForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
        analyticsForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:247
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
        analyticsForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    analytics.form = analyticsForm
/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
export const orders = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(args, options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
orders.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publicId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                }

    return orders.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
orders.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
orders.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
    const ordersForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
        ordersForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:336
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
        ordersForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
export const transactions = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(args, options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
transactions.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { publicId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                }

    return transactions.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
transactions.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
transactions.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
    const transactionsForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transactions.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
        transactionsForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:373
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
        transactionsForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transactions.form = transactionsForm
/**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:114
 * @route '/vendor/shops'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vendor/shops',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:114
 * @route '/vendor/shops'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:114
 * @route '/vendor/shops'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:114
 * @route '/vendor/shops'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:114
 * @route '/vendor/shops'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:158
 * @route '/vendor/shops/{shop}'
 */
export const update = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/vendor/shops/{shop}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:158
 * @route '/vendor/shops/{shop}'
 */
update.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:158
 * @route '/vendor/shops/{shop}'
 */
update.put = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:158
 * @route '/vendor/shops/{shop}'
 */
    const updateForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:158
 * @route '/vendor/shops/{shop}'
 */
        updateForm.put = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ShopController::toggleActive
 * @see app/Http/Controllers/ShopController.php:221
 * @route '/vendor/shops/{shop}/toggle-active'
 */
export const toggleActive = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

toggleActive.definition = {
    methods: ["patch"],
    url: '/vendor/shops/{shop}/toggle-active',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ShopController::toggleActive
 * @see app/Http/Controllers/ShopController.php:221
 * @route '/vendor/shops/{shop}/toggle-active'
 */
toggleActive.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleActive.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::toggleActive
 * @see app/Http/Controllers/ShopController.php:221
 * @route '/vendor/shops/{shop}/toggle-active'
 */
toggleActive.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ShopController::toggleActive
 * @see app/Http/Controllers/ShopController.php:221
 * @route '/vendor/shops/{shop}/toggle-active'
 */
    const toggleActiveForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleActive.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::toggleActive
 * @see app/Http/Controllers/ShopController.php:221
 * @route '/vendor/shops/{shop}/toggle-active'
 */
        toggleActiveForm.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleActive.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleActive.form = toggleActiveForm
/**
* @see \App\Http\Controllers\ShopController::toggleConstruction
 * @see app/Http/Controllers/ShopController.php:234
 * @route '/vendor/shops/{shop}/toggle-construction'
 */
export const toggleConstruction = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleConstruction.url(args, options),
    method: 'patch',
})

toggleConstruction.definition = {
    methods: ["patch"],
    url: '/vendor/shops/{shop}/toggle-construction',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ShopController::toggleConstruction
 * @see app/Http/Controllers/ShopController.php:234
 * @route '/vendor/shops/{shop}/toggle-construction'
 */
toggleConstruction.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleConstruction.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::toggleConstruction
 * @see app/Http/Controllers/ShopController.php:234
 * @route '/vendor/shops/{shop}/toggle-construction'
 */
toggleConstruction.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleConstruction.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ShopController::toggleConstruction
 * @see app/Http/Controllers/ShopController.php:234
 * @route '/vendor/shops/{shop}/toggle-construction'
 */
    const toggleConstructionForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleConstruction.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::toggleConstruction
 * @see app/Http/Controllers/ShopController.php:234
 * @route '/vendor/shops/{shop}/toggle-construction'
 */
        toggleConstructionForm.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleConstruction.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleConstruction.form = toggleConstructionForm
/**
* @see \App\Http\Controllers\ShopController::destroy
 * @see app/Http/Controllers/ShopController.php:208
 * @route '/vendor/shops/{shop}'
 */
export const destroy = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/vendor/shops/{shop}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ShopController::destroy
 * @see app/Http/Controllers/ShopController.php:208
 * @route '/vendor/shops/{shop}'
 */
destroy.url = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{shop}', parsedArgs.shop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::destroy
 * @see app/Http/Controllers/ShopController.php:208
 * @route '/vendor/shops/{shop}'
 */
destroy.delete = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ShopController::destroy
 * @see app/Http/Controllers/ShopController.php:208
 * @route '/vendor/shops/{shop}'
 */
    const destroyForm = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::destroy
 * @see app/Http/Controllers/ShopController.php:208
 * @route '/vendor/shops/{shop}'
 */
        destroyForm.delete = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const shops = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
analytics: Object.assign(analytics, analytics),
orders: Object.assign(orders, orders),
transactions: Object.assign(transactions, transactions),
store: Object.assign(store, store),
update: Object.assign(update, update),
toggleActive: Object.assign(toggleActive, toggleActive),
toggleConstruction: Object.assign(toggleConstruction, toggleConstruction),
destroy: Object.assign(destroy, destroy),
}

export default shops