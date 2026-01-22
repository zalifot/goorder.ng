import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
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
import { Head, Link, router, useForm } from '@inertiajs/react';
import { MoreHorizontal, Plus, Search, Store, Upload } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    public_id: string;
    name: string;
    image_url: string | null;
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
    };
}

export default function Inventory({ shop, products, categories = [], filters }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Shops',
            href: '/shops',
        },
        {
            title: shop.name,
            href: `/manage/shop/${shop.public_id}`,
        },
        {
            title: 'Inventory',
            href: `/manage/shop/${shop.public_id}/inventory`,
        },
    ];

    const productList = products?.data || [];
    const [open, setOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [imageInputType, setImageInputType] = useState<'file' | 'url'>('file');
    const [editImageInputType, setEditImageInputType] = useState<'file' | 'url'>('file');
    const [searchQuery, setSearchQuery] = useState<string>(filters?.search || '');
    const [categoryFilter, setCategoryFilter] = useState<string>(filters?.category_id || '');

    const applyFilters = (newFilters: { search?: string; category_id?: string }) => {
        const params: Record<string, string> = {};
        const search = newFilters.search !== undefined ? newFilters.search : searchQuery;
        const categoryId = newFilters.category_id !== undefined ? newFilters.category_id : categoryFilter;

        if (search) params.search = search;
        if (categoryId) params.category_id = categoryId;

        router.get(`/manage/shop/${shop.public_id}/inventory`, params, {
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

    const viewProduct = (product: Product) => {
        setSelectedProduct(product);
        setViewOpen(true);
    };

    const openEditDialog = (product: Product) => {
        setEditingProduct(product);
        // Check if the current image is a URL or a file path
        const isExternalUrl = product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'));
        setEditImageInputType(isExternalUrl ? 'url' : 'file');
        editForm.setData({
            name: product.name,
            slug: product.slug,
            category_id: String(product.category_id),
            image: null,
            image_url: isExternalUrl ? product.image : '',
            price: String(product.price),
            discount_percentage: String(product.discount_percentage),
            stock_quantity: String(product.stock_quantity),
            delivery_fee: String(product.delivery_fee),
            delivery_time: product.delivery_time,
            payment_on_delivery: product.payment_on_delivery,
            description: product.description || '',
            remove_image: false,
        });
        setEditImagePreview(product.image_url);
        setEditOpen(true);
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        category_id: '',
        image: null as File | null,
        image_url: '',
        price: '',
        discount_percentage: '',
        stock_quantity: '',
        delivery_fee: '',
        delivery_time: '',
        payment_on_delivery: true,
        description: '',
    });

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const importForm = useForm({
        file: null as File | null,
    });

    const editForm = useForm({
        name: '',
        slug: '',
        category_id: '',
        image: null as File | null,
        image_url: '',
        price: '',
        discount_percentage: '',
        stock_quantity: '',
        delivery_fee: '',
        delivery_time: '',
        payment_on_delivery: true,
        description: '',
        remove_image: false,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setData('image_url', ''); // Clear URL when file is uploaded
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            editForm.setData('image', file);
            editForm.setData('image_url', ''); // Clear URL when file is uploaded
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/manage/shop/${shop.public_id}/inventory`, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setOpen(false);
                setImagePreview(null);
                setImageInputType('file');
            },
        });
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingProduct) return;
        router.post(`/manage/shop/${shop.public_id}/inventory/${editingProduct.id}`, {
            _method: 'PUT',
            name: editForm.data.name,
            slug: editForm.data.slug,
            category_id: editForm.data.category_id,
            image: editForm.data.image,
            image_url: editForm.data.image_url,
            price: editForm.data.price,
            discount_percentage: editForm.data.discount_percentage,
            stock_quantity: editForm.data.stock_quantity,
            delivery_fee: editForm.data.delivery_fee,
            delivery_time: editForm.data.delivery_time,
            payment_on_delivery: editForm.data.payment_on_delivery,
            description: editForm.data.description,
            remove_image: editForm.data.remove_image,
        }, {
            forceFormData: true,
            onSuccess: () => {
                editForm.reset();
                setEditOpen(false);
                setEditImagePreview(null);
                setEditingProduct(null);
                setEditImageInputType('file');
            },
        });
    };

    const deleteProduct = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/manage/shop/${shop.public_id}/inventory/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${shop.name} - Inventory`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Store className="h-5 w-5 text-muted-foreground" />
                            <h1 className="text-2xl font-bold">{shop.name}</h1>
                            <span className="text-muted-foreground">/ Inventory</span>
                        </div>
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
                    </div>
                    <div className="flex gap-2">
                        {/* Import Dialog */}
                        <Dialog open={importOpen} onOpenChange={setImportOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    <Upload className="mr-2 h-4 w-4" />
                                    Import
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Import Products</DialogTitle>
                                    <DialogDescription>
                                        Upload an Excel or CSV file to import products in bulk.
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        importForm.post(`/manage/shop/${shop.public_id}/inventory/import`, {
                                            onSuccess: () => {
                                                setImportOpen(false);
                                                importForm.reset();
                                            },
                                        });
                                    }}
                                    className="space-y-4"
                                >
                                    <div className="grid gap-2">
                                        <Label htmlFor="import_file">Excel/CSV File</Label>
                                        <Input
                                            id="import_file"
                                            type="file"
                                            accept=".xlsx,.xls,.csv"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    importForm.setData('file', e.target.files[0]);
                                                }
                                            }}
                                            required
                                        />
                                        <InputError message={importForm.errors.file} />
                                    </div>
                                    <div className="rounded-lg bg-muted p-4">
                                        <p className="text-sm font-medium mb-2">Required Columns:</p>
                                        <ul className="text-xs text-muted-foreground space-y-1">
                                            <li>• <strong>name</strong> - Product name (required)</li>
                                            <li>• <strong>category</strong> - Category name (will be created if doesn't exist)</li>
                                            <li>• <strong>price</strong> - Product price (required)</li>
                                            <li>• <strong>stock_quantity</strong> - Stock quantity (required)</li>
                                            <li>• <strong>delivery_time</strong> - e.g., "2-3 days" (optional)</li>
                                            <li>• <strong>image_url</strong> - Product image URL (optional)</li>
                                            <li>• <strong>discount_percentage</strong> - Discount % (optional)</li>
                                            <li>• <strong>delivery_fee</strong> - Delivery fee (optional)</li>
                                            <li>• <strong>payment_on_delivery</strong> - yes/no (optional)</li>
                                            <li>• <strong>description</strong> - Product description (optional)</li>
                                        </ul>
                                    </div>
                                    <div className="flex justify-between">
                                        <a
                                            href={`/manage/shop/${shop.public_id}/inventory/template`}
                                            className="text-sm text-primary hover:underline"
                                        >
                                            Download Template
                                        </a>
                                        <div className="flex gap-2">
                                            <Button type="button" variant="outline" onClick={() => setImportOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" disabled={importForm.processing}>
                                                {importForm.processing && <Spinner className="mr-2" />}
                                                Import
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>

                        {/* Add Product Dialog */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </Button>
                            </DialogTrigger>
                        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                                <DialogDescription>
                                    Fill in the details to add a new product to your inventory.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-4">
                                    {/* Basic Product Info */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Basic Product Info</h3>
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Product Name *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => {
                                                    const name = e.target.value;
                                                    setData('name', name);
                                                    setData('slug', generateSlug(name));
                                                }}
                                                placeholder="Enter product name"
                                                required
                                            />
                                            <InputError message={errors.name} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="slug">URL Slug</Label>
                                            <Input
                                                id="slug"
                                                value={data.slug}
                                                onChange={(e) => setData('slug', e.target.value)}
                                                placeholder="product-url-slug"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Auto-generated from product name. You can customize it.
                                            </p>
                                            <InputError message={errors.slug} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="category">Category *</Label>
                                            <Select
                                                value={data.category_id}
                                                onValueChange={(value) => setData('category_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((category) => (
                                                        <SelectItem key={category.id} value={String(category.id)}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {categories.length === 0 ? (
                                                <p className="text-xs text-muted-foreground">
                                                    No categories available.{' '}
                                                    <Link href="/categories" className="text-primary hover:underline">
                                                        Create a category first
                                                    </Link>
                                                </p>
                                            ) : (
                                                <p className="text-xs text-muted-foreground">
                                                    Don't see your category?{' '}
                                                    <Link href="/categories" className="text-primary hover:underline">
                                                        Add a new category
                                                    </Link>
                                                </p>
                                            )}
                                            <InputError message={errors.category_id} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label>Product Image</Label>
                                            {/* Only show toggle when no image is selected */}
                                            {!data.image && !data.image_url && (
                                                <div className="flex gap-2 mb-2">
                                                    <Button
                                                        type="button"
                                                        variant={imageInputType === 'file' ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => setImageInputType('file')}
                                                    >
                                                        Upload File
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant={imageInputType === 'url' ? 'default' : 'outline'}
                                                        size="sm"
                                                        onClick={() => setImageInputType('url')}
                                                    >
                                                        Image URL
                                                    </Button>
                                                </div>
                                            )}
                                            {imageInputType === 'file' ? (
                                                <>
                                                    {!data.image_url && (
                                                        <Input
                                                            id="image"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    )}
                                                    {imagePreview && (
                                                        <div className="relative inline-block h-32 w-32">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Preview"
                                                                className="h-32 w-32 rounded-lg object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                                onClick={() => {
                                                                    setData('image', null);
                                                                    setImagePreview(null);
                                                                }}
                                                            >
                                                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                    <InputError message={errors.image} />
                                                </>
                                            ) : (
                                                <>
                                                    {!data.image && (
                                                        <Input
                                                            id="image_url"
                                                            type="url"
                                                            value={data.image_url}
                                                            onChange={(e) => setData('image_url', e.target.value)}
                                                            placeholder="https://example.com/image.jpg"
                                                        />
                                                    )}
                                                    {data.image_url && (
                                                        <div className="relative inline-block h-32 w-32">
                                                            <img
                                                                src={data.image_url}
                                                                alt="Preview"
                                                                className="h-32 w-32 rounded-lg object-cover"
                                                                onError={(e) => (e.currentTarget.style.display = 'none')}
                                                            />
                                                            <button
                                                                type="button"
                                                                className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                                onClick={() => setData('image_url', '')}
                                                            >
                                                                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                    <InputError message={errors.image_url} />
                                                </>
                                            )}
                                            <p className="text-xs text-muted-foreground">
                                                Upload an image or provide a URL. If left empty, no image will be shown.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Pricing</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="price">Price *</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={data.price}
                                                    onChange={(e) => setData('price', e.target.value)}
                                                    placeholder="0.00"
                                                    required
                                                />
                                                <InputError message={errors.price} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="discount">Discount %</Label>
                                                <Input
                                                    id="discount"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    max="100"
                                                    value={data.discount_percentage}
                                                    onChange={(e) => setData('discount_percentage', e.target.value)}
                                                    placeholder="0"
                                                />
                                                <InputError message={errors.discount_percentage} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inventory */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Inventory</h3>
                                        <div className="grid gap-2">
                                            <Label htmlFor="stock">Stock Quantity *</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                min="0"
                                                value={data.stock_quantity}
                                                onChange={(e) => setData('stock_quantity', e.target.value)}
                                                placeholder="0"
                                                required
                                            />
                                            <InputError message={errors.stock_quantity} />
                                        </div>
                                    </div>

                                    {/* Delivery */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Delivery</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="delivery_fee">Delivery Fee</Label>
                                                <Input
                                                    id="delivery_fee"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    value={data.delivery_fee}
                                                    onChange={(e) => setData('delivery_fee', e.target.value)}
                                                    placeholder="0.00 (Free)"
                                                />
                                                <InputError message={errors.delivery_fee} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="delivery_time">Delivery Time</Label>
                                                <Input
                                                    id="delivery_time"
                                                    value={data.delivery_time}
                                                    onChange={(e) => setData('delivery_time', e.target.value)}
                                                    placeholder="e.g., 20 mins, 2-3 days"
                                                />
                                                <InputError message={errors.delivery_time} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold">Payment</h3>
                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="payment_on_delivery"
                                                checked={data.payment_on_delivery}
                                                onCheckedChange={(checked) =>
                                                    setData('payment_on_delivery', checked as boolean)
                                                }
                                            />
                                            <Label htmlFor="payment_on_delivery">Payment on Delivery</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner className="mr-2" />}
                                        Add Product
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
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
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productList.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                                        No products in inventory. Add your first product!
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
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => viewProduct(product)}>
                                                        <span className="material-symbols-outlined mr-2 text-base">visibility</span>
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => openEditDialog(product)}>
                                                        <span className="material-symbols-outlined mr-2 text-base">edit</span>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deleteProduct(product.id)}
                                                        className="text-red-600 focus:text-red-600"
                                                    >
                                                        <span className="material-symbols-outlined mr-2 text-base">delete</span>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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

                {/* View Product Dialog */}
                <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Product Details</DialogTitle>
                            <DialogDescription>
                                Viewing details for {selectedProduct?.name}
                            </DialogDescription>
                        </DialogHeader>
                        {selectedProduct && (
                            <div className="grid gap-6">
                                <div className="flex gap-4">
                                    {selectedProduct.image_url ? (
                                        <img
                                            src={selectedProduct.image_url}
                                            alt={selectedProduct.name}
                                            className="h-32 w-32 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-muted text-sm text-muted-foreground">
                                            No image
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-2">
                                        <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Category: {selectedProduct.category?.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Slug: {selectedProduct.slug}
                                        </p>
                                        {selectedProduct.shop && (
                                            <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-muted/50">
                                                {selectedProduct.shop.image_url ? (
                                                    <img
                                                        src={selectedProduct.shop.image_url}
                                                        alt={selectedProduct.shop.name}
                                                        className="h-8 w-8 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs">
                                                        <Store className="h-4 w-4" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium">{selectedProduct.shop.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        ID: {selectedProduct.shop.public_id}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Price</p>
                                        <p className="font-semibold">
                                            {selectedProduct.discount_percentage > 0 ? (
                                                <>
                                                    <span className="text-muted-foreground line-through mr-2">
                                                        ₦{selectedProduct.price.toLocaleString()}
                                                    </span>
                                                    <span className="text-green-600">
                                                        ₦{selectedProduct.sale_price.toLocaleString()}
                                                    </span>
                                                </>
                                            ) : (
                                                `₦${selectedProduct.price.toLocaleString()}`
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Discount</p>
                                        <p className="font-semibold">{selectedProduct.discount_percentage}%</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Stock Quantity</p>
                                        <p className="font-semibold">{selectedProduct.stock_quantity}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Stock Status</p>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                selectedProduct.stock_status === 'in_stock'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                                    : selectedProduct.stock_status === 'low_stock'
                                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                                            }`}
                                        >
                                            {selectedProduct.stock_status === 'in_stock' ? 'In Stock' : selectedProduct.stock_status === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Delivery Fee</p>
                                        <p className="font-semibold">₦{selectedProduct.delivery_fee.toLocaleString()}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Delivery Time</p>
                                        <p className="font-semibold">{selectedProduct.delivery_time}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Payment on Delivery</p>
                                        <p className="font-semibold">
                                            {selectedProduct.payment_on_delivery ? 'Yes' : 'No'}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Views</p>
                                        <p className="font-semibold">{selectedProduct.views.toLocaleString()}</p>
                                    </div>
                                </div>

                                {selectedProduct.description && (
                                    <div className="space-y-1">
                                        <p className="text-sm text-muted-foreground">Description</p>
                                        <p className="text-sm">{selectedProduct.description}</p>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button variant="outline" onClick={() => setViewOpen(false)}>
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Edit Product Dialog */}
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                            <DialogDescription>
                                Update the product details.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="grid gap-4">
                                {/* Basic Product Info */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Basic Product Info</h3>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-name">Product Name *</Label>
                                        <Input
                                            id="edit-name"
                                            value={editForm.data.name}
                                            onChange={(e) => {
                                                const name = e.target.value;
                                                editForm.setData('name', name);
                                                editForm.setData('slug', generateSlug(name));
                                            }}
                                            placeholder="Enter product name"
                                            required
                                        />
                                        <InputError message={editForm.errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-slug">URL Slug</Label>
                                        <Input
                                            id="edit-slug"
                                            value={editForm.data.slug}
                                            onChange={(e) => editForm.setData('slug', e.target.value)}
                                            placeholder="product-url-slug"
                                        />
                                        <p className="text-xs text-muted-foreground">Auto-generated from product name. You can customize it.</p>
                                        <InputError message={editForm.errors.slug} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-category">Category *</Label>
                                        <Select
                                            value={editForm.data.category_id}
                                            onValueChange={(value) => editForm.setData('category_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={String(category.id)}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={editForm.errors.category_id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Product Image</Label>
                                        {/* Only show toggle when no new image is selected */}
                                        {!editForm.data.image && !editForm.data.image_url && !editForm.data.remove_image && (
                                            <div className="flex gap-2 mb-2">
                                                <Button
                                                    type="button"
                                                    variant={editImageInputType === 'file' ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setEditImageInputType('file')}
                                                >
                                                    Upload File
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant={editImageInputType === 'url' ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => setEditImageInputType('url')}
                                                >
                                                    Image URL
                                                </Button>
                                            </div>
                                        )}
                                        {editImageInputType === 'file' ? (
                                            <>
                                                {!editForm.data.image_url && !editImagePreview && !editForm.data.remove_image && (
                                                    <Input
                                                        id="edit-image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleEditImageChange}
                                                    />
                                                )}
                                                {(editImagePreview || editForm.data.image) && !editForm.data.remove_image && (
                                                    <div className="relative inline-block h-24 w-24">
                                                        <img
                                                            src={editForm.data.image ? URL.createObjectURL(editForm.data.image) : editImagePreview!}
                                                            alt="Preview"
                                                            className="h-24 w-24 rounded-lg object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                            onClick={() => {
                                                                if (editForm.data.image) {
                                                                    // Remove newly uploaded file
                                                                    editForm.setData('image', null);
                                                                } else {
                                                                    // Remove existing image
                                                                    editForm.setData('remove_image', true);
                                                                    setEditImagePreview(null);
                                                                }
                                                            }}
                                                        >
                                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                                        </button>
                                                    </div>
                                                )}
                                                {editForm.data.remove_image && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>Image will be removed on save.</span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                editForm.setData('remove_image', false);
                                                                setEditImagePreview(editingProduct?.image_url || null);
                                                            }}
                                                        >
                                                            Undo
                                                        </Button>
                                                    </div>
                                                )}
                                                <InputError message={editForm.errors.image} />
                                            </>
                                        ) : (
                                            <>
                                                {!editForm.data.image && !editForm.data.image_url && !editImagePreview && (
                                                    <Input
                                                        id="edit-image_url"
                                                        type="url"
                                                        value={editForm.data.image_url}
                                                        onChange={(e) => editForm.setData('image_url', e.target.value)}
                                                        placeholder="https://example.com/image.jpg"
                                                    />
                                                )}
                                                {editForm.data.image_url && (
                                                    <div className="relative inline-block h-24 w-24">
                                                        <img
                                                            src={editForm.data.image_url}
                                                            alt="Preview"
                                                            className="h-24 w-24 rounded-lg object-cover"
                                                            onError={(e) => (e.currentTarget.style.display = 'none')}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                            onClick={() => editForm.setData('image_url', '')}
                                                        >
                                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                                        </button>
                                                    </div>
                                                )}
                                                {/* Show existing image in URL mode if no new URL entered */}
                                                {!editForm.data.image_url && editImagePreview && !editForm.data.remove_image && (
                                                    <div className="relative inline-block h-24 w-24">
                                                        <img
                                                            src={editImagePreview}
                                                            alt="Current image"
                                                            className="h-24 w-24 rounded-lg object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                            onClick={() => {
                                                                editForm.setData('remove_image', true);
                                                                setEditImagePreview(null);
                                                            }}
                                                        >
                                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                                        </button>
                                                    </div>
                                                )}
                                                {editForm.data.remove_image && (
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <span>Image will be removed on save.</span>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                editForm.setData('remove_image', false);
                                                                setEditImagePreview(editingProduct?.image_url || null);
                                                            }}
                                                        >
                                                            Undo
                                                        </Button>
                                                    </div>
                                                )}
                                                <InputError message={editForm.errors.image_url} />
                                            </>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Upload an image or provide a URL. Leave empty to keep current or remove image.
                                        </p>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Input
                                            id="edit-description"
                                            value={editForm.data.description}
                                            onChange={(e) => editForm.setData('description', e.target.value)}
                                            placeholder="Enter product description"
                                        />
                                        <InputError message={editForm.errors.description} />
                                    </div>
                                </div>

                                {/* Pricing */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Pricing</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-price">Price (₦) *</Label>
                                            <Input
                                                id="edit-price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={editForm.data.price}
                                                onChange={(e) => editForm.setData('price', e.target.value)}
                                                placeholder="0.00"
                                                required
                                            />
                                            <InputError message={editForm.errors.price} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-discount">Discount (%)</Label>
                                            <Input
                                                id="edit-discount"
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={editForm.data.discount_percentage}
                                                onChange={(e) => editForm.setData('discount_percentage', e.target.value)}
                                                placeholder="0"
                                            />
                                            <InputError message={editForm.errors.discount_percentage} />
                                        </div>
                                    </div>
                                </div>

                                {/* Stock */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Stock</h3>
                                    <div className="grid gap-2">
                                        <Label htmlFor="edit-stock">Stock Quantity *</Label>
                                        <Input
                                            id="edit-stock"
                                            type="number"
                                            min="0"
                                            value={editForm.data.stock_quantity}
                                            onChange={(e) => editForm.setData('stock_quantity', e.target.value)}
                                            placeholder="0"
                                            required
                                        />
                                        <InputError message={editForm.errors.stock_quantity} />
                                    </div>
                                </div>

                                {/* Delivery */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Delivery</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-delivery-fee">Delivery Fee (₦)</Label>
                                            <Input
                                                id="edit-delivery-fee"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                value={editForm.data.delivery_fee}
                                                onChange={(e) => editForm.setData('delivery_fee', e.target.value)}
                                                placeholder="0.00"
                                            />
                                            <InputError message={editForm.errors.delivery_fee} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor="edit-delivery-time">Delivery Time</Label>
                                            <Input
                                                id="edit-delivery-time"
                                                value={editForm.data.delivery_time}
                                                onChange={(e) => editForm.setData('delivery_time', e.target.value)}
                                                placeholder="e.g., 2-3 days"
                                            />
                                            <InputError message={editForm.errors.delivery_time} />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Payment</h3>
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="edit-payment-on-delivery"
                                            checked={editForm.data.payment_on_delivery}
                                            onCheckedChange={(checked) =>
                                                editForm.setData('payment_on_delivery', checked as boolean)
                                            }
                                        />
                                        <Label htmlFor="edit-payment-on-delivery">Payment on Delivery</Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={editForm.processing}>
                                    {editForm.processing && <Spinner className="mr-2" />}
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
