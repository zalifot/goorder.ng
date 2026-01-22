import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
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

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:72
 * @route '/manage/shop/{publicId}/inventory'
 */
export const index = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manage/shop/{publicId}/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:72
 * @route '/manage/shop/{publicId}/inventory'
 */
index.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:72
 * @route '/manage/shop/{publicId}/inventory'
 */
index.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::index
 * @see app/Http/Controllers/ProductController.php:72
 * @route '/manage/shop/{publicId}/inventory'
 */
index.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:104
 * @route '/manage/shop/{publicId}/inventory'
 */
export const store = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/manage/shop/{publicId}/inventory',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:104
 * @route '/manage/shop/{publicId}/inventory'
 */
store.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:104
 * @route '/manage/shop/{publicId}/inventory'
 */
store.post = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductController::importMethod
 * @see app/Http/Controllers/ProductController.php:201
 * @route '/manage/shop/{publicId}/inventory/import'
 */
export const importMethod = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/manage/shop/{publicId}/inventory/import',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProductController::importMethod
 * @see app/Http/Controllers/ProductController.php:201
 * @route '/manage/shop/{publicId}/inventory/import'
 */
importMethod.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return importMethod.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::importMethod
 * @see app/Http/Controllers/ProductController.php:201
 * @route '/manage/shop/{publicId}/inventory/import'
 */
importMethod.post = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProductController::downloadTemplate
 * @see app/Http/Controllers/ProductController.php:214
 * @route '/manage/shop/{publicId}/inventory/template'
 */
export const downloadTemplate = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(args, options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/manage/shop/{publicId}/inventory/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::downloadTemplate
 * @see app/Http/Controllers/ProductController.php:214
 * @route '/manage/shop/{publicId}/inventory/template'
 */
downloadTemplate.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return downloadTemplate.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::downloadTemplate
 * @see app/Http/Controllers/ProductController.php:214
 * @route '/manage/shop/{publicId}/inventory/template'
 */
downloadTemplate.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::downloadTemplate
 * @see app/Http/Controllers/ProductController.php:214
 * @route '/manage/shop/{publicId}/inventory/template'
 */
downloadTemplate.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
export const update = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/manage/shop/{publicId}/inventory/{product}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
update.url = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                    product: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                                product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                }

    return update.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:148
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
update.put = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:233
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
export const destroy = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/manage/shop/{publicId}/inventory/{product}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:233
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
destroy.url = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                    product: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                                product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                }

    return destroy.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:233
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
destroy.delete = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ProductController = { dashboard, index, store, importMethod, downloadTemplate, update, destroy, import: importMethod }

export default ProductController