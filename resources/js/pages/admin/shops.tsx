import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Construction, ExternalLink, Eye, Package, Power, Search, Store, X } from 'lucide-react';
import { useState } from 'react';

interface Shop {
    id: number;
    name: string;
    description?: string;
    public_id: string;
    is_active: boolean;
    is_under_construction: boolean;
    products_count: number;
    created_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface PaginatedShops {
    data: Shop[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    shops: PaginatedShops;
    filters: {
        search?: string;
        status?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Platform Shops', href: '/platform/shops' },
];

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function PlatformShops({ shops, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/platform/shops', {
            search: search || undefined,
            status: status !== 'all' ? status : undefined,
        }, { preserveState: true });
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        router.get('/platform/shops', {
            search: search || undefined,
            status: value !== 'all' ? value : undefined,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setStatus('all');
        router.get('/platform/shops');
    };

    const toggleShopStatus = (shopId: number) => {
        router.patch(`/platform/shops/${shopId}/toggle-status`, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasFilters = filters.search || filters.status;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Shops" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Platform Shops</h1>
                        <p className="text-muted-foreground">
                            Manage all shops across the platform ({shops.total} total)
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
                            <Store className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{shops.total}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
                            <div className="relative flex-1 min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search shops, owners..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={status} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                    <SelectItem value="construction">Under Construction</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="submit">Search</Button>
                            {hasFilters && (
                                <Button type="button" variant="ghost" onClick={clearFilters}>
                                    <X className="mr-2 h-4 w-4" />
                                    Clear
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>

                {/* Shops Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Shops</CardTitle>
                        <CardDescription>
                            A list of all shops on the platform with their owners and status
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Shop</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Products</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {shops.data.map((shop) => (
                                    <TableRow key={shop.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                    <Store className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{shop.name}</p>
                                                    <p className="text-xs text-muted-foreground">{shop.public_id}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{shop.user?.name || 'Unknown'}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {shop.user?.email || '-'}
                                                </p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Package className="h-4 w-4 text-muted-foreground" />
                                                {shop.products_count}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                <Badge variant={shop.is_active ? 'default' : 'secondary'}>
                                                    {shop.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                                {shop.is_under_construction && (
                                                    <Badge variant="outline" className="gap-1">
                                                        <Construction className="h-3 w-3" />
                                                        Construction
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{formatDate(shop.created_at)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleShopStatus(shop.id)}
                                                    title={shop.is_active ? 'Deactivate' : 'Activate'}
                                                >
                                                    <Power
                                                        className={`h-4 w-4 ${shop.is_active ? 'text-green-600' : 'text-muted-foreground'}`}
                                                    />
                                                </Button>
                                                <Link href={`/manage/shop/${shop.public_id}`}>
                                                    <Button variant="ghost" size="icon" title="View Shop Dashboard">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/vendor/${shop.public_id}`} target="_blank">
                                                    <Button variant="ghost" size="icon" title="View Storefront">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {shops.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No shops found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {shops.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {(shops.current_page - 1) * shops.per_page + 1} to{' '}
                                    {Math.min(shops.current_page * shops.per_page, shops.total)} of {shops.total} shops
                                </p>
                                <div className="flex gap-2">
                                    {shops.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            disabled={!link.url}
                                            onClick={() => link.url && router.get(link.url)}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
