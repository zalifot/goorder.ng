import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, MoreHorizontal, Pencil, Trash2, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Staff', href: '/manage/staff' },
];

interface Shop {
    id: number;
    name: string;
    public_id: string;
    role?: string;
}

interface StaffMember {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    username: string;
    role: string;
    created_at: string;
    assigned_shops: Shop[];
}

interface Props {
    staff: StaffMember[];
    shops: Shop[];
}

const staffRoles = [
    { value: 'manager', label: 'Manager', description: 'Full access to shop management' },
    { value: 'cashier', label: 'Cashier', description: 'Process orders and payments' },
    { value: 'inventory_clerk', label: 'Inventory Clerk', description: 'Manage products and stock' },
];

export default function Staff({ staff, shops }: Props) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
    const [processing, setProcessing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'cashier',
        shop_ids: [] as number[],
    });

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            role: 'cashier',
            shop_ids: [],
        });
    };

    const handleAddStaff = () => {
        setProcessing(true);
        router.post('/manage/staff', formData, {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                resetForm();
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleEditStaff = () => {
        if (!selectedStaff) return;
        setProcessing(true);
        router.put(`/manage/staff/${selectedStaff.id}`, formData, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                setSelectedStaff(null);
                resetForm();
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleDeleteStaff = () => {
        if (!selectedStaff) return;
        setProcessing(true);
        router.delete(`/manage/staff/${selectedStaff.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedStaff(null);
            },
            onFinish: () => setProcessing(false),
        });
    };

    const openEditDialog = (staffMember: StaffMember) => {
        setSelectedStaff(staffMember);
        setFormData({
            name: staffMember.name,
            email: staffMember.email,
            phone: staffMember.phone || '',
            role: staffMember.assigned_shops[0]?.role || 'cashier',
            shop_ids: staffMember.assigned_shops.map((s) => s.id),
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (staffMember: StaffMember) => {
        setSelectedStaff(staffMember);
        setIsDeleteDialogOpen(true);
    };

    const toggleShopSelection = (shopId: number) => {
        setFormData((prev) => ({
            ...prev,
            shop_ids: prev.shop_ids.includes(shopId)
                ? prev.shop_ids.filter((id) => id !== shopId)
                : [...prev.shop_ids, shopId],
        }));
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'manager':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'cashier':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'inventory_clerk':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const formatRoleLabel = (role: string) => {
        return staffRoles.find((r) => r.value === role)?.label || role;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Management" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Staff Management</h1>
                        <p className="text-muted-foreground">
                            Manage your team members and their shop access.
                        </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Staff
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add Staff Member</DialogTitle>
                                <DialogDescription>
                                    Invite a new team member and assign them to your shops.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        placeholder="+234 800 000 0000"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Role</Label>
                                    <Select
                                        value={formData.role}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, role: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {staffRoles.map((role) => (
                                                <SelectItem key={role.value} value={role.value}>
                                                    <div className="flex flex-col">
                                                        <span>{role.label}</span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {role.description}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Assign to Shops</Label>
                                    <div className="rounded-md border p-3">
                                        {shops.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">
                                                No shops available. Create a shop first.
                                            </p>
                                        ) : (
                                            <div className="space-y-2">
                                                {shops.map((shop) => (
                                                    <div
                                                        key={shop.id}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <Checkbox
                                                            id={`shop-${shop.id}`}
                                                            checked={formData.shop_ids.includes(
                                                                shop.id
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleShopSelection(shop.id)
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`shop-${shop.id}`}
                                                            className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {shop.name}
                                                        </label>
                                                        <span className="text-xs text-muted-foreground">
                                                            {shop.public_id}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {formData.shop_ids.length === 0 && (
                                        <p className="text-xs text-destructive">
                                            Select at least one shop.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsAddDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleAddStaff}
                                    disabled={
                                        processing ||
                                        !formData.name ||
                                        !formData.email ||
                                        formData.shop_ids.length === 0
                                    }
                                >
                                    {processing ? 'Adding...' : 'Add Staff'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Staff Table */}
                <div className="rounded-lg border">
                    {staff.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Users className="h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No staff members yet</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Add your first team member to get started.
                            </p>
                            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Staff
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Assigned Shops</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staff.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-medium">
                                                    {member.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()
                                                        .slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        @{member.username}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>
                                            {member.assigned_shops[0] && (
                                                <Badge
                                                    variant="secondary"
                                                    className={getRoleBadgeColor(
                                                        member.assigned_shops[0].role || ''
                                                    )}
                                                >
                                                    {formatRoleLabel(
                                                        member.assigned_shops[0].role || ''
                                                    )}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {member.assigned_shops.slice(0, 2).map((shop) => (
                                                    <Badge
                                                        key={shop.id}
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        {shop.name}
                                                    </Badge>
                                                ))}
                                                {member.assigned_shops.length > 2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{member.assigned_shops.length - 2} more
                                                    </Badge>
                                                )}
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
                                                    <DropdownMenuItem
                                                        onClick={() => openEditDialog(member)}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => openDeleteDialog(member)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Remove
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Staff Member</DialogTitle>
                        <DialogDescription>
                            Update staff member details and shop assignments.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Full Name</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-email">Email Address</Label>
                            <Input
                                id="edit-email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-phone">Phone Number</Label>
                            <Input
                                id="edit-phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, role: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {staffRoles.map((role) => (
                                        <SelectItem key={role.value} value={role.value}>
                                            <div className="flex flex-col">
                                                <span>{role.label}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {role.description}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Assign to Shops</Label>
                            <div className="rounded-md border p-3">
                                <div className="space-y-2">
                                    {shops.map((shop) => (
                                        <div key={shop.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`edit-shop-${shop.id}`}
                                                checked={formData.shop_ids.includes(shop.id)}
                                                onCheckedChange={() => toggleShopSelection(shop.id)}
                                            />
                                            <label
                                                htmlFor={`edit-shop-${shop.id}`}
                                                className="flex-1 cursor-pointer text-sm font-medium leading-none"
                                            >
                                                {shop.name}
                                            </label>
                                            <span className="text-xs text-muted-foreground">
                                                {shop.public_id}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditStaff}
                            disabled={
                                processing ||
                                !formData.name ||
                                !formData.email ||
                                formData.shop_ids.length === 0
                            }
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove Staff Member?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will remove <strong>{selectedStaff?.name}</strong> from all your
                            shops. They will no longer have access to manage your shops.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteStaff}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {processing ? 'Removing...' : 'Remove'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
