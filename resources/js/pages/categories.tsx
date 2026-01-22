import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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
import { Spinner } from '@/components/ui/spinner';
import { Switch } from '@/components/ui/switch';
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
import { Head, router, useForm } from '@inertiajs/react';
import { MoreHorizontal, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_url: string | null;
    is_active: boolean;
    products_count?: number;
    created_at: string;
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
    categories: PaginatedData<Category>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '/categories',
    },
];

export default function Categories({ categories }: Props) {
    const categoryList = categories.data;
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [imageInputType, setImageInputType] = useState<'file' | 'url'>('file');
    const [editImageInputType, setEditImageInputType] = useState<'file' | 'url'>('file');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        image_url: '',
    });

    const editForm = useForm({
        name: '',
        slug: '',
        description: '',
        image: null as File | null,
        image_url: '',
        remove_image: false,
    });

    const openEditDialog = (category: Category) => {
        setEditingCategory(category);
        // Check if the current image is a URL or a file path
        const isExternalUrl = category.image && (category.image.startsWith('http://') || category.image.startsWith('https://'));
        setEditImageInputType(isExternalUrl ? 'url' : 'file');
        editForm.setData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            image: null,
            image_url: isExternalUrl ? (category.image || '') : '',
            remove_image: false,
        });
        setEditImagePreview(category.image_url);
        setEditOpen(true);
    };

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
        post('/categories', {
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
        if (!editingCategory) return;
        router.post(`/categories/${editingCategory.id}`, {
            _method: 'PUT',
            name: editForm.data.name,
            slug: editForm.data.slug,
            description: editForm.data.description,
            image: editForm.data.image,
            image_url: editForm.data.image_url,
            remove_image: editForm.data.remove_image,
        }, {
            forceFormData: true,
            onSuccess: () => {
                editForm.reset();
                setEditOpen(false);
                setEditImagePreview(null);
                setEditingCategory(null);
                setEditImageInputType('file');
            },
        });
    };

    const deleteCategory = (id: number) => {
        if (confirm('Are you sure you want to delete this category? All products in this category will also be deleted.')) {
            router.delete(`/categories/${id}`);
        }
    };

    const toggleStatus = (id: number, currentStatus: boolean) => {
        router.patch(`/categories/${id}/toggle-status`, {
            is_active: !currentStatus,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Categories</h1>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Category</DialogTitle>
                                <DialogDescription>
                                    Create a new category for your products.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Category Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter category name"
                                            required
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Enter category description"
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Category Image</Label>
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
                                                {!data.image_url && !imagePreview && (
                                                    <Input
                                                        id="image"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                    />
                                                )}
                                                {imagePreview && (
                                                    <div className="relative inline-block h-24 w-24">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="h-24 w-24 rounded-lg object-cover"
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
                                                {!data.image && !data.image_url && (
                                                    <Input
                                                        id="image_url"
                                                        type="url"
                                                        value={data.image_url}
                                                        onChange={(e) => setData('image_url', e.target.value)}
                                                        placeholder="https://example.com/image.jpg"
                                                    />
                                                )}
                                                {data.image_url && (
                                                    <div className="relative inline-block h-24 w-24">
                                                        <img
                                                            src={data.image_url}
                                                            alt="Preview"
                                                            className="h-24 w-24 rounded-lg object-cover"
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
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing && <Spinner className="mr-2" />}
                                        Add Category
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Categories Table */}
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryList.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No categories yet. Add your first category!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categoryList.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            {category.image_url ? (
                                                <img
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                                                    No image
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{category.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">
                                            {category.description || '-'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={category.is_active}
                                                    onCheckedChange={() => toggleStatus(category.id, category.is_active)}
                                                />
                                                <span className={`text-sm ${category.is_active ? 'text-green-600' : 'text-muted-foreground'}`}>
                                                    {category.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                                        <span className="material-symbols-outlined mr-2 text-base">edit</span>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deleteCategory(category.id)}
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
                {categories.last_page > 1 && (
                    <div className="flex items-center justify-between px-2">
                        <p className="text-sm text-muted-foreground">
                            Showing {categories.from} to {categories.to} of {categories.total} categories
                        </p>
                        <div className="flex gap-1">
                            {categories.links.map((link, index) => (
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

                {/* Edit Category Dialog */}
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>
                                Update the category details.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Category Name *</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        placeholder="Enter category name"
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
                                        placeholder="category-url-slug"
                                    />
                                    <p className="text-xs text-muted-foreground">Used for SEO-friendly URLs. Leave empty to auto-generate from name.</p>
                                    <InputError message={editForm.errors.slug} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editForm.data.description}
                                        onChange={(e) => editForm.setData('description', e.target.value)}
                                        placeholder="Enter category description"
                                    />
                                    <InputError message={editForm.errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Category Image</Label>
                                    {/* Only show toggle when no image is selected */}
                                    {!editForm.data.image && !editForm.data.image_url && !editImagePreview && (
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
                                            {editImagePreview && !editForm.data.remove_image && (
                                                <div className="relative inline-block h-24 w-24">
                                                    <img
                                                        src={editImagePreview}
                                                        alt="Preview"
                                                        className="h-24 w-24 rounded-lg object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                        onClick={() => {
                                                            editForm.setData('remove_image', true);
                                                            editForm.setData('image', null);
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
                                                            setEditImagePreview(editingCategory?.image_url || null);
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
                                            {!editForm.data.image && !editForm.data.image_url && (
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
                                            <InputError message={editForm.errors.image_url} />
                                        </>
                                    )}
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
