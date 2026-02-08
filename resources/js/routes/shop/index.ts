import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import inventoryEd84cf from './inventory'
/**
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
 */
export const show = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/shop/{publicId}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
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
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
 */
show.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
 */
show.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
 */
    const showForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
 */
        showForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:77
 * @route '/shop/{publicId}'
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
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
export const inventory = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventory.url(args, options),
    method: 'get',
})

inventory.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/shop/{publicId}/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
inventory.url = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return inventory.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
inventory.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
inventory.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inventory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
    const inventoryForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inventory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
        inventoryForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/vendor/manage/shop/{publicId}/inventory'
 */
        inventoryForm.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    inventory.form = inventoryForm
const shop = {
    show: Object.assign(show, show),
inventory: Object.assign(inventory, inventoryEd84cf),
}

export default shop