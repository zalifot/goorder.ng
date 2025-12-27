import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
 */
export const show = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/vendor/{publicId}',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
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
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
 */
show.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
 */
show.head = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
 */
    const showForm = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
 */
        showForm.get = (args: { publicId: string | number } | [publicId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:25
 * @route '/vendor/{publicId}'
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
const vendor = {
    show: Object.assign(show, show),
}

export default vendor