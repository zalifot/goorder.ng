import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Favorites',
        href: '/customer/favorites',
    },
];

export default function UserFavorites() {
    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="My Favorites" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">My Favorites</h1>
            </div>
        </UserLayout>
    );
}
