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

interface Shop {
    id: number;
    public_id: string;
    name: string;
    image_url: string | null;
    is_active: boolean;
}

interface Stats {
    total_revenue: number;
    today_revenue: number;
    monthly_revenue: number;
    last_month_revenue: number;
    total_orders: number;
    today_orders: number;
    monthly_orders: number;
    pending_orders: number;
    completed_orders: number;
    cancelled_orders: number;
    total_products: number;
    active_products: number;
    out_of_stock: number;
    low_stock: number;
    total_views: number;
}

interface Product {
    id: number;
    name: string;
    views: number;
    price: number;
    sale_price: number;
    stock_status: string;
    stock_quantity?: number;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    total: number;
    status: string;
    created_at: string;
}

interface ChartData {
    name: string;
    value?: number;
    orders?: number;
}

interface Props {
    shop: Shop;
    stats: Stats;
    weeklyRevenue: ChartData[];
    weeklyOrders: ChartData[];
    topProducts: Product[];
    recentOrders: Order[];
    lowStockProducts: Product[];
}

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
        hour: '2-digit',
        minute: '2-digit',
    });
}

function calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
        case 'cancelled':
            return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
}

function getStockColor(status: string): string {
    switch (status) {
        case 'in_stock':
            return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
        case 'low_stock':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
        case 'out_of_stock':
            return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
}

export default function ShopAnalytics({
    shop,
    stats,
    weeklyRevenue,
    weeklyOrders,
    topProducts = [],
    recentOrders = [],
    lowStockProducts = [],
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Shops', href: '/vendor/shops' },
        { title: shop.name, href: `/vendor/manage/shop/${shop.public_id}` },
        { title: 'Analytics', href: `/vendor/manage/shop/${shop.public_id}/analytics` },
    ];

    const revenueGrowth = calculateGrowth(stats.monthly_revenue, stats.last_month_revenue);

    const stockData = [
        { name: 'In Stock', value: Math.max(0, stats.active_products - stats.low_stock - stats.out_of_stock), color: '#22c55e' },
        { name: 'Low Stock', value: stats.low_stock, color: '#eab308' },
        { name: 'Out of Stock', value: stats.out_of_stock, color: '#ef4444' },
    ].filter(item => item.value > 0);

    const orderStatusData = [
        { name: 'Completed', value: stats.completed_orders, color: '#22c55e' },
        { name: 'Pending', value: stats.pending_orders, color: '#eab308' },
        { name: 'Cancelled', value: stats.cancelled_orders, color: '#ef4444' },
    ].filter(item => item.value > 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${shop.name} Analytics`} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {shop.image_url ? (
                            <img
                                src={shop.image_url}
                                alt={shop.name}
                                className="h-10 w-10 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-lg font-semibold">
                                {shop.name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h1 className="text-lg font-semibold">{shop.name}</h1>
                            <p className="text-xs text-muted-foreground">
                                Performance metrics for this shop — sales trends, order activity, top products, and stock alerts.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant={shop.is_active ? 'default' : 'secondary'} className="text-xs">
                            {shop.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <Link
                            href={`/vendor/manage/shop/${shop.public_id}`}
                            className="text-xs text-primary hover:underline"
                        >
                            Manage Shop
                        </Link>
                    </div>
                </div>

                {/* Key Metrics Row */}
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
                            <p className="text-xs text-muted-foreground">{stats.today_orders} orders today</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Total Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_orders}</p>
                            <p className="text-xs text-muted-foreground">{stats.pending_orders} pending</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Total Views</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_views.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{stats.total_products} products</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-3 lg:grid-cols-2">
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Revenue This Week</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="h-[160px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyRevenue}>
                                        <defs>
                                            <linearGradient id="colorShopRevenue" x1="0" y1="0" x2="0" y2="1">
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
                                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={1.5} fill="url(#colorShopRevenue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Orders This Week</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="h-[160px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyOrders}>
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
                                        <Bar dataKey="orders" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Breakdown Row */}
                <div className="grid gap-3 lg:grid-cols-2">
                    {/* Inventory Status */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Inventory Status</CardTitle>
                                <span className="text-xs text-muted-foreground">{stats.total_products} products</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[90px] w-[90px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stockData.length > 0 ? stockData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={28}
                                                outerRadius={40}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(stockData.length > 0 ? stockData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {stockData.length > 0 ? stockData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-medium">{item.value}</span>
                                        </div>
                                    )) : (
                                        <p className="text-xs text-muted-foreground">No products yet</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Status */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Order Status</CardTitle>
                                <span className="text-xs text-muted-foreground">{stats.total_orders} orders</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[90px] w-[90px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={orderStatusData.length > 0 ? orderStatusData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={28}
                                                outerRadius={40}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(orderStatusData.length > 0 ? orderStatusData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1">
                                    {orderStatusData.length > 0 ? orderStatusData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-medium">{item.value}</span>
                                        </div>
                                    )) : (
                                        <p className="text-xs text-muted-foreground">No orders yet</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Row */}
                <div className="grid gap-3 lg:grid-cols-3">
                    {/* Top Products */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Top Products</CardTitle>
                                <Link
                                    href={`/vendor/manage/shop/${shop.public_id}/inventory`}
                                    className="text-xs text-primary hover:underline"
                                >
                                    View all
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                {topProducts.length > 0 ? topProducts.map((product, i) => (
                                    <div key={product.id} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground w-4">{i + 1}.</span>
                                            <span className="font-medium truncate max-w-[100px]">{product.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">{product.views.toLocaleString()} views</span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No products yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Orders */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Recent Orders</CardTitle>
                                <span className="text-xs text-muted-foreground">{stats.pending_orders} pending</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                {recentOrders.length > 0 ? recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium truncate max-w-[80px]">{order.customer_name}</span>
                                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <span className="text-muted-foreground">{formatCurrency(order.total)}</span>
                                    </div>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">No orders yet</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Low Stock Alert */}
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-xs font-normal text-muted-foreground">Stock Alerts</CardTitle>
                                <span className="text-xs text-red-600">{stats.out_of_stock + stats.low_stock} items</span>
                            </div>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                {lowStockProducts.length > 0 ? lowStockProducts.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between text-xs">
                                        <span className="font-medium truncate max-w-[120px]">{product.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-muted-foreground">{product.stock_quantity} left</span>
                                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${getStockColor(product.stock_status)}`}>
                                                {product.stock_status === 'out_of_stock' ? 'Out' : 'Low'}
                                            </span>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-xs text-muted-foreground text-center py-4">All stocked up!</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
