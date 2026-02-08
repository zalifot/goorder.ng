import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\GeneralCategoryController::store
 * @see app/Http/Controllers/GeneralCategoryController.php:31
 * @route '/vendor/general-categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/vendor/general-categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\GeneralCategoryController::store
 * @see app/Http/Controllers/GeneralCategoryController.php:31
 * @route '/vendor/general-categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GeneralCategoryController::store
 * @see app/Http/Controllers/GeneralCategoryController.php:31
 * @route '/vendor/general-categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\GeneralCategoryController::store
 * @see app/Http/Controllers/GeneralCategoryController.php:31
 * @route '/vendor/general-categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GeneralCategoryController::store
 * @see app/Http/Controllers/GeneralCategoryController.php:31
 * @route '/vendor/general-categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\GeneralCategoryController::update
 * @see app/Http/Controllers/GeneralCategoryController.php:64
 * @route '/vendor/general-categories/{generalCategory}'
 */
export const update = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/vendor/general-categories/{generalCategory}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\GeneralCategoryController::update
 * @see app/Http/Controllers/GeneralCategoryController.php:64
 * @route '/vendor/general-categories/{generalCategory}'
 */
update.url = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generalCategory: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { generalCategory: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    generalCategory: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generalCategory: typeof args.generalCategory === 'object'
                ? args.generalCategory.id
                : args.generalCategory,
                }

    return update.definition.url
            .replace('{generalCategory}', parsedArgs.generalCategory.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GeneralCategoryController::update
 * @see app/Http/Controllers/GeneralCategoryController.php:64
 * @route '/vendor/general-categories/{generalCategory}'
 */
update.put = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\GeneralCategoryController::update
 * @see app/Http/Controllers/GeneralCategoryController.php:64
 * @route '/vendor/general-categories/{generalCategory}'
 */
    const updateForm = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GeneralCategoryController::update
 * @see app/Http/Controllers/GeneralCategoryController.php:64
 * @route '/vendor/general-categories/{generalCategory}'
 */
        updateForm.put = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\GeneralCategoryController::toggleStatus
 * @see app/Http/Controllers/GeneralCategoryController.php:125
 * @route '/vendor/general-categories/{generalCategory}/toggle-status'
 */
export const toggleStatus = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

toggleStatus.definition = {
    methods: ["patch"],
    url: '/vendor/general-categories/{generalCategory}/toggle-status',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\GeneralCategoryController::toggleStatus
 * @see app/Http/Controllers/GeneralCategoryController.php:125
 * @route '/vendor/general-categories/{generalCategory}/toggle-status'
 */
toggleStatus.url = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generalCategory: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { generalCategory: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    generalCategory: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generalCategory: typeof args.generalCategory === 'object'
                ? args.generalCategory.id
                : args.generalCategory,
                }

    return toggleStatus.definition.url
            .replace('{generalCategory}', parsedArgs.generalCategory.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GeneralCategoryController::toggleStatus
 * @see app/Http/Controllers/GeneralCategoryController.php:125
 * @route '/vendor/general-categories/{generalCategory}/toggle-status'
 */
toggleStatus.patch = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: toggleStatus.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\GeneralCategoryController::toggleStatus
 * @see app/Http/Controllers/GeneralCategoryController.php:125
 * @route '/vendor/general-categories/{generalCategory}/toggle-status'
 */
    const toggleStatusForm = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GeneralCategoryController::toggleStatus
 * @see app/Http/Controllers/GeneralCategoryController.php:125
 * @route '/vendor/general-categories/{generalCategory}/toggle-status'
 */
        toggleStatusForm.patch = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
/**
* @see \App\Http\Controllers\GeneralCategoryController::destroy
 * @see app/Http/Controllers/GeneralCategoryController.php:109
 * @route '/vendor/general-categories/{generalCategory}'
 */
export const destroy = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/vendor/general-categories/{generalCategory}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\GeneralCategoryController::destroy
 * @see app/Http/Controllers/GeneralCategoryController.php:109
 * @route '/vendor/general-categories/{generalCategory}'
 */
destroy.url = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { generalCategory: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { generalCategory: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    generalCategory: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        generalCategory: typeof args.generalCategory === 'object'
                ? args.generalCategory.id
                : args.generalCategory,
                }

    return destroy.definition.url
            .replace('{generalCategory}', parsedArgs.generalCategory.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\GeneralCategoryController::destroy
 * @see app/Http/Controllers/GeneralCategoryController.php:109
 * @route '/vendor/general-categories/{generalCategory}'
 */
destroy.delete = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\GeneralCategoryController::destroy
 * @see app/Http/Controllers/GeneralCategoryController.php:109
 * @route '/vendor/general-categories/{generalCategory}'
 */
    const destroyForm = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\GeneralCategoryController::destroy
 * @see app/Http/Controllers/GeneralCategoryController.php:109
 * @route '/vendor/general-categories/{generalCategory}'
 */
        destroyForm.delete = (args: { generalCategory: number | { id: number } } | [generalCategory: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const generalCategories = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
toggleStatus: Object.assign(toggleStatus, toggleStatus),
destroy: Object.assign(destroy, destroy),
}

export default generalCategories