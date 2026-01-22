import { Button } from '@/components/ui/button';
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
import { AlertTriangle, ExternalLink, Package, Search, Store, TrendingDown } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    public_id: string;
    name: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    shop_public_id: string | null;
    category: Category;
    shop: Shop | null;
    image: string;
    image_url: string;
    price: number;
    discount_percentage: number;
    sale_price: number;
    stock_quantity: number;
    stock_status: string;
}

interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: { url: string | null; label: string; active: boolean }[];
}

interface Stats {
    total_products: number;
    low_stock_count: number;
    out_of_stock_count: number;
    total_shops: number;
}

interface Props {
    products: PaginatedData<Product>;
    shops: Shop[];
    stats: Stats;
    filters: {
        search: string | null;
        shop_public_id: string | null;
        stock_status: string | null;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventory Dashboard',
        href: '/inventory',
    },
];

export default function InventoryDashboard({ products, shops = [], stats, filters }: Props) {
    const productList = products?.data || [];
    const [searchQuery, setSearchQuery] = useState<string>(filters?.search || '');
    const [shopFilter, setShopFilter] = useState<string>(filters?.shop_public_id || '');
    const [stockFilter, setStockFilter] = useState<string>(filters?.stock_status || '');

    const applyFilters = (newFilters: { search?: string; shop_public_id?: string; stock_status?: string }) => {
        const params: Record<string, string> = {};
        const search = newFilters.search !== undefined ? newFilters.search : searchQuery;
        const shopPublicId = newFilters.shop_public_id !== undefined ? newFilters.shop_public_id : shopFilter;
        const stockStatus = newFilters.stock_status !== undefined ? newFilters.stock_status : stockFilter;

        if (search) params.search = search;
        if (shopPublicId) params.shop_public_id = shopPublicId;
        if (stockStatus) params.stock_status = stockStatus;

        router.get('/inventory', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchQuery });
    };

    const handleShopFilter = (value: string) => {
        const shopPublicId = value === 'all' ? '' : value;
        setShopFilter(shopPublicId);
        applyFilters({ shop_public_id: shopPublicId });
    };

    const handleStockFilter = (value: string) => {
        const stockStatus = value === 'all' ? '' : value;
        setStockFilter(stockStatus);
        applyFilters({ stock_status: stockStatus });
    };

    const getStockBadge = (status: string, quantity: number) => {
        if (status === 'out_of_stock') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                    Out of Stock
                </span>
            );
        }
        if (status === 'low_stock') {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                    Low Stock ({quantity})
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                In Stock ({quantity})
            </span>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Inventory Dashboard</h1>
                        <p className="text-sm text-muted-foreground">
                            Overview of all products across all your shops
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <Package className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total_products}</p>
                                <p className="text-sm text-muted-foreground">Total Products</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                <Store className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.total_shops}</p>
                                <p className="text-sm text-muted-foreground">Active Shops</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100">
                                <TrendingDown className="h-5 w-5 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.low_stock_count}</p>
                                <p className="text-sm text-muted-foreground">Low Stock</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card p-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{stats.out_of_stock_count}</p>
                                <p className="text-sm text-muted-foreground">Out of Stock</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-[250px]"
                        />
                        <Button type="submit" variant="outline" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </form>
                    <Select value={shopFilter || 'all'} onValueChange={handleShopFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by Shop" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Shops</SelectItem>
                            {shops.map((shop) => (
                                <SelectItem key={shop.id} value={shop.public_id}>
                                    {shop.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={stockFilter || 'all'} onValueChange={handleStockFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Stock Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="in_stock">In Stock</SelectItem>
                            <SelectItem value="low_stock">Low Stock</SelectItem>
                            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Products Table */}
                <div className="rounded-xl border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Shop</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="w-[100px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productList.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="py-12 text-center text-muted-foreground">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                productList.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <div className="h-12 w-12 overflow-hidden rounded-lg border bg-muted">
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <Package className="h-5 w-5 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <p className="font-medium">{product.name}</p>
                                                <p className="text-xs text-muted-foreground">{product.slug}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {product.shop ? (
                                                <Link
                                                    href={`/manage/shop/${product.shop.public_id}`}
                                                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                                >
                                                    <Store className="h-3.5 w-3.5" />
                                                    {product.shop.name}
                                                </Link>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">{product.category?.name || '—'}</span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div>
                                                <p className="font-medium">₦{product.sale_price.toLocaleString()}</p>
                                                {product.discount_percentage > 0 && (
                                                    <p className="text-xs text-muted-foreground line-through">
                                                        ₦{product.price.toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStockBadge(product.stock_status, product.stock_quantity)}
                                        </TableCell>
                                        <TableCell>
                                            {product.shop_public_id && (
                                                <Button asChild variant="ghost" size="sm">
                                                    <Link href={`/manage/shop/${product.shop_public_id}/inventory`}>
                                                        <ExternalLink className="mr-1 h-3.5 w-3.5" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {products.from} to {products.to} of {products.total} products
                        </p>
                        <div className="flex gap-2">
                            {products.links.map((link, index) => {
                                if (link.url === null) {
                                    return (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }
                                return (
                                    <Button
                                        key={index}
                                        variant={link.active ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => router.get(link.url!)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
