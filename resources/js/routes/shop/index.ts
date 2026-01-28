import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import inventoryEd84cf from './inventory'
/**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/manage/shop/{publicId}/inventory'
 */
export const inventory = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventory.url(args, options),
    method: 'get',
})

inventory.definition = {
    methods: ["get","head"],
    url: '/manage/shop/{publicId}/inventory',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/manage/shop/{publicId}/inventory'
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
 * @route '/manage/shop/{publicId}/inventory'
 */
inventory.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inventory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/manage/shop/{publicId}/inventory'
 */
inventory.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inventory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/manage/shop/{publicId}/inventory'
 */
    const inventoryForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inventory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/manage/shop/{publicId}/inventory'
 */
        inventoryForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inventory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProductController::inventory
 * @see app/Http/Controllers/ProductController.php:78
 * @route '/manage/shop/{publicId}/inventory'
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
    inventory: Object.assign(inventory, inventoryEd84cf),
}

export default shop