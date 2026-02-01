import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BarChart3, Bell, ChevronRight, Mail, MessageCircle, Package, Phone, Shield, Smartphone, Store, Truck, Users, Wallet, Zap } from 'lucide-react';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="GoOrder - Sell & Shop Locally">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl dark:bg-black/80 border-b border-gray-100 dark:border-gray-900">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                        <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            goorder<span className="text-emerald-600">.ng</span>
                        </Link>

                        <div className="hidden items-center gap-8 md:flex">
                            <a href="#vendors" className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                For Vendors
                            </a>
                            <Link href="/marketplace" className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                Marketplace
                            </Link>
                            <a href="#features" className="text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                Features
                            </a>
                        </div>

                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link href="/dashboard">
                                    <Button size="sm" className="rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/vendor-login" className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        Sign In
                                    </Link>
                                    {canRegister && (
                                        <Link href="/vendor-register">
                                            <Button size="sm" className="rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">
                                                Start Selling
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-emerald-950/20 dark:via-black dark:to-black" />
                    
                    {/* Decorative circles */}
                    <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/20" />
                    <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            <Zap className="h-4 w-4" />
                            Nigeria's Fastest Growing E-Commerce Platform
                        </div>

                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl dark:text-white">
                            Sell More.
                            <br />
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                                Shop Smarter.
                            </span>
                        </h1>

                        <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 md:text-xl dark:text-gray-400">
                            The all-in-one platform for Nigerian vendors to create beautiful online stores and for customers to discover amazing local products.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/vendor-register">
                                <Button size="lg" className="h-14 w-full rounded-full bg-gray-900 px-8 text-base font-medium hover:bg-gray-800 sm:w-auto dark:bg-white dark:text-black dark:hover:bg-gray-100">
                                    Start Your Store
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/marketplace">
                                <Button size="lg" variant="outline" className="h-14 w-full rounded-full border-gray-300 px-8 text-base font-medium sm:w-auto dark:border-gray-700">
                                    Shop as Customer
                                </Button>
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
                            No credit card required • Free to start • Setup in minutes
                        </p>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-gray-300 p-1.5 dark:border-gray-700">
                            <div className="h-2 w-1 animate-bounce rounded-full bg-gray-400 dark:bg-gray-600" />
                        </div>
                    </div>
                </section>

                {/* For Vendors Section */}
                <section id="vendors" className="bg-gray-50 py-28 dark:bg-gray-950">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-16 text-center">
                            <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                For Vendors
                            </span>
                            <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                                Your store, your rules
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                                Everything you need to start, run, and grow your online business in Nigeria.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Store className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Beautiful Storefront</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Get a professional online store with your unique link. Customize it to match your brand.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Package className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Easy Inventory</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Add products in seconds. Track stock, set prices, and manage categories effortlessly.
                                </p>
                            </div>

                            <div className="rounded-3xl bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900">
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                    <Truck className="h-7 w-7 text-gray-500 dark:text-gray-400" />
                                </div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">Delivery Options</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Set up delivery zones, time slots, and pricing. Your customers choose what works for them.
                                </p>
                            </div>
                        </div>

                        <div className="mt-14 text-center">
                            <Link href="/vendor-register" className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-medium text-white transition hover:bg-emerald-700">
                                <span>Create your store for free</span>
                                <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </section>

                // ...existing code...

                {/* Features Section */}
                <section id="features" className="bg-gray-900 py-28 dark:bg-black">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                                Built for Nigeria
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-400">
                                Designed with the Nigerian market in mind. Local payments, local delivery, local success.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { title: 'Naira Payments', desc: 'Accept payments in NGN', icon: Wallet },
                                { title: 'WhatsApp Integration', desc: 'Connect with customers', icon: MessageCircle },
                                { title: 'Multi-Shop', desc: 'Run multiple stores', icon: Store },
                                { title: 'Analytics', desc: 'Track your growth', icon: BarChart3 },
                                { title: 'Staff Management', desc: 'Add team members', icon: Users },
                                { title: 'Inventory Alerts', desc: 'Never run out of stock', icon: Bell },
                                { title: 'Custom Delivery', desc: 'Set your own zones', icon: Truck },
                                { title: 'Mobile Ready', desc: 'Works on any device', icon: Smartphone },
                            ].map((feature, i) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={i} className="rounded-2xl border border-gray-800 bg-gray-800/50 p-6 text-center transition hover:border-gray-700 hover:bg-gray-800">
                                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
                                            <Icon className="h-6 w-6 text-gray-300" />
                                        </div>
                                        <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
                                        <p className="text-sm text-gray-400">{feature.desc}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-28">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
                            Ready to get started?
                        </h2>
                        <p className="mb-12 text-lg text-gray-600 dark:text-gray-400">
                            Join thousands of Nigerian businesses already growing with GoOrder.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link href="/vendor-register">
                                <Button size="lg" className="h-14 w-full rounded-full bg-emerald-600 px-10 text-base font-medium hover:bg-emerald-700 sm:w-auto">
                                    Start Selling Today
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/marketplace">
                                <Button size="lg" variant="outline" className="h-14 w-full rounded-full border-gray-300 px-10 text-base font-medium sm:w-auto dark:border-gray-700">
                                    Shop as Customer
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto max-w-6xl px-6">
                        {/* Footer Grid */}
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Company Info */}
                            <div>
                                <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    goorder<span className="text-emerald-600">.ng</span>
                                </Link>
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                    Empowering Nigerian Commerce. The all-in-one platform for vendors to sell and customers to discover amazing local products.
                                </p>
                                <div className="mt-6 space-y-3">
                                    <a href="mailto:hello@goorder.ng" className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                        <Mail className="h-4 w-4" />
                                        hello@goorder.ng
                                    </a>
                                    <a href="tel:+2348000000000" className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                        <Phone className="h-4 w-4" />
                                        +234 800 000 0000
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Quick Links</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/marketplace" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Marketplace</Link>
                                    </li>
                                    <li>
                                        <a href="#vendors" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">For Vendors</a>
                                    </li>
                                    <li>
                                        <a href="#features" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Features</a>
                                    </li>
                                    <li>
                                        <Link href="/vendor-register" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Start Selling</Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Support</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/vendor-login" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Vendor Login</Link>
                                    </li>
                                    <li>
                                        <Link href="/login" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Customer Login</Link>
                                    </li>
                                    <li>
                                        <a href="mailto:support@goorder.ng" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Help Center</a>
                                    </li>
                                    <li>
                                        <a href="mailto:support@goorder.ng" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Contact Us</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Legal</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/privacy-policy" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/data-protection" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Data Protection</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-and-conditions" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
                            <p className="text-center text-sm text-gray-500 dark:text-gray-500">
                                © {new Date().getFullYear()} GoOrder Nigeria. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
