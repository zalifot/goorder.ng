import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Ban, Building2, Eye, EyeOff, Plus, Search, Shield, ShieldCheck, Store, Trash2, User, UserCog, Users, X } from 'lucide-react';
import { useState } from 'react';

interface UserData {
    id: number;
    name: string | null;
    username: string | null;
    email: string;
    role: string;
    shops_count: number;
    is_banned?: boolean;
    created_at: string;
}

interface PaginatedUsers {
    data: UserData[];
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

interface Stats {
    total: number;
    customers: number;
    shop_owners: number;
    admins: number;
}

interface Props {
    users: PaginatedUsers;
    filters: {
        search?: string;
        role?: string;
    };
    stats: Stats;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
];

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-NG', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

function getRoleBadgeVariant(role: string): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (role) {
        case 'super_admin':
            return 'destructive';
        case 'admin':
            return 'default';
        case 'staff':
            return 'secondary';
        default:
            return 'outline';
    }
}

function getRoleIcon(role: string) {
    switch (role) {
        case 'super_admin':
            return <ShieldCheck className="h-3 w-3" />;
        case 'admin':
            return <Shield className="h-3 w-3" />;
        case 'staff':
            return <UserCog className="h-3 w-3" />;
        default:
            return <User className="h-3 w-3" />;
    }
}

export default function PlatformUsers({ users, filters, stats }: Props) {
    const { auth } = usePage().props as { auth: { user: { role: string } } };
    const isSuperAdmin = auth.user.role === 'super_admin';
    
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || 'all');
    const [showAddAdmin, setShowAddAdmin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const adminForm = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'admin',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/users', {
            search: search || undefined,
            role: role !== 'all' ? role : undefined,
        }, { preserveState: true });
    };

    const handleRoleChange = (value: string) => {
        setRole(value);
        router.get('/users', {
            search: search || undefined,
            role: value !== 'all' ? value : undefined,
        }, { preserveState: true });
    };

    const clearFilters = () => {
        setSearch('');
        setRole('all');
        router.get('/users');
    };

    const toggleBan = (userId: number) => {
        if (confirm('Are you sure you want to change this user\'s ban status?')) {
            router.patch(`/users/${userId}/toggle-status`, {}, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const deleteAdmin = (userId: number) => {
        if (confirm('Are you sure you want to delete this admin? This action cannot be undone.')) {
            router.delete(`/platform/admins/${userId}`, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    const handleCreateAdmin = (e: React.FormEvent) => {
        e.preventDefault();
        adminForm.post('/platform/admins', {
            preserveScroll: true,
            onSuccess: () => {
                setShowAddAdmin(false);
                adminForm.reset();
            },
        });
    };

    const hasFilters = filters.search || filters.role;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Users" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Platform Users</h1>
                        <p className="text-muted-foreground">
                            Manage all users across the platform ({users.total} total)
                        </p>
                    </div>
                    
                    {/* Super Admin Only - Add Admin Button */}
                    {isSuperAdmin && (
                        <Dialog open={showAddAdmin} onOpenChange={setShowAddAdmin}>
                            <DialogTrigger asChild>
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add Admin
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Create Admin User</DialogTitle>
                                    <DialogDescription>
                                        Add a new admin or super admin to the platform.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleCreateAdmin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="admin-name">Full Name</Label>
                                        <Input
                                            id="admin-name"
                                            value={adminForm.data.name}
                                            onChange={(e) => adminForm.setData('name', e.target.value)}
                                            placeholder="John Doe"
                                            required
                                        />
                                        {adminForm.errors.name && (
                                            <p className="text-sm text-destructive">{adminForm.errors.name}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="admin-email">Email Address</Label>
                                        <Input
                                            id="admin-email"
                                            type="email"
                                            value={adminForm.data.email}
                                            onChange={(e) => adminForm.setData('email', e.target.value)}
                                            placeholder="admin@goorder.ng"
                                            required
                                        />
                                        {adminForm.errors.email && (
                                            <p className="text-sm text-destructive">{adminForm.errors.email}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="admin-role">Role</Label>
                                        <Select
                                            value={adminForm.data.role}
                                            onValueChange={(value) => adminForm.setData('role', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Admin</SelectItem>
                                                <SelectItem value="super_admin">Super Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {adminForm.errors.role && (
                                            <p className="text-sm text-destructive">{adminForm.errors.role}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="admin-password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="admin-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={adminForm.data.password}
                                                onChange={(e) => adminForm.setData('password', e.target.value)}
                                                placeholder="Password"
                                                className="pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {adminForm.errors.password && (
                                            <p className="text-sm text-destructive">{adminForm.errors.password}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="admin-password-confirm">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="admin-password-confirm"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={adminForm.data.password_confirmation}
                                                onChange={(e) => adminForm.setData('password_confirmation', e.target.value)}
                                                placeholder="Confirm password"
                                                className="pr-10"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                        {adminForm.errors.password_confirmation && (
                                            <p className="text-sm text-destructive">{adminForm.errors.password_confirmation}</p>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button type="button" variant="outline" onClick={() => setShowAddAdmin(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={adminForm.processing}>
                                            {adminForm.processing ? 'Creating...' : 'Create Admin'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Customers</CardTitle>
                            <User className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.customers}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Shop Owners</CardTitle>
                            <Building2 className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.shop_owners}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Admins</CardTitle>
                            <Shield className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.admins}</div>
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
                                    placeholder="Search by name, email, username..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={role} onValueChange={handleRoleChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    <SelectItem value="user">Customers</SelectItem>
                                    <SelectItem value="shop_owner">Shop Owners</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="admin">Admins</SelectItem>
                                    <SelectItem value="super_admin">Super Admins</SelectItem>
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

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                        <CardDescription>
                            A list of all registered users on the platform
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Shops</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.data.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                                                    <Users className="h-4 w-4 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">
                                                        {user.name || user.username || 'No name'}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getRoleBadgeVariant(user.role)} className="gap-1">
                                                {getRoleIcon(user.role)}
                                                {user.role === 'user' ? 'customer' : user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {user.shops_count > 0 ? (
                                                <div className="flex items-center gap-1">
                                                    <Store className="h-4 w-4 text-muted-foreground" />
                                                    {user.shops_count}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {user.is_banned ? (
                                                <Badge variant="destructive" className="gap-1">
                                                    <Ban className="h-3 w-3" />
                                                    Banned
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-green-600 border-green-600">
                                                    Active
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{formatDate(user.created_at)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Only show ban button for non-admin users or if current user is super_admin */}
                                                {user.role !== 'super_admin' && (
                                                    <Button
                                                        variant={user.is_banned ? 'outline' : 'ghost'}
                                                        size="sm"
                                                        onClick={() => toggleBan(user.id)}
                                                        title={user.is_banned ? 'Unban User' : 'Ban User'}
                                                    >
                                                        <Ban className={`h-4 w-4 ${user.is_banned ? 'text-green-600' : 'text-red-600'}`} />
                                                        {user.is_banned ? 'Unban' : 'Ban'}
                                                    </Button>
                                                )}
                                                {/* Super admin can delete other admins */}
                                                {isSuperAdmin && ['admin', 'super_admin'].includes(user.role) && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => deleteAdmin(user.id)}
                                                        title="Delete Admin"
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {users.data.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No users found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <p className="text-sm text-muted-foreground">
                                    Showing {(users.current_page - 1) * users.per_page + 1} to{' '}
                                    {Math.min(users.current_page * users.per_page, users.total)} of {users.total} users
                                </p>
                                <div className="flex gap-2">
                                    {users.links.map((link, index) => (
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
