import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Mail, MapPin, Phone, Search, Store } from 'lucide-react';
import { useState } from 'react';

interface Shop {
    id: number;
    public_id: string;
    name: string;
    slug: string;
    country_code: string | null;
    state_code: string | null;
    image: string | null;
    image_url: string | null;
}

interface Props {
    shops: Shop[];
    canRegister?: boolean;
}

export default function Marketplace({ shops, canRegister = true }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredShops = shops.filter((shop) =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.state_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.country_code?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Marketplace - Discover Local Shops">
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
                            {auth.user ? (
                                <Link href={auth.user.role === 'user' ? '/customer/dashboard' : '/vendor/dashboard'}>
                                    <Button size="sm" className="rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/customer-login" className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        Sign In
                                    </Link>
                                    {canRegister && (
                                        <Link href="/customer-register">
                                            <Button size="sm" className="rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">
                                                Start Shopping
                                            </Button>
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden px-6 pt-28 pb-16">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-black dark:to-black" />
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl dark:bg-blue-900/20" />
                    <div className="absolute top-0 right-1/4 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-900/20" />

                    <div className="relative z-10 mx-auto max-w-4xl text-center">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            <Store className="h-4 w-4 text-black" />
                            <span  className=" text-black">Explore Local Shops</span>
                        </div>

                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                            Discover Amazing
                            <br />
                            Local Products
                        </h1>

                        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                            Browse verified Nigerian vendors and find quality products from local businesses near you.
                        </p>

                        {/* Search Bar */}
                        <div className="mx-auto max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Search shops by name, state, or country..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 rounded-full border-gray-200 pl-12 pr-4 text-base shadow-sm focus:border-emerald-500 focus:ring-emerald-500 dark:border-gray-700"
                                />
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
                            {filteredShops.length} {filteredShops.length === 1 ? 'shop' : 'shops'} available
                        </p>
                    </div>
                </section>

                {/* Shops Grid */}
                <section className="pb-20 px-6">
                    <div className="mx-auto max-w-6xl">
                        {filteredShops.length === 0 ? (
                            <div className="py-20 text-center">
                                <Store className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No shops found</h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400">
                                    {searchQuery ? 'Try adjusting your search terms' : 'Check back later for new shops'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
                                {filteredShops.map((shop) => (
                                    <Link
                                        key={shop.id}
                                        href={`/shop/${shop.public_id}`}
                                        className="group flex h-52 sm:h-64 flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        {/* Shop Image */}
                                        <div className="relative h-28 sm:h-36 flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                                            {shop.image_url ? (
                                                <img
                                                    src={shop.image_url}
                                                    alt={shop.name}
                                                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <Store className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Shop Info */}
                                        <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
                                            <div className="flex items-start justify-between gap-1 sm:gap-2">
                                                <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                                    {shop.name}
                                                </h3>
                                                <ArrowRight className="hidden sm:block h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
                                            </div>

                                            {(shop.state_code || shop.country_code) && (
                                                <div className="mt-1 sm:mt-2 flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                                                    <span className="truncate">
                                                        {[shop.state_code, shop.country_code].filter(Boolean).join(', ')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="border-t border-gray-100 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            Want to sell on GoOrder?
                        </h2>
                        <p className="mb-8 text-gray-600 dark:text-gray-400">
                            Join thousands of Nigerian vendors already growing their business with us.
                        </p>
                        <Link href="/vendor-register">
                            <Button size="lg" className="rounded-full bg-emerald-600 px-8 hover:bg-emerald-700">
                                Start Selling Today
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
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
                                        <Link href="/#vendors" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">For Vendors</Link>
                                    </li>
                                    <li>
                                        <Link href="/#features" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Features</Link>
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
                                        <Link href="/customer-login" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Customer Login</Link>
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
