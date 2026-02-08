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
import { Plus, MoreHorizontal, Pencil, Trash2, Shield } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/vendor/dashboard' },
    { title: 'User Management', href: '/vendor/manage/staff' },
    { title: 'Roles', href: '/vendor/manage/roles' },
];

interface StaffRole {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
}

interface Props {
    roles: StaffRole[];
}

export default function Roles({ roles }: Props) {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<StaffRole | null>(null);
    const [processing, setProcessing] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
        });
    };

    const handleAddRole = () => {
        setProcessing(true);
        router.post('/vendor/manage/roles', formData, {
            onSuccess: () => {
                setIsAddDialogOpen(false);
                resetForm();
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleEditRole = () => {
        if (!selectedRole) return;
        setProcessing(true);
        router.put(`/vendor/manage/roles/${selectedRole.id}`, formData, {
            onSuccess: () => {
                setIsEditDialogOpen(false);
                setSelectedRole(null);
                resetForm();
            },
            onFinish: () => setProcessing(false),
        });
    };

    const handleDeleteRole = () => {
        if (!selectedRole) return;
        setProcessing(true);
        router.delete(`/vendor/manage/roles/${selectedRole.id}`, {
            onSuccess: () => {
                setIsDeleteDialogOpen(false);
                setSelectedRole(null);
            },
            onFinish: () => setProcessing(false),
        });
    };

    const openEditDialog = (role: StaffRole) => {
        setSelectedRole(role);
        setFormData({
            name: role.name,
            description: role.description || '',
        });
        setIsEditDialogOpen(true);
    };

    const openDeleteDialog = (role: StaffRole) => {
        setSelectedRole(role);
        setIsDeleteDialogOpen(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Staff Roles" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Staff Roles</h1>
                        <p className="text-muted-foreground">
                            Define roles to assign to your staff members.
                        </p>
                    </div>
                    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={resetForm}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Role
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add Staff Role</DialogTitle>
                                <DialogDescription>
                                    Create a new role to assign to your staff members.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        placeholder="e.g., Manager, Cashier"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        placeholder="Brief description of responsibilities"
                                    />
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
                                    onClick={handleAddRole}
                                    disabled={processing || !formData.name}
                                >
                                    {processing ? 'Creating...' : 'Create Role'}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Roles Table */}
                <div className="rounded-lg border">
                    {roles.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Shield className="h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No roles defined yet</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Create your first role to get started.
                            </p>
                            <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Role
                            </Button>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Role Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {roles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                    <Shield className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-medium">{role.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {role.description || '—'}
                                        </TableCell>
                                        <TableCell>
                                            <code className="rounded bg-muted px-2 py-1 text-xs">
                                                {role.slug}
                                            </code>
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
                                                        onClick={() => openEditDialog(role)}
                                                    >
                                                        <Pencil className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-destructive"
                                                        onClick={() => openDeleteDialog(role)}
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
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
                        <DialogTitle>Edit Role</DialogTitle>
                        <DialogDescription>
                            Update the role name and description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Role Name</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Input
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditRole}
                            disabled={processing || !formData.name}
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
                        <AlertDialogTitle>Delete Role?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will delete the <strong>{selectedRole?.name}</strong> role.
                            Staff members with this role will need to be reassigned.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteRole}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {processing ? 'Deleting...' : 'Delete'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
