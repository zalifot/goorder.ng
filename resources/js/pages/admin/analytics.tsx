import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    Building2,
    DollarSign,
    Package,
    ShoppingCart,
    Store,
    TrendingUp,
    UserCheck,
    UserPlus,
    Users,
} from 'lucide-react';

interface Stats {
    total_revenue: number;
    today_revenue: number;
    monthly_revenue: number;
    last_month_revenue: number;
    total_orders: number;
    today_orders: number;
    monthly_orders: number;
    pending_orders: number;
    total_users: number;
    total_customers: number;
    total_shop_owners: number;
    total_admins: number;
    new_users_today: number;
    new_users_month: number;
    total_shops: number;
    active_shops: number;
    inactive_shops: number;
    shops_under_construction: number;
    new_shops_month: number;
    total_products: number;
    active_products: number;
    out_of_stock: number;
    low_stock: number;
}

interface Shop {
    id: number;
    name: string;
    public_id: string;
    is_active: boolean;
    is_construction: boolean;
    products_count: number;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    topShops: Shop[];
    recentUsers: User[];
    recentShops: Shop[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Platform Analytics', href: '/platform/analytics' },
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

function calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

export default function PlatformAnalytics({ stats, topShops, recentUsers, recentShops }: Props) {
    const revenueGrowth = calculateGrowth(stats.monthly_revenue, stats.last_month_revenue);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Analytics" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Platform Analytics</h1>
                        <p className="text-muted-foreground">Monitor your entire platform performance</p>
                    </div>
                    <Badge variant="outline" className="gap-1">
                        <Activity className="h-3 w-3" />
                        Live Data
                    </Badge>
                </div>

                {/* Revenue Overview */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Platform Revenue</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.total_revenue)}</div>
                                <p className="text-xs text-muted-foreground">All time platform earnings</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.monthly_revenue)}</div>
                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {revenueGrowth >= 0 ? (
                                        <span className="text-green-600">+{revenueGrowth}%</span>
                                    ) : (
                                        <span className="text-red-600">{revenueGrowth}%</span>
                                    )}
                                    vs last month
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(stats.today_revenue)}</div>
                                <p className="text-xs text-muted-foreground">Revenue today</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                                <ShoppingCart className="h-4 w-4 text-yellow-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.pending_orders}</div>
                                <p className="text-xs text-muted-foreground">Awaiting processing</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Users & Shops Overview */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Users Stats */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Users Overview</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total_users}</div>
                                    <p className="text-xs text-muted-foreground">All registered users</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Customers</CardTitle>
                                    <UserCheck className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total_customers}</div>
                                    <p className="text-xs text-muted-foreground">Active shoppers</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Shop Owners</CardTitle>
                                    <Building2 className="h-4 w-4 text-purple-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total_shop_owners}</div>
                                    <p className="text-xs text-muted-foreground">Selling on platform</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                                    <UserPlus className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.new_users_month}</div>
                                    <p className="text-xs text-muted-foreground">{stats.new_users_today} joined today</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Shops Stats */}
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Shops Overview</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
                                    <Store className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.total_shops}</div>
                                    <p className="text-xs text-muted-foreground">All shops on platform</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Shops</CardTitle>
                                    <Store className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.active_shops}</div>
                                    <p className="text-xs text-muted-foreground">{stats.inactive_shops} inactive</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Under Construction</CardTitle>
                                    <Store className="h-4 w-4 text-yellow-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.shops_under_construction}</div>
                                    <p className="text-xs text-muted-foreground">Not yet public</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                                    <Store className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.new_shops_month}</div>
                                    <p className="text-xs text-muted-foreground">New shops created</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Products Overview */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Products Overview</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_products}</div>
                                <p className="text-xs text-muted-foreground">Across all shops</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                                <Package className="h-4 w-4 text-green-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.active_products}</div>
                                <p className="text-xs text-muted-foreground">Listed for sale</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                                <Package className="h-4 w-4 text-yellow-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.low_stock}</div>
                                <p className="text-xs text-muted-foreground">Need restocking</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                                <Package className="h-4 w-4 text-red-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.out_of_stock}</div>
                                <p className="text-xs text-muted-foreground">Unavailable</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Recent Shops */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Shops</CardTitle>
                                    <CardDescription>Newly created shops on the platform</CardDescription>
                                </div>
                                <Link
                                    href="/platform/shops"
                                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                    View All <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentShops.map((shop) => (
                                    <div key={shop.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                <Store className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{shop.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    by {shop.user?.name || 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={shop.is_active ? 'default' : 'secondary'}>
                                                {shop.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDate(shop.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {recentShops.length === 0 && (
                                    <p className="text-center text-sm text-muted-foreground">No shops yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Users</CardTitle>
                                    <CardDescription>Newly registered users</CardDescription>
                                </div>
                                <Link
                                    href="/platform/users"
                                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                    View All <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                <Users className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{user.name || user.email}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{user.role}</Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDate(user.created_at)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {recentUsers.length === 0 && (
                                    <p className="text-center text-sm text-muted-foreground">No users yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
