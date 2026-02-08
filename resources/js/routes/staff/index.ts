import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/staff',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/vendor/manage/staff'
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
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/vendor/manage/staff'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vendor/manage/staff',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/vendor/manage/staff'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/vendor/manage/staff'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/vendor/manage/staff'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/vendor/manage/staff'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/vendor/manage/staff/{staff}'
 */
export const update = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/vendor/manage/staff/{staff}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/vendor/manage/staff/{staff}'
 */
update.url = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { staff: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { staff: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    staff: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        staff: typeof args.staff === 'object'
                ? args.staff.id
                : args.staff,
                }

    return update.definition.url
            .replace('{staff}', parsedArgs.staff.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/vendor/manage/staff/{staff}'
 */
update.put = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/vendor/manage/staff/{staff}'
 */
    const updateForm = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/vendor/manage/staff/{staff}'
 */
        updateForm.put = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/vendor/manage/staff/{staff}'
 */
export const destroy = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/vendor/manage/staff/{staff}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/vendor/manage/staff/{staff}'
 */
destroy.url = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { staff: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { staff: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    staff: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        staff: typeof args.staff === 'object'
                ? args.staff.id
                : args.staff,
                }

    return destroy.definition.url
            .replace('{staff}', parsedArgs.staff.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/vendor/manage/staff/{staff}'
 */
destroy.delete = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/vendor/manage/staff/{staff}'
 */
    const destroyForm = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/vendor/manage/staff/{staff}'
 */
        destroyForm.delete = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const staff = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default staff