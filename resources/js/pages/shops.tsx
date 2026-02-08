import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { CountryStateSelect } from '@/components/country-state-select';
import { GooglePlacesAutocomplete } from '@/components/google-places-autocomplete';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { BarChart3, ExternalLink, MoreHorizontal, Plus } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface GeneralCategory {
    id: number;
    name: string;
    icon: string | null;
}

interface Shop {
    id: number;
    public_id: string;
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    general_category_id: number | null;
    general_category?: GeneralCategory;
    country_code: string | null;
    state_code: string | null;
    latitude: number | null;
    longitude: number | null;
    place_id: string | null;
    formatted_address: string | null;
    image: string | null;
    image_url: string | null;
    is_active: boolean;
    is_under_construction: boolean;
}

interface Props {
    shops: Shop[];
    generalCategories: GeneralCategory[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Shops',
        href: '/vendor/shops',
    },
];

export default function Shops({ shops, generalCategories }: Props) {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editingShop, setEditingShop] = useState<Shop | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
    const [imageInputType, setImageInputType] = useState<'file' | 'url'>('file');
    const [editImageInputType, setEditImageInputType] = useState<'file' | 'url'>('file');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        general_category_id: '',
        description: '',
        address: '',
        country_code: '',
        state_code: '',
        latitude: null as number | null,
        longitude: null as number | null,
        place_id: '',
        formatted_address: '',
        image: null as File | null,
        image_url: '',
    });

    const editForm = useForm({
        name: '',
        general_category_id: '',
        description: '',
        address: '',
        country_code: '',
        state_code: '',
        latitude: null as number | null,
        longitude: null as number | null,
        place_id: '',
        formatted_address: '',
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
        post('/vendor/shops', {
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
            general_category_id: shop.general_category_id?.toString() || '',
            description: shop.description || '',
            address: shop.address || '',
            country_code: shop.country_code || '',
            state_code: shop.state_code || '',
            latitude: shop.latitude,
            longitude: shop.longitude,
            place_id: shop.place_id || '',
            formatted_address: shop.formatted_address || '',
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
        router.post(`/vendor/shops/${editingShop.id}`, {
            _method: 'PUT',
            name: editForm.data.name,
            general_category_id: editForm.data.general_category_id,
            description: editForm.data.description,
            address: editForm.data.address,
            country_code: editForm.data.country_code,
            state_code: editForm.data.state_code,
            latitude: editForm.data.latitude,
            longitude: editForm.data.longitude,
            place_id: editForm.data.place_id,
            formatted_address: editForm.data.formatted_address,
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
            router.delete(`/vendor/shops/${id}`);
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
                                        <Label htmlFor="general_category_id">Business Category *</Label>
                                        <Select
                                            value={data.general_category_id}
                                            onValueChange={(value) => setData('general_category_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {generalCategories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        <div className="flex items-center gap-2">
                                                            {category.icon && (
                                                                <span className="material-symbols-outlined text-base">
                                                                    {category.icon}
                                                                </span>
                                                            )}
                                                            {category.name}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.general_category_id} />
                                    </div>

                                    <CountryStateSelect
                                        countryCode={data.country_code}
                                        stateCode={data.state_code}
                                        onCountryChange={(code) => {
                                            setData('country_code', code);
                                            setData('state_code', '');
                                        }}
                                        onStateChange={(code) => setData('state_code', code)}
                                        countryError={errors.country_code}
                                        stateError={errors.state_code}
                                        required
                                    />

                                    <GooglePlacesAutocomplete
                                        value={data.formatted_address}
                                        onChange={(value) => setData('formatted_address', value)}
                                        onPlaceSelect={(place) => {
                                            setData('formatted_address', place.formatted_address);
                                            setData('place_id', place.place_id || '');
                                            setData('latitude', place.latitude);
                                            setData('longitude', place.longitude);
                                        }}
                                        label="Location (Google Places)"
                                        placeholder="Search for your shop location"
                                        error={errors.formatted_address}
                                    />

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
                                <TableHead>Category</TableHead>
                                <TableHead className="text-center">Active</TableHead>
                                <TableHead className="text-center">Under Construction</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shops.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground">
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
                                        <TableCell>
                                            {shop.general_category ? (
                                                <div className="flex items-center gap-1.5">
                                                    {shop.general_category.icon && (
                                                        <span className="material-symbols-outlined text-base text-muted-foreground">
                                                            {shop.general_category.icon}
                                                        </span>
                                                    )}
                                                    <span className="text-sm">{shop.general_category.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Switch
                                                checked={shop.is_active}
                                                onCheckedChange={(checked) => {
                                                    router.patch(`/vendor/shops/${shop.id}/toggle-active`, { is_active: checked }, { preserveScroll: true });
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Switch
                                                checked={shop.is_under_construction}
                                                onCheckedChange={(checked) => {
                                                    router.patch(`/vendor/shops/${shop.id}/toggle-construction`, { is_under_construction: checked }, { preserveScroll: true });
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
                                                    <DropdownMenuItem onClick={() => router.visit(`/vendor/manage/shop/${shop.public_id}`)}>
                                                        <span className="material-symbols-outlined mr-2 text-base">settings</span>
                                                        Manage Store
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => router.visit(`/vendor/manage/shop/${shop.public_id}/analytics`)}>
                                                        <BarChart3 className="mr-2 h-4 w-4" />
                                                        Analytics
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <a
                                                            href={`/shop/${shop.public_id}`}
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
                                    <Label htmlFor="edit-general_category_id">Business Category *</Label>
                                    <Select
                                        value={editForm.data.general_category_id}
                                        onValueChange={(value) => editForm.setData('general_category_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {generalCategories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    <div className="flex items-center gap-2">
                                                        {category.icon && (
                                                            <span className="material-symbols-outlined text-base">
                                                                {category.icon}
                                                            </span>
                                                        )}
                                                        {category.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={editForm.errors.general_category_id} />
                                </div>

                                <CountryStateSelect
                                    countryCode={editForm.data.country_code}
                                    stateCode={editForm.data.state_code}
                                    onCountryChange={(code) => {
                                        editForm.setData('country_code', code);
                                        editForm.setData('state_code', '');
                                    }}
                                    onStateChange={(code) => editForm.setData('state_code', code)}
                                    countryError={editForm.errors.country_code}
                                    stateError={editForm.errors.state_code}
                                    required
                                />

                                <GooglePlacesAutocomplete
                                    value={editForm.data.formatted_address}
                                    onChange={(value) => editForm.setData('formatted_address', value)}
                                    onPlaceSelect={(place) => {
                                        editForm.setData('formatted_address', place.formatted_address);
                                        editForm.setData('place_id', place.place_id || '');
                                        editForm.setData('latitude', place.latitude);
                                        editForm.setData('longitude', place.longitude);
                                    }}
                                    label="Location (Google Places)"
                                    placeholder="Search for your shop location"
                                    error={editForm.errors.formatted_address}
                                />

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
