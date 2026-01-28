import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:110
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
 * @see app/Http/Controllers/ProductController.php:110
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
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/manage/shop/{publicId}/inventory'
 */
store.post = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/manage/shop/{publicId}/inventory'
 */
    const storeForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProductController::store
 * @see app/Http/Controllers/ProductController.php:110
 * @route '/manage/shop/{publicId}/inventory'
 */
        storeForm.post = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProductController::importMethod
 * @see app/Http/Controllers/ProductController.php:209
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
 * @see app/Http/Controllers/ProductController.php:209
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
 * @see app/Http/Controllers/ProductController.php:209
 * @route '/manage/shop/{publicId}/inventory/import'
 */
importMethod.post = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProductController::importMethod
 * @see app/Http/Controllers/ProductController.php:209
 * @route '/manage/shop/{publicId}/inventory/import'
 */
    const importMethodForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProductController::importMethod
 * @see app/Http/Controllers/ProductController.php:209
 * @route '/manage/shop/{publicId}/inventory/import'
 */
        importMethodForm.post = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(args, options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
/**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
export const template = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})

template.definition = {
    methods: ["get","head"],
    url: '/manage/shop/{publicId}/inventory/template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
template.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return template.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
template.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: template.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
template.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: template.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
    const templateForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: template.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
        templateForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProductController::template
 * @see app/Http/Controllers/ProductController.php:222
 * @route '/manage/shop/{publicId}/inventory/template'
 */
        templateForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: template.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    template.form = templateForm
/**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:154
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
 * @see app/Http/Controllers/ProductController.php:154
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
 * @see app/Http/Controllers/ProductController.php:154
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
update.put = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:154
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
    const updateForm = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProductController::update
 * @see app/Http/Controllers/ProductController.php:154
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
        updateForm.put = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:241
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
 * @see app/Http/Controllers/ProductController.php:241
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
 * @see app/Http/Controllers/ProductController.php:241
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
destroy.delete = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:241
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
    const destroyForm = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProductController::destroy
 * @see app/Http/Controllers/ProductController.php:241
 * @route '/manage/shop/{publicId}/inventory/{product}'
 */
        destroyForm.delete = (args: { publicId: string | number, product: number | { id: number } } | [publicId: string | number, product: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const inventory = {
    store: Object.assign(store, store),
import: Object.assign(importMethod, importMethod),
template: Object.assign(template, template),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default inventory