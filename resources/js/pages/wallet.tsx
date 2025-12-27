import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, Building2, Clock, Wallet as WalletIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallet',
        href: '/wallet',
    },
];

export default function Wallet() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Wallet" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Wallet</h1>
                    <Button>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Withdraw
                    </Button>
                </div>

                {/* Balance Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                                <WalletIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm text-white/80">Available Balance</p>
                                <p className="text-3xl font-bold">₦0.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                                <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold">₦0.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                <ArrowDownLeft className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Earned</p>
                                <p className="text-2xl font-bold">₦0.00</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bank Account Section */}
                <div className="rounded-xl border bg-card">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">Payout Account</h2>
                        <p className="text-sm text-muted-foreground">Add your bank account to receive payouts</p>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <Building2 className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No bank account added</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Add a bank account to withdraw your earnings
                        </p>
                        <Button className="mt-4" variant="outline">
                            Add Bank Account
                        </Button>
                    </div>
                </div>

                {/* Recent Payouts */}
                <div className="rounded-xl border bg-card">
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">Recent Payouts</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center py-12">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                            <ArrowUpRight className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No payouts yet</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Your payout history will appear here
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
