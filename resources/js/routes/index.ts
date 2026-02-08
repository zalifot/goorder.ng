import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
 * @see routes/web.php:263
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
 * @see routes/web.php:263
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:263
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
 * @see routes/web.php:263
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
 * @see routes/web.php:263
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
 * @see routes/web.php:26
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:26
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:26
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:26
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:26
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:26
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:26
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
export const privacyPolicy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacyPolicy.url(options),
    method: 'get',
})

privacyPolicy.definition = {
    methods: ["get","head"],
    url: '/privacy-policy',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
privacyPolicy.url = (options?: RouteQueryOptions) => {
    return privacyPolicy.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
privacyPolicy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacyPolicy.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
privacyPolicy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacyPolicy.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
    const privacyPolicyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacyPolicy.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
        privacyPolicyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacyPolicy.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:33
 * @route '/privacy-policy'
 */
        privacyPolicyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacyPolicy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacyPolicy.form = privacyPolicyForm
/**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
export const dataProtection = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataProtection.url(options),
    method: 'get',
})

dataProtection.definition = {
    methods: ["get","head"],
    url: '/data-protection',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
dataProtection.url = (options?: RouteQueryOptions) => {
    return dataProtection.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
dataProtection.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dataProtection.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
dataProtection.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dataProtection.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
    const dataProtectionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dataProtection.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
        dataProtectionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataProtection.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:37
 * @route '/data-protection'
 */
        dataProtectionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dataProtection.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dataProtection.form = dataProtectionForm
/**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
export const termsAndConditions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termsAndConditions.url(options),
    method: 'get',
})

termsAndConditions.definition = {
    methods: ["get","head"],
    url: '/terms-and-conditions',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
termsAndConditions.url = (options?: RouteQueryOptions) => {
    return termsAndConditions.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
termsAndConditions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: termsAndConditions.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
termsAndConditions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: termsAndConditions.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
    const termsAndConditionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: termsAndConditions.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
        termsAndConditionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: termsAndConditions.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:41
 * @route '/terms-and-conditions'
 */
        termsAndConditionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: termsAndConditions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    termsAndConditions.form = termsAndConditionsForm
/**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
export const marketplace = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: marketplace.url(options),
    method: 'get',
})

marketplace.definition = {
    methods: ["get","head"],
    url: '/marketplace',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
marketplace.url = (options?: RouteQueryOptions) => {
    return marketplace.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
marketplace.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: marketplace.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
marketplace.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: marketplace.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
    const marketplaceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: marketplace.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
        marketplaceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: marketplace.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:46
 * @route '/marketplace'
 */
        marketplaceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: marketplace.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    marketplace.form = marketplaceForm
/**
 * @see routes/web.php:204
 * @route '/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:204
 * @route '/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:204
 * @route '/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:204
 * @route '/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:204
 * @route '/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:204
 * @route '/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:204
 * @route '/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
 * @see routes/web.php:239
 * @route '/register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:239
 * @route '/register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:239
 * @route '/register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:239
 * @route '/register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:239
 * @route '/register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:239
 * @route '/register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:239
 * @route '/register'
 */
        registerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    register.form = registerForm
/**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
export const productCategories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productCategories.url(options),
    method: 'get',
})

productCategories.definition = {
    methods: ["get","head"],
    url: '/vendor/product-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
productCategories.url = (options?: RouteQueryOptions) => {
    return productCategories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
productCategories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: productCategories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
productCategories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: productCategories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
    const productCategoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: productCategories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
        productCategoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: productCategories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProductCategoryController::productCategories
 * @see app/Http/Controllers/ProductCategoryController.php:20
 * @route '/vendor/product-categories'
 */
        productCategoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: productCategories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    productCategories.form = productCategoriesForm
/**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
export const generalCategories = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generalCategories.url(options),
    method: 'get',
})

generalCategories.definition = {
    methods: ["get","head"],
    url: '/vendor/general-categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
generalCategories.url = (options?: RouteQueryOptions) => {
    return generalCategories.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
generalCategories.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generalCategories.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
generalCategories.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generalCategories.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
    const generalCategoriesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generalCategories.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
        generalCategoriesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generalCategories.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\GeneralCategoryController::generalCategories
 * @see app/Http/Controllers/GeneralCategoryController.php:20
 * @route '/vendor/general-categories'
 */
        generalCategoriesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generalCategories.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generalCategories.form = generalCategoriesForm
/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/vendor/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::orders
 * @see app/Http/Controllers/ShopController.php:378
 * @route '/vendor/orders'
 */
        ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
/**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
export const deliveryOptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deliveryOptions.url(options),
    method: 'get',
})

deliveryOptions.definition = {
    methods: ["get","head"],
    url: '/vendor/delivery-options',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
deliveryOptions.url = (options?: RouteQueryOptions) => {
    return deliveryOptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
deliveryOptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deliveryOptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
deliveryOptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: deliveryOptions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
    const deliveryOptionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: deliveryOptions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
        deliveryOptionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: deliveryOptions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DeliveryOptionController::deliveryOptions
 * @see app/Http/Controllers/DeliveryOptionController.php:15
 * @route '/vendor/delivery-options'
 */
        deliveryOptionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: deliveryOptions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    deliveryOptions.form = deliveryOptionsForm
/**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
export const integrations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: integrations.url(options),
    method: 'get',
})

integrations.definition = {
    methods: ["get","head"],
    url: '/vendor/integrations',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
integrations.url = (options?: RouteQueryOptions) => {
    return integrations.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
integrations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: integrations.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
integrations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: integrations.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
    const integrationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: integrations.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
        integrationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: integrations.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:332
 * @route '/vendor/integrations'
 */
        integrationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: integrations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    integrations.form = integrationsForm
/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
export const transactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/vendor/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
transactions.url = (options?: RouteQueryOptions) => {
    return transactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
transactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
transactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
    const transactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transactions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
        transactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ShopController::transactions
 * @see app/Http/Controllers/ShopController.php:414
 * @route '/vendor/transactions'
 */
        transactionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    transactions.form = transactionsForm
/**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
export const wallet = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wallet.url(options),
    method: 'get',
})

wallet.definition = {
    methods: ["get","head"],
    url: '/vendor/wallet',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
wallet.url = (options?: RouteQueryOptions) => {
    return wallet.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
wallet.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: wallet.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
wallet.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: wallet.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
    const walletForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: wallet.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
        walletForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: wallet.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:359
 * @route '/vendor/wallet'
 */
        walletForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: wallet.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    wallet.form = walletForm
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: '/vendor/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PlatformController::users
 * @see app/Http/Controllers/PlatformController.php:159
 * @route '/vendor/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
export const systems = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systems.url(options),
    method: 'get',
})

systems.definition = {
    methods: ["get","head"],
    url: '/vendor/systems',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
systems.url = (options?: RouteQueryOptions) => {
    return systems.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
systems.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: systems.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
systems.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: systems.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
    const systemsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: systems.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
        systemsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systems.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:366
 * @route '/vendor/systems'
 */
        systemsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: systems.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    systems.form = systemsForm