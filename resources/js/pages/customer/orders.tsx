
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronDown, ChevronRight, ChevronUp, Package, Store } from 'lucide-react';
import { useState } from 'react';

interface Shop {
    id: number;
    name: string;
    public_id: string;
    image_url?: string;
}

interface Product {
    id: number;
    name: string;
    image_url?: string;
}

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    discount_price: number | null;
    line_total: number;
    product: Product | null;
}

interface Order {
    id: number;
    order_number: string;
    shop: Shop;
    status: string;
    payment_status: string;
    delivery_type: string;
    subtotal: number;
    delivery_fee: number;
    total: number;
    item_count: number;
    items: OrderItem[];
    created_at: string;
}

interface Props {
    orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/customer/orders',
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
        case 'unpaid':
            return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
        case 'partial':
            return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        default:
            return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
}

const ORDERS_PREVIEW = 3;

export default function UserOrders({ orders }: Props) {
    const [expandedShops, setExpandedShops] = useState<Record<number, boolean>>({});

    const toggleShop = (shopId: number) => {
        setExpandedShops((prev) => ({ ...prev, [shopId]: !prev[shopId] }));
    };

    // Group orders by shop
    const ordersByShop = orders.reduce(
        (acc, order) => {
            const shopId = order.shop.id;
            if (!acc[shopId]) {
                acc[shopId] = {
                    shop: order.shop,
                    orders: [],
                };
            }
            acc[shopId].orders.push(order);
            return acc;
        },
        {} as Record<number, { shop: Shop; orders: Order[] }>,
    );

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="My Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div>
                    <h1 className="text-lg font-semibold">My Orders</h1>
                    <p className="text-xs text-muted-foreground">View and track your orders from different shops.</p>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {Object.values(ordersByShop).map(({ shop, orders: shopOrders }) => {
                            const isExpanded = expandedShops[shop.id] ?? false;
                            const hasMore = shopOrders.length > ORDERS_PREVIEW;
                            const visibleOrders = hasMore && !isExpanded ? shopOrders.slice(0, ORDERS_PREVIEW) : shopOrders;

                            return (
                            <Card key={shop.id} className="border border-border/40 shadow-none">
                                <CardHeader className="pb-2 pt-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                            {shop.image_url ? (
                                                <img src={shop.image_url} alt={shop.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <Store className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-sm font-medium">{shop.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground">
                                                {shopOrders.length} order{shopOrders.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/shop/${shop.public_id}`}
                                            className="text-xs text-primary hover:underline flex items-center gap-1"
                                        >
                                            Visit shop
                                            <ChevronRight className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-3">
                                    <div className="space-y-3">
                                        {visibleOrders.map((order) => (
                                            <Link
                                                key={order.id}
                                                href={`/customer/orders/${order.id}`}
                                                className="block border border-border/30 rounded-lg p-3 hover:bg-accent/30 transition-colors"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <p className="text-sm font-medium">{order.order_number}</p>
                                                            <span
                                                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getStatusColor(order.status)}`}
                                                            >
                                                                {order.status}
                                                            </span>
                                                            <span
                                                                className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getPaymentStatusColor(order.payment_status)}`}
                                                            >
                                                                {order.payment_status}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-muted-foreground">
                                                            {order.item_count} item{order.item_count !== 1 ? 's' : ''} -{' '}
                                                            {formatDate(order.created_at)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground capitalize">
                                                            {order.delivery_type}
                                                        </p>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <p className="text-sm font-semibold">{formatCurrency(order.total)}</p>
                                                        {order.delivery_fee > 0 && (
                                                            <p className="text-[10px] text-muted-foreground">
                                                                incl. {formatCurrency(order.delivery_fee)} delivery
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                {/* Items preview */}
                                                <div className="mt-2 flex gap-2 overflow-x-auto">
                                                    {order.items.slice(0, 4).map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="h-10 w-10 rounded bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden"
                                                        >
                                                            {item.product?.image_url ? (
                                                                <img
                                                                    src={item.product.image_url}
                                                                    alt={item.product_name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <Package className="h-4 w-4 text-muted-foreground" />
                                                            )}
                                                        </div>
                                                    ))}
                                                    {order.items.length > 4 && (
                                                        <div className="h-10 w-10 rounded bg-muted flex-shrink-0 flex items-center justify-center">
                                                            <span className="text-xs text-muted-foreground">
                                                                +{order.items.length - 4}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    {hasMore && (
                                        <button
                                            type="button"
                                            onClick={() => toggleShop(shop.id)}
                                            className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                                        >
                                            {isExpanded ? (
                                                <>
                                                    <ChevronUp className="h-3 w-3" />
                                                    Show less
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="h-3 w-3" />
                                                    Show {shopOrders.length - ORDERS_PREVIEW} more order{shopOrders.length - ORDERS_PREVIEW !== 1 ? 's' : ''}
                                                </>
                                            )}
                                        </button>
                                    )}
                                </CardContent>
                            </Card>
                            );
                        })}
                    </div>
                ) : (
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="py-12">
                            <div className="text-center">
                                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                <h2 className="text-sm font-medium mb-1">No orders yet</h2>
                                <p className="text-xs text-muted-foreground mb-4">
                                    Start shopping to see your orders here.
                                </p>
                                <Link
                                    href="/marketplace"
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Browse Marketplace
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </UserLayout>
    );
}
