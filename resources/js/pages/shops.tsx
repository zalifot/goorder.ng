import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ExternalLink, MoreHorizontal, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Shop {
    id: number;
    public_id: string;
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    image: string | null;
    image_url: string | null;
    is_active: boolean;
    is_under_construction: boolean;
}

interface Props {
    shops: Shop[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Shops',
        href: '/shops',
    },
];

export default function Shops({ shops }: Props) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [imageInputType, setImageInputType] = useState<'file' | 'url'>('file');
    const [editImageInputType, setEditImageInputType] = useState<'file' | 'url'>('file');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        address: '',
        image: null as File | null,
        image_url: '',
    });

    const editForm = useForm({
        name: '',
        description: '',
        address: '',
        image: null as File | null,
        image_url: '',
        remove_image: false,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setData('image_url', '');
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
            editForm.setData('image_url', '');
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/shops', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setOpen(false);
                setImagePreview(null);
                setImageInputType('file');
            },
        });
    };

    const openEditDialog = (shop: Shop) => {
        setEditingShop(shop);
        const isExternalUrl = shop.image && (shop.image.startsWith('http://') || shop.image.startsWith('https://'));
        setEditImageInputType(isExternalUrl ? 'url' : 'file');
        editForm.setData({
            name: shop.name,
            description: shop.description || '',
            address: shop.address || '',
            image: null,
            image_url: isExternalUrl && shop.image ? shop.image : '',
            remove_image: false,
        });
        setEditImagePreview(shop.image_url);
        setEditOpen(true);
    };

    const submitEdit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!editingShop) return;
        router.post(`/shops/${editingShop.id}`, {
            _method: 'PUT',
            name: editForm.data.name,
            description: editForm.data.description,
            address: editForm.data.address,
            image: editForm.data.image,
            image_url: editForm.data.image_url,
            remove_image: editForm.data.remove_image,
        }, {
            forceFormData: true,
            onSuccess: () => {
                editForm.reset();
                setEditOpen(false);
                setEditImagePreview(null);
                setEditingShop(null);
                setEditImageInputType('file');
            },
        });
    };

    const deleteShop = (id: number) => {
        if (confirm('Are you sure you want to delete this shop? All products assigned to this shop will be unassigned.')) {
            router.delete(`/shops/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Shops" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Shops</h1>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Shop
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Shop</DialogTitle>
                                <DialogDescription>
                                    Create a new shop to organize your products.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Shop Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter shop name"
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
                                            placeholder="Enter shop description"
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="address">Shop Address</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder="Enter shop address (for pickup)"
                                        />
                                        <InputError message={errors.address} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Shop Image</Label>
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
                                        Add Shop
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Public ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Shop Name</TableHead>
                                <TableHead className="text-center">Active</TableHead>
                                <TableHead className="text-center">Under Construction</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shops.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                                        No shops yet. Create your first shop!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                shops.map((shop) => (
                                    <TableRow key={shop.id}>
                                        <TableCell>
                                            <code className="rounded bg-muted px-2 py-1 text-sm font-mono">
                                                {shop.public_id}
                                            </code>
                                        </TableCell>
                                        <TableCell>
                                            {shop.image_url ? (
                                                <img
                                                    src={shop.image_url}
                                                    alt={shop.name}
                                                    className="h-12 w-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-xs text-muted-foreground">
                                                    No image
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">{shop.name}</TableCell>
                                        <TableCell className="text-center">
                                            <Switch
                                                checked={shop.is_active}
                                                onCheckedChange={(checked) => {
                                                    router.patch(`/shops/${shop.id}/toggle-active`, { is_active: checked }, { preserveScroll: true });
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Switch
                                                checked={shop.is_under_construction}
                                                onCheckedChange={(checked) => {
                                                    router.patch(`/shops/${shop.id}/toggle-construction`, { is_under_construction: checked }, { preserveScroll: true });
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => openEditDialog(shop)}>
                                                        <span className="material-symbols-outlined mr-2 text-base">edit</span>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => router.visit(`/manage/shop/${shop.public_id}`)}>
                                                        <span className="material-symbols-outlined mr-2 text-base">settings</span>
                                                        Manage Store
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <a
                                                            href={`/vendor/${shop.public_id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <ExternalLink className="mr-2 h-4 w-4" />
                                                            View Public Page
                                                        </a>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => deleteShop(shop.id)}
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

                {/* Edit Shop Dialog */}
                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit Shop</DialogTitle>
                            <DialogDescription>
                                Update the shop details.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={submitEdit} className="space-y-4">
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="edit-name">Shop Name *</Label>
                                    <Input
                                        id="edit-name"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        placeholder="Enter shop name"
                                        required
                                    />
                                    <InputError message={editForm.errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Input
                                        id="edit-description"
                                        value={editForm.data.description}
                                        onChange={(e) => editForm.setData('description', e.target.value)}
                                        placeholder="Enter shop description"
                                    />
                                    <InputError message={editForm.errors.description} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="edit-address">Shop Address</Label>
                                    <Input
                                        id="edit-address"
                                        value={editForm.data.address}
                                        onChange={(e) => editForm.setData('address', e.target.value)}
                                        placeholder="Enter shop address (for pickup)"
                                    />
                                    <InputError message={editForm.errors.address} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Shop Image</Label>
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
                                                            setEditImagePreview(editingShop?.image_url || null);
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
