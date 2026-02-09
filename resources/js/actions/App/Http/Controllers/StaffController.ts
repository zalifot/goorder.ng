import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
 * @see app/Http/Controllers/StaffController.php:134
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
 * @see app/Http/Controllers/StaffController.php:134
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
 * @see app/Http/Controllers/StaffController.php:134
 * @route '/vendor/manage/staff/{staff}'
 */
update.put = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:134
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
 * @see app/Http/Controllers/StaffController.php:134
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
 * @see app/Http/Controllers/StaffController.php:176
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
 * @see app/Http/Controllers/StaffController.php:176
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
 * @see app/Http/Controllers/StaffController.php:176
 * @route '/vendor/manage/staff/{staff}'
 */
destroy.delete = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:176
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
 * @see app/Http/Controllers/StaffController.php:176
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
/**
* @see \App\Http\Controllers\StaffController::resetPassword
 * @see app/Http/Controllers/StaffController.php:193
 * @route '/vendor/manage/staff/{staff}/reset-password'
 */
export const resetPassword = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.definition = {
    methods: ["post"],
    url: '/vendor/manage/staff/{staff}/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StaffController::resetPassword
 * @see app/Http/Controllers/StaffController.php:193
 * @route '/vendor/manage/staff/{staff}/reset-password'
 */
resetPassword.url = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return resetPassword.definition.url
            .replace('{staff}', parsedArgs.staff.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::resetPassword
 * @see app/Http/Controllers/StaffController.php:193
 * @route '/vendor/manage/staff/{staff}/reset-password'
 */
resetPassword.post = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StaffController::resetPassword
 * @see app/Http/Controllers/StaffController.php:193
 * @route '/vendor/manage/staff/{staff}/reset-password'
 */
    const resetPasswordForm = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resetPassword.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::resetPassword
 * @see app/Http/Controllers/StaffController.php:193
 * @route '/vendor/manage/staff/{staff}/reset-password'
 */
        resetPasswordForm.post = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resetPassword.url(args, options),
            method: 'post',
        })
    
    resetPassword.form = resetPasswordForm
/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
export const rolesIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rolesIndex.url(options),
    method: 'get',
})

rolesIndex.definition = {
    methods: ["get","head"],
    url: '/vendor/manage/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
rolesIndex.url = (options?: RouteQueryOptions) => {
    return rolesIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
rolesIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rolesIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
rolesIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rolesIndex.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
    const rolesIndexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rolesIndex.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
        rolesIndexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rolesIndex.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/vendor/manage/roles'
 */
        rolesIndexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rolesIndex.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rolesIndex.form = rolesIndexForm
/**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/vendor/manage/roles'
 */
export const storeRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRole.url(options),
    method: 'post',
})

storeRole.definition = {
    methods: ["post"],
    url: '/vendor/manage/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/vendor/manage/roles'
 */
storeRole.url = (options?: RouteQueryOptions) => {
    return storeRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/vendor/manage/roles'
 */
storeRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRole.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/vendor/manage/roles'
 */
    const storeRoleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeRole.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/vendor/manage/roles'
 */
        storeRoleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeRole.url(options),
            method: 'post',
        })
    
    storeRole.form = storeRoleForm
/**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:244
 * @route '/vendor/manage/roles/{role}'
 */
export const updateRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/vendor/manage/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:244
 * @route '/vendor/manage/roles/{role}'
 */
updateRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { role: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    role: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }

    return updateRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:244
 * @route '/vendor/manage/roles/{role}'
 */
updateRole.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:244
 * @route '/vendor/manage/roles/{role}'
 */
    const updateRoleForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateRole.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:244
 * @route '/vendor/manage/roles/{role}'
 */
        updateRoleForm.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateRole.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateRole.form = updateRoleForm
/**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:279
 * @route '/vendor/manage/roles/{role}'
 */
export const destroyRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyRole.url(args, options),
    method: 'delete',
})

destroyRole.definition = {
    methods: ["delete"],
    url: '/vendor/manage/roles/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:279
 * @route '/vendor/manage/roles/{role}'
 */
destroyRole.url = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { role: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { role: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    role: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        role: typeof args.role === 'object'
                ? args.role.id
                : args.role,
                }

    return destroyRole.definition.url
            .replace('{role}', parsedArgs.role.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:279
 * @route '/vendor/manage/roles/{role}'
 */
destroyRole.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyRole.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:279
 * @route '/vendor/manage/roles/{role}'
 */
    const destroyRoleForm = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyRole.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:279
 * @route '/vendor/manage/roles/{role}'
 */
        destroyRoleForm.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyRole.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyRole.form = destroyRoleForm
const StaffController = { index, store, update, destroy, resetPassword, rolesIndex, storeRole, updateRole, destroyRole }

export default StaffController