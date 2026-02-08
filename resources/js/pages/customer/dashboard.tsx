import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Clock, Package, ShoppingCart, Store, Wallet } from 'lucide-react';

interface Stats {
    total_orders: number;
    pending_orders: number;
    completed_orders: number;
    total_spent: number;
    this_month_spent: number;
    cart_item_count: number;
}

interface Order {
    id: number;
    order_number: string;
    shop_id: number;
    total: number;
    status: string;
    created_at: string;
    shop?: {
        id: number;
        name: string;
        public_id: string;
        image_url?: string;
    };
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/customer/dashboard',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount);
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'cancelled':
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
}

export default function CustomerDashboard({ stats, recentOrders }: Props) {
    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Ads Banner */}
                <div className="relative flex h-28 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-900/30">
                    <span className="absolute right-3 top-2 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                        Advertisement
                    </span>
                    <p className="text-sm text-gray-400">Ad space</p>
                </div>

                {/* Welcome Header */}
                <div>
                    <h1 className="text-lg font-semibold">Welcome back!</h1>
                    <p className="text-xs text-muted-foreground">
                        Track your orders, manage your cart, and discover new products from your favorite shops.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground flex items-center gap-1.5">
                                <Package className="h-3.5 w-3.5" />
                                Total Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_orders}</p>
                            <p className="text-xs text-muted-foreground">{stats.pending_orders} pending</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground flex items-center gap-1.5">
                                <CheckCircle className="h-3.5 w-3.5" />
                                Completed
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.completed_orders}</p>
                            <p className="text-xs text-muted-foreground">orders fulfilled</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground flex items-center gap-1.5">
                                <Wallet className="h-3.5 w-3.5" />
                                Total Spent
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{formatCurrency(stats.total_spent)}</p>
                            <p className="text-xs text-muted-foreground">all time</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                This Month
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{formatCurrency(stats.this_month_spent)}</p>
                            <p className="text-xs text-muted-foreground">spent this month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-3 grid-cols-3">
                    <Link href="/customer/orders">
                        <Card className="border border-border/40 shadow-none hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer">
                            <CardContent className="flex flex-col items-center justify-center py-6 px-4 relative">
                                {stats.total_orders > 0 && (
                                    <span className="absolute top-2 right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-medium text-white">
                                        {stats.total_orders > 99 ? '99+' : stats.total_orders}
                                    </span>
                                )}
                                <Package className="h-8 w-8 text-primary mb-2" />
                                <p className="text-sm font-medium">My Orders</p>
                                <p className="text-xs text-muted-foreground">View order history</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/customer/cart">
                        <Card className="border border-border/40 shadow-none hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer">
                            <CardContent className="flex flex-col items-center justify-center py-6 px-4 relative">
                                {stats.cart_item_count > 0 && (
                                    <span className="absolute top-2 right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-400 px-1 text-[10px] font-medium text-white">
                                        {stats.cart_item_count > 99 ? '99+' : stats.cart_item_count}
                                    </span>
                                )}
                                <ShoppingCart className="h-8 w-8 text-primary mb-2" />
                                <p className="text-sm font-medium">Shopping Cart</p>
                                <p className="text-xs text-muted-foreground">Continue shopping</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/marketplace">
                        <Card className="border border-border/40 shadow-none hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer">
                            <CardContent className="flex flex-col items-center justify-center py-6 px-4">
                                <Store className="h-8 w-8 text-primary mb-2" />
                                <p className="text-sm font-medium">Marketplace</p>
                                <p className="text-xs text-muted-foreground">Browse shops</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Recent Orders */}
                <Card className="border border-border/40 shadow-none">
                    <CardHeader className="pb-2 pt-3 px-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
                            <Link href="/customer/orders" className="text-xs text-primary hover:underline">
                                View all
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="px-4 pb-3">
                        {recentOrders.length > 0 ? (
                            <div className="space-y-3">
                                {recentOrders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                                {order.shop?.image_url ? (
                                                    <img
                                                        src={order.shop.image_url}
                                                        alt={order.shop.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <Package className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{order.order_number}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {order.shop?.name || 'Shop'} - {formatDate(order.created_at)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
                                            <span
                                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getStatusColor(order.status)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Package className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">No orders yet</p>
                                <Link href="/marketplace" className="text-xs text-primary hover:underline">
                                    Start shopping
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </UserLayout>
    );
}
