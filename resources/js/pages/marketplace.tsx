import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, MapPin, Package, Search, Store } from 'lucide-react';
import { useState } from 'react';

interface Shop {
    id: number;
    public_id: string;
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    image: string | null;
    image_url: string | null;
    products_count: number;
    user?: {
        username: string;
    };
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
        shop.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.address?.toLowerCase().includes(searchQuery.toLowerCase())
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
                                <Link href={auth.user.role === 'user' ? '/user-dashboard' : '/dashboard'}>
                                    <Button size="sm" className="rounded-full bg-emerald-600 px-5 hover:bg-emerald-700">
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                        Sign In
                                    </Link>
                                    {canRegister && (
                                        <Link href="/register">
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
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            <Store className="h-4 w-4" />
                            Explore Local Shops
                        </div>

                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                            Discover Amazing
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                                Local Products
                            </span>
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
                                    placeholder="Search shops by name, description, or location..."
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
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredShops.map((shop) => (
                                    <Link
                                        key={shop.id}
                                        href={`/vendor/${shop.public_id}`}
                                        className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        {/* Shop Image */}
                                        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
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
                                        <div className="p-5">
                                            <div className="mb-3 flex items-start justify-between">
                                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                                    {shop.name}
                                                </h3>
                                                <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
                                            </div>

                                            {shop.description && (
                                                <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {shop.description}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1.5">
                                                    <Package className="h-4 w-4" />
                                                    {shop.products_count} {shop.products_count === 1 ? 'product' : 'products'}
                                                </span>
                                                {shop.address && (
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        {shop.address}
                                                    </span>
                                                )}
                                            </div>
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
                <footer className="border-t border-gray-200 py-12 dark:border-gray-800">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="text-center md:text-left">
                                <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    goorder<span className="text-emerald-600">.ng</span>
                                </Link>
                                <p className="mt-1 text-sm text-gray-500">
                                    Empowering Nigerian Commerce
                                </p>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                                <Link href="/#vendors" className="transition hover:text-gray-900 dark:hover:text-white">For Vendors</Link>
                                <Link href="/marketplace" className="transition hover:text-gray-900 dark:hover:text-white">Marketplace</Link>
                                <Link href="/#features" className="transition hover:text-gray-900 dark:hover:text-white">Features</Link>
                            </div>

                            <div className="text-sm text-gray-500">
                                © {new Date().getFullYear()} GoOrder. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
