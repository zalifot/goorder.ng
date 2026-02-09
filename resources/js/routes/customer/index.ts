import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import ordersB47e5f from './orders'
import cartB8cf73 from './cart'
import checkoutFb28ab from './checkout'
/**
 * @see routes/web.php:197
 * @route '/customer-login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/customer-login',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:197
 * @route '/customer-login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:197
 * @route '/customer-login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:197
 * @route '/customer-login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:197
 * @route '/customer-login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:197
 * @route '/customer-login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:197
 * @route '/customer-login'
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
 * @see routes/web.php:234
 * @route '/customer-register'
 */
export const register = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})

register.definition = {
    methods: ["get","head"],
    url: '/customer-register',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:234
 * @route '/customer-register'
 */
register.url = (options?: RouteQueryOptions) => {
    return register.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:234
 * @route '/customer-register'
 */
register.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: register.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:234
 * @route '/customer-register'
 */
register.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: register.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:234
 * @route '/customer-register'
 */
    const registerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: register.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:234
 * @route '/customer-register'
 */
        registerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: register.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:234
 * @route '/customer-register'
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
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/customer/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CustomerController::dashboard
 * @see app/Http/Controllers/CustomerController.php:13
 * @route '/customer/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/customer/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::orders
 * @see app/Http/Controllers/OrderController.php:20
 * @route '/customer/orders'
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
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
 */
export const transactions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})

transactions.definition = {
    methods: ["get","head"],
    url: '/customer/transactions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
 */
transactions.url = (options?: RouteQueryOptions) => {
    return transactions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
 */
transactions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: transactions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
 */
transactions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: transactions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
 */
    const transactionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: transactions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
 */
        transactionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: transactions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::transactions
 * @see app/Http/Controllers/OrderController.php:120
 * @route '/customer/transactions'
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
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
export const cart = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})

cart.definition = {
    methods: ["get","head"],
    url: '/customer/cart',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
cart.url = (options?: RouteQueryOptions) => {
    return cart.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
cart.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cart.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
cart.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cart.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
    const cartForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cart.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
        cartForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cart.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CartController::cart
 * @see app/Http/Controllers/CartController.php:18
 * @route '/customer/cart'
 */
        cartForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cart.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cart.form = cartForm
/**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
export const checkout = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/customer/checkout',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
checkout.url = (options?: RouteQueryOptions) => {
    return checkout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
checkout.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
checkout.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
    const checkoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkout.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
        checkoutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\OrderController::checkout
 * @see app/Http/Controllers/OrderController.php:156
 * @route '/customer/checkout'
 */
        checkoutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkout.form = checkoutForm
const customer = {
    login: Object.assign(login, login),
register: Object.assign(register, register),
dashboard: Object.assign(dashboard, dashboard),
orders: Object.assign(orders, ordersB47e5f),
transactions: Object.assign(transactions, transactions),
cart: Object.assign(cart, cartB8cf73),
checkout: Object.assign(checkout, checkoutFb28ab),
}

export default customer