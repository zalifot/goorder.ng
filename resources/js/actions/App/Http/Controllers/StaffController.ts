import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/manage/staff'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/manage/staff',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/manage/staff'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/manage/staff'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaffController::index
 * @see app/Http/Controllers/StaffController.php:19
 * @route '/manage/staff'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/manage/staff'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/manage/staff',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/manage/staff'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::store
 * @see app/Http/Controllers/StaffController.php:94
 * @route '/manage/staff'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/manage/staff/{staff}'
 */
export const update = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/manage/staff/{staff}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StaffController::update
 * @see app/Http/Controllers/StaffController.php:133
 * @route '/manage/staff/{staff}'
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
 * @route '/manage/staff/{staff}'
 */
update.put = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/manage/staff/{staff}'
 */
export const destroy = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/manage/staff/{staff}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StaffController::destroy
 * @see app/Http/Controllers/StaffController.php:175
 * @route '/manage/staff/{staff}'
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
 * @route '/manage/staff/{staff}'
 */
destroy.delete = (args: { staff: number | { id: number } } | [staff: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/manage/roles'
 */
export const rolesIndex = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rolesIndex.url(options),
    method: 'get',
})

rolesIndex.definition = {
    methods: ["get","head"],
    url: '/manage/roles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/manage/roles'
 */
rolesIndex.url = (options?: RouteQueryOptions) => {
    return rolesIndex.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/manage/roles'
 */
rolesIndex.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rolesIndex.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StaffController::rolesIndex
 * @see app/Http/Controllers/StaffController.php:69
 * @route '/manage/roles'
 */
rolesIndex.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rolesIndex.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:192
 * @route '/manage/roles'
 */
export const storeRole = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRole.url(options),
    method: 'post',
})

storeRole.definition = {
    methods: ["post"],
    url: '/manage/roles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:192
 * @route '/manage/roles'
 */
storeRole.url = (options?: RouteQueryOptions) => {
    return storeRole.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StaffController::storeRole
 * @see app/Http/Controllers/StaffController.php:192
 * @route '/manage/roles'
 */
storeRole.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeRole.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/manage/roles/{role}'
 */
export const updateRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

updateRole.definition = {
    methods: ["put"],
    url: '/manage/roles/{role}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\StaffController::updateRole
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/manage/roles/{role}'
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
 * @see app/Http/Controllers/StaffController.php:218
 * @route '/manage/roles/{role}'
 */
updateRole.put = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateRole.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:253
 * @route '/manage/roles/{role}'
 */
export const destroyRole = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyRole.url(args, options),
    method: 'delete',
})

destroyRole.definition = {
    methods: ["delete"],
    url: '/manage/roles/{role}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\StaffController::destroyRole
 * @see app/Http/Controllers/StaffController.php:253
 * @route '/manage/roles/{role}'
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
 * @see app/Http/Controllers/StaffController.php:253
 * @route '/manage/roles/{role}'
 */
destroyRole.delete = (args: { role: number | { id: number } } | [role: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyRole.url(args, options),
    method: 'delete',
})
const StaffController = { index, store, update, destroy, rolesIndex, storeRole, updateRole, destroyRole }

export default StaffController