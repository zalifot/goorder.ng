import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronRight, File, Folder, Shield, Store, User, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Systems',
        href: '/systems',
    },
];

interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    description?: string;
}

const fileStructure: FileNode[] = [
    {
        name: 'app/',
        type: 'folder',
        description: 'Core application logic',
        children: [
            {
                name: 'Http/Controllers/',
                type: 'folder',
                description: 'Request handlers',
                children: [
                    { name: 'DashboardController.php', type: 'file', description: 'Admin analytics dashboard' },
                    { name: 'CategoryController.php', type: 'file', description: 'Category CRUD operations' },
                    { name: 'ProductController.php', type: 'file', description: 'Product & inventory management' },
                    { name: 'ShopController.php', type: 'file', description: 'Shop management' },
                    { name: 'StaffController.php', type: 'file', description: 'Staff management' },
                    { name: 'DeliveryOptionController.php', type: 'file', description: 'Delivery states, locations, slots' },
                ],
            },
            {
                name: 'Models/',
                type: 'folder',
                description: 'Database models',
                children: [
                    { name: 'User.php', type: 'file', description: 'User accounts (admin, user roles)' },
                    { name: 'Shop.php', type: 'file', description: 'Shop/vendor stores' },
                    { name: 'Product.php', type: 'file', description: 'Product catalog' },
                    { name: 'Category.php', type: 'file', description: 'Product categories' },
                    { name: 'Order.php', type: 'file', description: 'Customer orders' },
                    { name: 'OrderItem.php', type: 'file', description: 'Order line items' },
                    { name: 'DeliveryState.php', type: 'file', description: 'Delivery states/regions' },
                    { name: 'DeliveryLocation.php', type: 'file', description: 'Delivery locations within states' },
                    { name: 'DeliverySlot.php', type: 'file', description: 'Delivery time slots' },
                ],
            },
        ],
    },
    {
        name: 'resources/js/',
        type: 'folder',
        description: 'Frontend React/TypeScript code',
        children: [
            {
                name: 'pages/',
                type: 'folder',
                description: 'Page components',
                children: [
                    { name: 'dashboard.tsx', type: 'file', description: 'Admin analytics dashboard' },
                    { name: 'user-dashboard.tsx', type: 'file', description: 'User dashboard' },
                    { name: 'categories.tsx', type: 'file', description: 'Category management' },
                    { name: 'products.tsx', type: 'file', description: 'Product management' },
                    { name: 'shops.tsx', type: 'file', description: 'Shop listing' },
                    { name: 'orders.tsx', type: 'file', description: 'Order management' },
                    { name: 'inventory-dashboard.tsx', type: 'file', description: 'Inventory overview' },
                    { name: 'delivery-options.tsx', type: 'file', description: 'Delivery configuration' },
                    { name: 'staff.tsx', type: 'file', description: 'Staff management' },
                    { name: 'users.tsx', type: 'file', description: 'User management' },
                ],
            },
            {
                name: 'components/',
                type: 'folder',
                description: 'Reusable UI components',
                children: [
                    { name: 'app-sidebar.tsx', type: 'file', description: 'Admin sidebar navigation' },
                    { name: 'user-sidebar.tsx', type: 'file', description: 'User sidebar navigation' },
                    { name: 'ui/', type: 'folder', description: 'shadcn/ui components' },
                ],
            },
            {
                name: 'layouts/',
                type: 'folder',
                description: 'Page layouts',
                children: [
                    { name: 'app-layout.tsx', type: 'file', description: 'Admin layout with sidebar' },
                    { name: 'user-layout.tsx', type: 'file', description: 'User layout with sidebar' },
                ],
            },
        ],
    },
    {
        name: 'routes/',
        type: 'folder',
        description: 'Route definitions',
        children: [
            { name: 'web.php', type: 'file', description: 'All web routes' },
            { name: 'settings.php', type: 'file', description: 'Settings routes' },
        ],
    },
    {
        name: 'database/migrations/',
        type: 'folder',
        description: 'Database migrations',
    },
];

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
    return (
        <div style={{ marginLeft: depth * 16 }}>
            <div className="flex items-center gap-2 py-1">
                {node.type === 'folder' ? (
                    <Folder className="h-4 w-4 text-yellow-500" />
                ) : (
                    <File className="h-4 w-4 text-blue-500" />
                )}
                <span className={node.type === 'folder' ? 'font-medium' : ''}>{node.name}</span>
                {node.description && (
                    <span className="text-xs text-muted-foreground">— {node.description}</span>
                )}
            </div>
            {node.children?.map((child, index) => (
                <FileTreeNode key={index} node={child} depth={depth + 1} />
            ))}
        </div>
    );
}

export default function Systems() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Systems" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">System Documentation</h1>
                </div>

                {/* Account Types Section */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Account Types & Roles</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {/* Super Admin */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                        <Shield className="h-5 w-5 text-red-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Super Admin</CardTitle>
                                        <CardDescription>role: super_admin</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Full system access</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Manage all shops, products, users</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Access admin dashboard</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Global delivery options</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Staff management</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Admin */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                                        <Users className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Admin</CardTitle>
                                        <CardDescription>role: admin</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Access admin dashboard</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Create and manage own shops</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Manage products in their shops</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Set shop-specific delivery options</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>View orders for their shops</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Regular User */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                        <User className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">User</CardTitle>
                                        <CardDescription>role: user</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <ul className="space-y-2">
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Access user dashboard</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Browse vendor shops</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Add products to cart</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Place and track orders</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <ChevronRight className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                        <span>Manage favorites</span>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Shop Account Section */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Shop Structure</h2>
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                    <Store className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">Shop / Vendor Store</CardTitle>
                                    <CardDescription>Created by admin or super_admin users</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <h4 className="font-medium mb-2">Shop Properties</h4>
                                    <ul className="text-sm space-y-1">
                                        <li><code className="bg-muted px-1 rounded">public_id</code> — Unique 8-char identifier (e.g., ABC12345)</li>
                                        <li><code className="bg-muted px-1 rounded">name</code> — Shop display name</li>
                                        <li><code className="bg-muted px-1 rounded">slug</code> — URL-friendly name</li>
                                        <li><code className="bg-muted px-1 rounded">description</code> — Shop description</li>
                                        <li><code className="bg-muted px-1 rounded">address</code> — Physical address</li>
                                        <li><code className="bg-muted px-1 rounded">image</code> — Shop logo/image</li>
                                        <li><code className="bg-muted px-1 rounded">is_active</code> — Shop visibility</li>
                                        <li><code className="bg-muted px-1 rounded">is_under_construction</code> — Maintenance mode</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Staff Access</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Shops can have staff members assigned via the <code className="bg-muted px-1 rounded">staff_shops</code> pivot table.
                                    </p>
                                    <ul className="text-sm space-y-1">
                                        <li>• Owner (user_id) — Full control</li>
                                        <li>• Staff — Limited access based on role</li>
                                    </ul>
                                    <h4 className="font-medium mt-4 mb-2">Public URL</h4>
                                    <p className="text-sm text-muted-foreground">
                                        <code className="bg-muted px-1 rounded">/vendor/{'{public_id}'}</code>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* File Structure Section */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">File Structure</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="font-mono text-sm">
                                {fileStructure.map((node, index) => (
                                    <FileTreeNode key={index} node={node} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Authentication Flow */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Authentication Flow</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Vendor/Admin Login</CardTitle>
                                <CardDescription>/vendor-login</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <ol className="space-y-2 list-decimal list-inside">
                                    <li>User enters email and password</li>
                                    <li>System checks if role is <code className="bg-muted px-1 rounded">admin</code> or <code className="bg-muted px-1 rounded">super_admin</code></li>
                                    <li>If valid, redirects to <code className="bg-muted px-1 rounded">/dashboard</code></li>
                                    <li>Uses AppLayout with admin sidebar</li>
                                </ol>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">User Login</CardTitle>
                                <CardDescription>/login</CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm">
                                <ol className="space-y-2 list-decimal list-inside">
                                    <li>User enters email and password</li>
                                    <li>System authenticates user</li>
                                    <li>If role is user, redirects to <code className="bg-muted px-1 rounded">/user-dashboard</code></li>
                                    <li>If admin/super_admin, redirects to <code className="bg-muted px-1 rounded">/dashboard</code></li>
                                </ol>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Database Tables */}
                <div>
                    <h2 className="mb-4 text-lg font-semibold text-muted-foreground">Key Database Tables</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <div>
                                    <h4 className="font-medium mb-2">Users & Auth</h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• users</li>
                                        <li>• password_reset_tokens</li>
                                        <li>• sessions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Shops & Products</h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• shops</li>
                                        <li>• products</li>
                                        <li>• categories</li>
                                        <li>• staff_shops</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-2">Orders & Delivery</h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>• orders</li>
                                        <li>• order_items</li>
                                        <li>• delivery_states</li>
                                        <li>• delivery_locations</li>
                                        <li>• delivery_slots</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
