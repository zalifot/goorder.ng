import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BadgeCheck, Clock, Package, ShoppingCart, Store } from 'lucide-react';

interface Shop {
    id: number;
    name: string;
    public_id: string;
    image_url?: string;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_phone: string;
    user: { id: number; username: string; email: string } | null;
    status: string;
    payment_status: string;
    delivery_type: string;
    subtotal: number;
    delivery_fee: number;
    total: number;
    created_at: string;
}

interface Summary {
    total_orders: number;
    pending: number;
    completed: number;
    total_revenue: number;
}

interface Props {
    shop: Shop;
    orders: Order[];
    summary: Summary;
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
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
        case 'delivered':
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        case 'processing':
        case 'confirmed':
            return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
        case 'cancelled':
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
}

function getPaymentStatusColor(status: string): string {
    switch (status) {
        case 'paid':
            return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
        case 'pending':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
}

const ORDER_STATUSES = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'processing', label: 'Processing' },
    { value: 'ready', label: 'Ready' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
];

function handleStatusChange(shopPublicId: string, orderId: number, newStatus: string) {
    router.patch(
        `/vendor/manage/shop/${shopPublicId}/orders/${orderId}/status`,
        { status: newStatus },
        { preserveScroll: true },
    );
}

export default function ShopOrders({ shop, orders, summary }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Shops', href: '/vendor/shops' },
        { title: shop.name, href: `/vendor/manage/shop/${shop.public_id}` },
        { title: 'Orders', href: `/vendor/manage/shop/${shop.public_id}/orders` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Orders — ${shop.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-muted border">
                        {shop.image_url ? (
                            <img src={shop.image_url} alt={shop.name} className="h-full w-full object-cover" />
                        ) : (
                            <Store className="h-5 w-5 text-muted-foreground" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Orders</h1>
                        <p className="text-xs text-muted-foreground">{shop.name}</p>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <ShoppingCart className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total</p>
                                    <p className="text-base font-semibold">{summary.total_orders}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                    <Clock className="h-4 w-4 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Pending</p>
                                    <p className="text-base font-semibold">{summary.pending}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <BadgeCheck className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Completed</p>
                                    <p className="text-base font-semibold">{summary.completed}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <Package className="h-4 w-4 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Revenue</p>
                                    <p className="text-sm font-semibold">{formatCurrency(Number(summary.total_revenue))}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Orders list */}
                {orders.length > 0 ? (
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <ShoppingCart className="h-4 w-4" />
                                All Orders
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <div className="space-y-0">
                                {orders.map((order, index) => (
                                    <div key={order.id}>
                                        <div className="flex items-center gap-3 py-3 hover:bg-accent/30 -mx-2 px-2 rounded-lg transition-colors group">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <p className="text-sm font-medium">{order.order_number}</p>
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(value) => handleStatusChange(shop.public_id, order.id, value)}
                                                    >
                                                        <SelectTrigger className={`h-6 w-auto min-w-[110px] px-2 text-[10px] font-medium capitalize rounded-full border-0 ${getStatusColor(order.status)}`}>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ORDER_STATUSES.map((s) => (
                                                                <SelectItem key={s.value} value={s.value} className="text-xs capitalize">
                                                                    {s.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getPaymentStatusColor(order.payment_status)}`}>
                                                        {order.payment_status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {order.customer_name} · {order.customer_phone}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{formatDate(order.created_at)} · <span className="capitalize">{order.delivery_type}</span></p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-semibold">{formatCurrency(Number(order.total))}</p>
                                                {Number(order.delivery_fee) > 0 && (
                                                    <p className="text-[10px] text-muted-foreground">
                                                        incl. {formatCurrency(Number(order.delivery_fee))} delivery
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {index < orders.length - 1 && <div className="h-px bg-border/30" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="py-12">
                            <div className="text-center">
                                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                <h2 className="text-sm font-medium mb-1">No orders yet</h2>
                                <p className="text-xs text-muted-foreground">
                                    Orders from customers will appear here.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
