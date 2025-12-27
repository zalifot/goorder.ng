import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, Receipt } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

export default function Transactions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Transactions</h1>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                <ArrowDownLeft className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₦0</p>
                                <p className="text-sm text-muted-foreground">Total Received</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                <ArrowUpRight className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">₦0</p>
                                <p className="text-sm text-muted-foreground">Total Refunded</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <Receipt className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">0</p>
                                <p className="text-sm text-muted-foreground">Total Transactions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Empty State */}
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl border bg-card py-16">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Receipt className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No transactions yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Transactions will appear here when customers make purchases.
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
