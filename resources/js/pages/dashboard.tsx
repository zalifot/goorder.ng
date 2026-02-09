import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/vendor';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
    total_orders: number;
    pending_orders: number;
    completed_orders: number;
    today_orders: number;
    total_products: number;
    active_products: number;
    out_of_stock: number;
    low_stock: number;
    total_shops: number;
    active_shops: number;
}

interface Props {
    stats: Stats;
    weeklyRevenue: { name: string; value: number }[];
    weeklyOrders: { name: string; orders: number }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Dashboard({ stats, weeklyRevenue, weeklyOrders }: Props) {
    const stockData = [
        { name: 'In Stock', value: Math.max(0, stats.active_products - stats.low_stock - stats.out_of_stock), color: '#22c55e' },
        { name: 'Low Stock', value: stats.low_stock, color: '#eab308' },
        { name: 'Out of Stock', value: stats.out_of_stock, color: '#ef4444' },
    ].filter(item => item.value > 0);

    const shopStatusData = [
        { name: 'Active', value: stats.active_shops, color: '#22c55e' },
        { name: 'Inactive', value: Math.max(0, stats.total_shops - stats.active_shops), color: '#94a3b8' },
    ].filter(item => item.value > 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-3 p-4">
                {/* Header */}
                <div>
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                    <p className="text-xs text-muted-foreground">
                        Your shops' performance at a glance — revenue, orders, inventory, and activity.
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Revenue</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{formatCurrency(stats.total_revenue)}</p>
                            <p className="text-xs text-muted-foreground">Today: {formatCurrency(stats.today_revenue)}</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_orders}</p>
                            <p className="text-xs text-muted-foreground">{stats.pending_orders} pending</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Products</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_products}</p>
                            <p className="text-xs text-muted-foreground">{stats.active_products} active</p>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-1 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Shops</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <p className="text-xl font-semibold">{stats.total_shops}</p>
                            <p className="text-xs text-muted-foreground">{stats.active_shops} active</p>
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
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={weeklyRevenue}>
                                        <defs>
                                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                padding: '6px 10px'
                                            }}
                                            formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#3b82f6"
                                            strokeWidth={1.5}
                                            fill="url(#colorRevenue)"
                                        />
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
                            <div className="h-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyOrders}>
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                                        />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--background))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '4px',
                                                fontSize: '12px',
                                                padding: '6px 10px'
                                            }}
                                        />
                                        <Bar
                                            dataKey="orders"
                                            fill="#8b5cf6"
                                            radius={[3, 3, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Row */}
                <div className="grid gap-3 lg:grid-cols-3">
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Inventory Status</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[110px] w-[110px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={stockData.length > 0 ? stockData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={32}
                                                outerRadius={48}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(stockData.length > 0 ? stockData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    padding: '6px 10px'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    {stockData.length > 0 ? stockData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
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

                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Shop Status</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="flex items-center gap-4">
                                <div className="h-[110px] w-[110px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={shopStatusData.length > 0 ? shopStatusData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={32}
                                                outerRadius={48}
                                                paddingAngle={2}
                                                dataKey="value"
                                            >
                                                {(shopStatusData.length > 0 ? shopStatusData : [{ name: 'No Data', value: 1, color: '#e2e8f0' }]).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'hsl(var(--background))',
                                                    border: '1px solid hsl(var(--border))',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    padding: '6px 10px'
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    {shopStatusData.length > 0 ? shopStatusData.map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                                                <span className="text-muted-foreground">{item.name}</span>
                                            </div>
                                            <span className="font-medium">{item.value}</span>
                                        </div>
                                    )) : (
                                        <p className="text-xs text-muted-foreground">No shops yet</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-xs font-normal text-muted-foreground">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-3">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Total Orders</span>
                                    <span className="font-medium">{stats.total_orders}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Pending</span>
                                    <span className="font-medium text-amber-600">{stats.pending_orders}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Completed</span>
                                    <span className="font-medium text-green-600">{stats.completed_orders}</span>
                                </div>
                                <div className="my-2 border-t border-border/30" />
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Today's Orders</span>
                                    <span className="font-medium">{stats.today_orders}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Monthly Revenue</span>
                                    <span className="font-medium">{formatCurrency(stats.monthly_revenue)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
