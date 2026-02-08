import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BadgeCheck, Clock, Receipt, Store, TrendingUp } from 'lucide-react';

interface Shop {
    id: number;
    name: string;
    public_id: string;
    image_url?: string;
}

interface Transaction {
    id: number;
    order_number: string;
    customer_name: string;
    subtotal: number;
    delivery_fee: number;
    total: number;
    delivery_type: string;
    status: string;
    payment_status: string;
    created_at: string;
}

interface Summary {
    total_paid: number;
    total_pending: number;
    transaction_count: number;
}

interface Props {
    shop: Shop;
    transactions: Transaction[];
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

function getStatusColor(status: string): string {
    switch (status) {
        case 'completed':
        case 'delivered':
            return 'text-green-600';
        case 'pending':
            return 'text-yellow-600';
        case 'processing':
        case 'confirmed':
            return 'text-blue-600';
        case 'cancelled':
            return 'text-red-600';
        default:
            return 'text-gray-600';
    }
}

export default function ShopTransactions({ shop, transactions, summary }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Shops', href: '/vendor/shops' },
        { title: shop.name, href: `/vendor/manage/shop/${shop.public_id}` },
        { title: 'Transactions', href: `/vendor/manage/shop/${shop.public_id}/transactions` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Transactions — ${shop.name}`} />
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
                        <h1 className="text-lg font-semibold">Transactions</h1>
                        <p className="text-xs text-muted-foreground">{shop.name}</p>
                    </div>
                </div>

                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                    <BadgeCheck className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Received</p>
                                    <p className="text-base font-semibold">{formatCurrency(Number(summary.total_paid))}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                    <Clock className="h-5 w-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Pending</p>
                                    <p className="text-base font-semibold">{formatCurrency(Number(summary.total_pending))}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <TrendingUp className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Total Transactions</p>
                                    <p className="text-base font-semibold">{summary.transaction_count}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Transaction list */}
                {transactions.length > 0 ? (
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Receipt className="h-4 w-4" />
                                All Transactions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            <div className="space-y-0">
                                {transactions.map((tx, index) => (
                                    <div key={tx.id}>
                                        <div className="flex items-center gap-3 py-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium">{tx.order_number}</p>
                                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getPaymentStatusColor(tx.payment_status)}`}>
                                                        {tx.payment_status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{tx.customer_name} · {formatDate(tx.created_at)}</p>
                                                <p className={`text-xs font-medium capitalize ${getStatusColor(tx.status)}`}>{tx.status}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-semibold">{formatCurrency(Number(tx.total))}</p>
                                                {Number(tx.delivery_fee) > 0 && (
                                                    <p className="text-[10px] text-muted-foreground">
                                                        incl. {formatCurrency(Number(tx.delivery_fee))} delivery
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {index < transactions.length - 1 && <div className="h-px bg-border/30" />}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="py-12">
                            <div className="text-center">
                                <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                <h2 className="text-sm font-medium mb-1">No transactions yet</h2>
                                <p className="text-xs text-muted-foreground">
                                    Payment transactions will appear here.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
