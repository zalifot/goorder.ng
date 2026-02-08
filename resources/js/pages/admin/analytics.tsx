import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

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
    is_under_construction: boolean;
    products_count: number;
    orders_count?: number;
    revenue?: number;
    created_at: string;
    user?: {
        id: number;
        username: string;
        email: string;
    };
}

interface User {
    id: number;
    username: string;
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
    { title: 'Dashboard', href: '/vendor/dashboard' },
    { title: 'Platform Analytics', href: '/vendor/platform/analytics' },
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
    });
}

function calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

// Sample weekly data (will be replaced with real data from backend)
const weeklyRevenueData = [
    { name: 'Mon', value: 0 },
    { name: 'Tue', value: 0 },
    { name: 'Wed', value: 0 },
    { name: 'Thu', value: 0 },
    { name: 'Fri', value: 0 },
    { name: 'Sat', value: 0 },
    { name: 'Sun', value: 0 },
];

const monthlyGrowthData = [
    { name: 'Jan', users: 0, shops: 0 },
    { name: 'Feb', users: 0, shops: 0 },
    { name: 'Mar', users: 0, shops: 0 },
    { name: 'Apr', users: 0, shops: 0 },
    { name: 'May', users: 0, shops: 0 },
    { name: 'Jun', users: 0, shops: 0 },
];

export default function PlatformAnalytics({ stats, topShops = [], recentUsers = [], recentShops = [] }: Props) {
    const revenueGrowth = calculateGrowth(stats.monthly_revenue, stats.last_month_revenue);

    const userBreakdown = [
        { name: 'Customers', value: stats.total_customers, color: '#3b82f6' },
        { name: 'Shop Owners', value: stats.total_shop_owners, color: '#8b5cf6' },
        { name: 'Admins', value: stats.total_admins, color: '#22c55e' },
    ].filter(item => item.value > 0);

    const shopBreakdown = [
        { name: 'Active', value: stats.active_shops, color: '#22c55e' },
        { name: 'Inactive', value: stats.inactive_shops, color: '#94a3b8' },
        { name: 'Under Construction', value: stats.shops_under_construction, color: '#eab308' },
    ].filter(item => item.value > 0);

    const productBreakdown = [
        { name: 'In Stock', value: Math.max(0, stats.active_products - stats.low_stock - stats.out_of_stock), color: '#22c55e' },
        { name: 'Low Stock', value: stats.low_stock, color: '#eab308' },
        { name: 'Out of Stock', value: stats.out_of_stock, color: '#ef4444' },
    ].filter(item => item.value > 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Analytics" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">Platform Analytics</h1>
                        <p className="text-xs text-muted-foreground">
                            Deep dive into platform-wide metrics — track total revenue, user growth, shop performance, and inventory health across the entire marketplace.
                        </p>
                    </div>
                    <Badge variant="outline" className="text-xs">Live</Badge>
                </div>

                {/* Revenue & Orders Row */}
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-5">
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{formatCurrency(stats.total_revenue)}</p>
                            <p className="text-xs text-muted-foreground">All time</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Monthly Revenue</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{formatCurrency(stats.monthly_revenue)}</p>
                            <p className={`text-xs ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}% vs last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Today's Revenue</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{formatCurrency(stats.today_revenue)}</p>
                            <p className="text-xs text-muted-foreground">{stats.today_orders} orders</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_orders}</p>
                            <p className="text-xs text-muted-foreground">{stats.monthly_orders} this month</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Pending Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.pending_orders}</p>
                            <p className="text-xs text-muted-foreground">Awaiting action</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-3 lg:grid-cols-2">
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Revenue Trend</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="h-[160px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyRevenueData}>
                                        <defs>
                                            <linearGradient id="colorPlatformRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                padding: '4px 8px'
                                            }}
                                            formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={1.5} fill="url(#colorPlatformRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Platform Growth</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="h-[160px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyGrowthData}>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '4px',
                                                fontSize: '11px',
                                                padding: '4px 8px'
                                            }}
                                        />
                                        <Bar dataKey="users" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Users" />
                                        <Bar dataKey="shops" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Shops" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Breakdown Row */}
                <div className="grid gap-3 lg:grid-cols-3">
                    {/* Users Breakdown */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Users ({stats.total_users})</CardTitle>
                                <span className="text-xs text-green-600">+{stats.new_users_month} this month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[90px] w-[90px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={userBreakdown.length > 0 ? userBreakdown : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={28}
                                                outerRadius={40}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(userBreakdown.length > 0 ? userBreakdown : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {userBreakdown.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-medium">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shops Breakdown */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Shops ({stats.total_shops})</CardTitle>
                                <span className="text-xs text-green-600">+{stats.new_shops_month} this month</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[90px] w-[90px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={shopBreakdown.length > 0 ? shopBreakdown : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={28}
                                                outerRadius={40}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(shopBreakdown.length > 0 ? shopBreakdown : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {shopBreakdown.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-medium">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products Breakdown */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Products ({stats.total_products})</CardTitle>
                                <span className="text-xs text-muted-foreground">{stats.active_products} active</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[90px] w-[90px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={productBreakdown.length > 0 ? productBreakdown : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={28}
                                                outerRadius={40}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(productBreakdown.length > 0 ? productBreakdown : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {productBreakdown.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-medium">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Row */}
                <div className="grid gap-3 lg:grid-cols-3">
                    {/* Top Shops */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Top Shops</CardTitle>
                                <Link href="/vendor/platform/shops" className="text-xs text-primary hover:underline">View all</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                {topShops.length > 0 ? topShops.slice(0, 5).map((shop, i) => (
                                    <div key={shop.id} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground w-4">{i + 1}.</span>
                                            <span className="font-medium truncate max-w-[120px]">{shop.name}</span>
                                        </div>
                                        <span className="text-muted-foreground">{shop.products_count} products</span>
                                    </div>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No shops yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Shops */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Recent Shops</CardTitle>
                                <Link href="/vendor/platform/shops" className="text-xs text-primary hover:underline">View all</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                {recentShops.length > 0 ? recentShops.slice(0, 5).map((shop) => (
                                    <div key={shop.id} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-1.5 w-1.5 rounded-full ${shop.is_active ? 'bg-green-500' : 'bg-gray-400'}`} />
                                            <span className="font-medium truncate max-w-[120px]">{shop.name}</span>
                                        </div>
                                        <span className="text-muted-foreground">{formatDate(shop.created_at)}</span>
                                    </div>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No shops yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Users */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Recent Users</CardTitle>
                                <Link href="/vendor/platform/users" className="text-xs text-primary hover:underline">View all</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                {recentUsers.length > 0 ? recentUsers.slice(0, 5).map((user) => (
                                    <div key={user.id} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium truncate max-w-[120px]">{user.username || user.email.split('@')[0]}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">{user.role}</Badge>
                                            <span className="text-muted-foreground">{formatDate(user.created_at)}</span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No users yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
