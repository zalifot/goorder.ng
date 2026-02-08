import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, BadgeCheck, Clock, Receipt, Store, TrendingUp } from 'lucide-react';

interface Shop {
    id: number;
    name: string;
    public_id: string;
    image_url?: string;
}

interface Transaction {
    id: number;
    order_number: string;
    shop: Shop;
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
    transactions: Transaction[];
    summary: Summary;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/customer/transactions',
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

export default function Transactions({ transactions, summary }: Props) {
    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="Transaction History" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div>
                    <h1 className="text-lg font-semibold">Transaction History</h1>
                    <p className="text-xs text-muted-foreground">All your payment transactions and order history.</p>
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
                                    <p className="text-xs text-muted-foreground">Total Paid</p>
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
                                    <p className="text-xs text-muted-foreground">Unpaid Orders</p>
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
                                        <Link
                                            href={`/customer/orders/${tx.id}`}
                                            className="flex items-center gap-3 py-3 hover:bg-accent/30 -mx-2 px-2 rounded-lg transition-colors group"
                                        >
                                            {/* Shop avatar */}
                                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {tx.shop?.image_url ? (
                                                    <img src={tx.shop.image_url} alt={tx.shop.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <Store className="h-5 w-5 text-muted-foreground" />
                                                )}
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium">{tx.order_number}</p>
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${getPaymentStatusColor(tx.payment_status)}`}
                                                    >
                                                        {tx.payment_status}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground">{tx.shop?.name} · {formatDate(tx.created_at)}</p>
                                                <p className={`text-xs font-medium capitalize ${getStatusColor(tx.status)}`}>{tx.status}</p>
                                            </div>

                                            {/* Amount */}
                                            <div className="text-right flex-shrink-0 flex items-center gap-2">
                                                <div>
                                                    <p className="text-sm font-semibold">{formatCurrency(Number(tx.total))}</p>
                                                    {Number(tx.delivery_fee) > 0 && (
                                                        <p className="text-[10px] text-muted-foreground">
                                                            incl. {formatCurrency(Number(tx.delivery_fee))} delivery
                                                        </p>
                                                    )}
                                                </div>
                                                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </Link>
                                        {index < transactions.length - 1 && (
                                            <div className="h-px bg-border/30 mx-0" />
                                        )}
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
                                <p className="text-xs text-muted-foreground mb-4">
                                    Your payment history will appear here after you place an order.
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
