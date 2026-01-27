import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ChevronRight, Store, Shield, Truck, Users } from 'lucide-react';

export default function CustomerLanding() {
    return (
        <>
            <Head title="For Customers - Shop Local, Delivered Fast" />
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl dark:bg-black/80 border-b border-gray-100 dark:border-gray-900">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                    <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        goorder<span className="text-emerald-600">.ng</span>
                    </Link>
                    <div className="hidden items-center gap-8 md:flex">
                        <Link href="/#vendors" className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            For Vendors
                        </Link>
                        <Link href="/marketplace" className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            Marketplace
                        </Link>
                        <Link href="/#features" className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Features
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            Sign In
                        </Link>
                        <Link href="/register">
                            <Button size="sm" className="rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="min-h-screen bg-white dark:bg-black pt-24" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <section className="py-28">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-16 text-center">
                            <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                For Customers
                            </span>
                            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                                Shop local, delivered fast
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                                Discover amazing products from Nigerian vendors. Order with confidence.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="flex items-start gap-5 rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                                    <Store className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Browse Local Shops
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Find verified vendors selling quality products near you. Each shop has its own unique storefront.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                                    <Shield className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Shop with Confidence
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Secure checkout, order tracking, and customer protection on every purchase.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                                    <Truck className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Flexible Delivery
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Choose your preferred delivery time and location. Track your order in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 rounded-3xl bg-gray-50 p-8 dark:bg-gray-900">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800">
                                    <Users className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Support Local Business
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Every purchase supports Nigerian entrepreneurs. Be part of the local commerce movement.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-14 text-center flex flex-col items-center gap-4">
                            <Link href="/register" className="group inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-8 py-4 font-medium text-gray-900 transition hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
                                <span>Create a customer account</span>
                                <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
                            </Link>
                            <span className="text-gray-500 dark:text-gray-400">or</span>
                            <Link href="/login" className="group inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 px-8 py-4 font-medium text-emerald-600 transition hover:bg-emerald-600 hover:text-white dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-black">
                                <span>Login as customer</span>
                                <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
