import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User Dashboard',
        href: '/user-dashboard',
    },
];

export default function UserDashboard() {
    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="User Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">User Dashboard</h1>
            </div>
        </UserLayout>
    );
}
