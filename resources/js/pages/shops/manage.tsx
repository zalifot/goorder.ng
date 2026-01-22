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
import { ExternalLink, Package, Search, Store } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    public_id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    shop_public_id: string | null;
    category: Category;
    image: string;
    image_url: string;
    price: number;
    discount_percentage: number;
    sale_price: number;
    stock_quantity: number;
    stock_status: string;
    delivery_fee: number;
    delivery_time: string;
    payment_on_delivery: boolean;
    description: string | null;
    views: number;
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

interface Props {
    shop: Shop;
    products: PaginatedData<Product>;
    categories: Category[];
    filters: {
        search: string | null;
        category_id: string | null;
        stock_status: string | null;
    };
}

export default function ManageShop({ shop, products, categories = [], filters }: Props) {
    const productList = products?.data || [];
    const [searchQuery, setSearchQuery] = useState<string>(filters?.search || '');
    const [categoryFilter, setCategoryFilter] = useState<string>(filters?.category_id || '');
    const [stockFilter, setStockFilter] = useState<string>(filters?.stock_status || '');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Shops',
            href: '/shops',
        },
        {
            title: shop.name,
            href: `/manage/shop/${shop.public_id}`,
        },
    ];

    const applyFilters = (newFilters: { search?: string; category_id?: string; stock_status?: string }) => {
        const params: Record<string, string> = {};
        const search = newFilters.search !== undefined ? newFilters.search : searchQuery;
        const categoryId = newFilters.category_id !== undefined ? newFilters.category_id : categoryFilter;
        const stockStatus = newFilters.stock_status !== undefined ? newFilters.stock_status : stockFilter;

        if (search) params.search = search;
        if (categoryId) params.category_id = categoryId;
        if (stockStatus) params.stock_status = stockStatus;

        router.get(`/manage/shop/${shop.public_id}`, params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchQuery });
    };

    const handleCategoryFilter = (value: string) => {
        const categoryId = value === 'all' ? '' : value;
        setCategoryFilter(categoryId);
        applyFilters({ category_id: categoryId });
    };

    const handleStockFilter = (value: string) => {
        const stockStatus = value === 'all' ? '' : value;
        setStockFilter(stockStatus);
        applyFilters({ stock_status: stockStatus });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Manage ${shop.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                {/* Shop Header */}
                <div className="rounded-xl border bg-card p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                            {shop.image_url ? (
                                <img
                                    src={shop.image_url}
                                    alt={shop.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Store className="h-10 w-10 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold">{shop.name}</h1>
                            <p className="text-sm text-muted-foreground">
                                <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                                    {shop.public_id}
                                </code>
                            </p>
                            <a
                                href={`/vendor/${shop.public_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center gap-1 text-sm text-primary hover:underline"
                            >
                                <ExternalLink className="h-3.5 w-3.5" />
                                {window.location.origin}/vendor/{shop.public_id}
                            </a>
                            {shop.description && (
                                <p className="mt-2 text-sm text-muted-foreground">{shop.description}</p>
                            )}
                            <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <span className="font-semibold text-foreground">{products.total}</span> Products
                                </span>
                            </div>
                            <div className="mt-4">
                                <Button asChild>
                                    <Link href={`/manage/shop/${shop.public_id}/inventory`}>
                                        <Package className="mr-2 h-4 w-4" />
                                        Manage Inventory
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Products Table */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-semibold">Products</h2>
                            {/* Search */}
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-[200px]"
                                />
                                <Button type="submit" variant="outline" size="icon">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </form>
                            {/* Category Filter */}
                            <Select value={categoryFilter || 'all'} onValueChange={handleCategoryFilter}>
                                <SelectTrigger className="w-[160px]">
                                    <SelectValue placeholder="Filter by Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {/* Stock Status Filter */}
                            <Select value={stockFilter || 'all'} onValueChange={handleStockFilter}>
                                <SelectTrigger className="w-[140px]">
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
                    </div>

                    {/* Products Table */}
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Sale Price</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead>Views</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productList.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-muted-foreground">
                                            No products in this shop yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    productList.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                {product.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-12 w-12 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                                                        No image
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>{product.category?.name}</TableCell>
                                            <TableCell>
                                                {product.discount_percentage > 0 ? (
                                                    <span className="text-muted-foreground line-through">
                                                        ₦{product.price.toLocaleString()}
                                                    </span>
                                                ) : (
                                                    `₦${product.price.toLocaleString()}`
                                                )}
                                            </TableCell>
                                            <TableCell className="font-semibold text-green-600">
                                                ₦{product.sale_price.toLocaleString()}
                                            </TableCell>
                                            <TableCell>{product.stock_quantity}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {product.views.toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        product.stock_status === 'in_stock'
                                                            ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                            : product.stock_status === 'low_stock'
                                                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                                    }`}
                                                >
                                                    {product.stock_status === 'in_stock' ? 'In Stock' : product.stock_status === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {products?.last_page > 1 && (
                        <div className="flex items-center justify-between px-2">
                            <p className="text-sm text-muted-foreground">
                                Showing {products.from} to {products.to} of {products.total} products
                            </p>
                            <div className="flex gap-1">
                                {products.links?.map((link, index) => (
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
                </div>
            </div>
        </AppLayout>
    );
}
