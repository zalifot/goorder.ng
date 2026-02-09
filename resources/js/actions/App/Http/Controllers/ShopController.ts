import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
export const allOrders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allOrders.url(options),
    method: 'get',
})

allOrders.definition = {
    methods: ["get","head"],
    url: '/vendor/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
allOrders.url = (options?: RouteQueryOptions) => {
    return allOrders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
allOrders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allOrders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
allOrders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allOrders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
    const allOrdersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: allOrders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
        allOrdersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allOrders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::allOrders
 * @see app/Http/Controllers/ShopController.php:426
 * @route '/vendor/orders'
 */
        allOrdersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allOrders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    allOrders.form = allOrdersForm
/**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
export const allTransactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTransactions.url(options),
    method: 'get',
})

allTransactions.definition = {
    methods: ["get","head"],
    url: '/vendor/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
allTransactions.url = (options?: RouteQueryOptions) => {
    return allTransactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
allTransactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: allTransactions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
allTransactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: allTransactions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
    const allTransactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: allTransactions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
        allTransactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allTransactions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::allTransactions
 * @see app/Http/Controllers/ShopController.php:462
 * @route '/vendor/transactions'
 */
        allTransactionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: allTransactions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    allTransactions.form = allTransactionsForm
/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:50
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
 * @see app/Http/Controllers/ShopController.php:50
 * @route '/vendor/shops'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:50
 * @route '/vendor/shops'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:50
 * @route '/vendor/shops'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:50
 * @route '/vendor/shops'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:50
 * @route '/vendor/shops'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::index
 * @see app/Http/Controllers/ShopController.php:50
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
 * @see app/Http/Controllers/ShopController.php:78
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
 * @see app/Http/Controllers/ShopController.php:78
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
 * @see app/Http/Controllers/ShopController.php:78
 * @route '/vendor/manage/shop/{publicId}'
 */
show.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:78
 * @route '/vendor/manage/shop/{publicId}'
 */
show.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:78
 * @route '/vendor/manage/shop/{publicId}'
 */
    const showForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:78
 * @route '/vendor/manage/shop/{publicId}'
 */
        showForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::show
 * @see app/Http/Controllers/ShopController.php:78
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
 * @see app/Http/Controllers/ShopController.php:248
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
 * @see app/Http/Controllers/ShopController.php:248
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
 * @see app/Http/Controllers/ShopController.php:248
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
analytics.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: analytics.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:248
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
analytics.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: analytics.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:248
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
    const analyticsForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: analytics.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:248
 * @route '/vendor/manage/shop/{publicId}/analytics'
 */
        analyticsForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: analytics.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::analytics
 * @see app/Http/Controllers/ShopController.php:248
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
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
export const shopOrders = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopOrders.url(args, options),
    method: 'get',
})

shopOrders.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
shopOrders.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return shopOrders.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
shopOrders.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopOrders.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
shopOrders.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shopOrders.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
    const shopOrdersForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shopOrders.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
        shopOrdersForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopOrders.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::shopOrders
 * @see app/Http/Controllers/ShopController.php:356
 * @route '/vendor/manage/shop/{publicId}/orders'
 */
        shopOrdersForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopOrders.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shopOrders.form = shopOrdersForm
/**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
export const shopTransactions = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopTransactions.url(args, options),
    method: 'get',
})

shopTransactions.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
shopTransactions.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return shopTransactions.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
shopTransactions.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shopTransactions.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
shopTransactions.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shopTransactions.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
    const shopTransactionsForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shopTransactions.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
        shopTransactionsForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopTransactions.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::shopTransactions
 * @see app/Http/Controllers/ShopController.php:393
 * @route '/vendor/manage/shop/{publicId}/transactions'
 */
        shopTransactionsForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shopTransactions.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shopTransactions.form = shopTransactionsForm
/**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:115
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
 * @see app/Http/Controllers/ShopController.php:115
 * @route '/vendor/shops'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:115
 * @route '/vendor/shops'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:115
 * @route '/vendor/shops'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::store
 * @see app/Http/Controllers/ShopController.php:115
 * @route '/vendor/shops'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:159
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
 * @see app/Http/Controllers/ShopController.php:159
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
 * @see app/Http/Controllers/ShopController.php:159
 * @route '/vendor/shops/{shop}'
 */
update.put = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ShopController::update
 * @see app/Http/Controllers/ShopController.php:159
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
 * @see app/Http/Controllers/ShopController.php:159
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
 * @see app/Http/Controllers/ShopController.php:222
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
 * @see app/Http/Controllers/ShopController.php:222
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
 * @see app/Http/Controllers/ShopController.php:222
 * @route '/vendor/shops/{shop}/toggle-active'
 */
toggleActive.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleActive.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ShopController::toggleActive
 * @see app/Http/Controllers/ShopController.php:222
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
 * @see app/Http/Controllers/ShopController.php:222
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
 * @see app/Http/Controllers/ShopController.php:235
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
 * @see app/Http/Controllers/ShopController.php:235
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
 * @see app/Http/Controllers/ShopController.php:235
 * @route '/vendor/shops/{shop}/toggle-construction'
 */
toggleConstruction.patch = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleConstruction.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ShopController::toggleConstruction
 * @see app/Http/Controllers/ShopController.php:235
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
 * @see app/Http/Controllers/ShopController.php:235
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
 * @see app/Http/Controllers/ShopController.php:209
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
 * @see app/Http/Controllers/ShopController.php:209
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
 * @see app/Http/Controllers/ShopController.php:209
 * @route '/vendor/shops/{shop}'
 */
destroy.delete = (args: { shop: number | { id: number } } | [shop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ShopController::destroy
 * @see app/Http/Controllers/ShopController.php:209
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
 * @see app/Http/Controllers/ShopController.php:209
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
const ShopController = { allOrders, allTransactions, index, show, analytics, shopOrders, shopTransactions, store, update, toggleActive, toggleConstruction, destroy }

export default ShopController