import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ShopController::updateStatus
 * @see app/Http/Controllers/ShopController.php:404
 * @route '/vendor/manage/shop/{publicId}/orders/{order}/status'
 */
export const updateStatus = (args: { publicId: string | number, order: number | { id: number } } | [publicId: string | number, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

updateStatus.definition = {
    methods: ["patch"],
    url: '/vendor/manage/shop/{publicId}/orders/{order}/status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ShopController::updateStatus
 * @see app/Http/Controllers/ShopController.php:404
 * @route '/vendor/manage/shop/{publicId}/orders/{order}/status'
 */
updateStatus.url = (args: { publicId: string | number, order: number | { id: number } } | [publicId: string | number, order: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    publicId: args[0],
                    order: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        publicId: args.publicId,
                                order: typeof args.order === 'object'
                ? args.order.id
                : args.order,
                }

    return updateStatus.definition.url
            .replace('{publicId}', parsedArgs.publicId.toString())
            .replace('{order}', parsedArgs.order.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::updateStatus
 * @see app/Http/Controllers/ShopController.php:404
 * @route '/vendor/manage/shop/{publicId}/orders/{order}/status'
 */
updateStatus.patch = (args: { publicId: string | number, order: number | { id: number } } | [publicId: string | number, order: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ShopController::updateStatus
 * @see app/Http/Controllers/ShopController.php:404
 * @route '/vendor/manage/shop/{publicId}/orders/{order}/status'
 */
    const updateStatusForm = (args: { publicId: string | number, order: number | { id: number } } | [publicId: string | number, order: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ShopController::updateStatus
 * @see app/Http/Controllers/ShopController.php:404
 * @route '/vendor/manage/shop/{publicId}/orders/{order}/status'
 */
        updateStatusForm.patch = (args: { publicId: string | number, order: number | { id: number } } | [publicId: string | number, order: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
const orders = {
    updateStatus: Object.assign(updateStatus, updateStatus),
}

export default orders