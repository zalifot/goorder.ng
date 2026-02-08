import { NavGroups } from '@/components/nav-groups';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes/vendor';
import { type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, Building2, FolderTree, LayoutGrid, Package, Plug, Receipt, Shield, ShoppingCart, Store, Truck, UserCog, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

// Items visible to owners and admins only
const ownerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: '/vendor/inventory',
        icon: Package,
    },
    {
        title: 'Product Categories',
        href: '/vendor/product-categories',
        icon: FolderTree,
    },
    {
        title: 'Shops',
        href: '/vendor/shops',
        icon: Store,
    },
    {
        title: 'Delivery Options',
        href: '/vendor/delivery-options',
        icon: Truck,
    },
    {
        title: 'Orders',
        href: '/vendor/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Transactions',
        href: '/vendor/transactions',
        icon: Receipt,
    },
    {
        title: 'Wallet',
        href: '/vendor/wallet',
        icon: Wallet,
    },
    {
        title: 'Integrations',
        href: '/vendor/integrations',
        icon: Plug,
    },
];

// Items visible to staff only (they can see assigned shops)
const staffNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
        icon: LayoutGrid,
    },
    {
        title: 'My Shops',
        href: '/vendor/staff/shops',
        icon: Store,
    },
    {
        title: 'Orders',
        href: '/vendor/orders',
        icon: ShoppingCart,
    },
];

// Management groups for shop owners (no Users access)
const ownerManagementGroups: NavGroup[] = [
    {
        title: 'User Management',
        icon: Users,
        items: [
            {
                title: 'Staff',
                href: '/vendor/manage/staff',
                icon: UserCog,
            },
            {
                title: 'Roles',
                href: '/vendor/manage/roles',
                icon: Shield,
            },
        ],
    },
];

// Management groups for admins (includes Users)
const adminManagementGroups: NavGroup[] = [
    {
        title: 'User Management',
        icon: Users,
        items: [
            {
                title: 'Staff',
                href: '/vendor/manage/staff',
                icon: UserCog,
            },
            {
                title: 'Roles',
                href: '/vendor/manage/roles',
                icon: Shield,
            },
            {
                title: 'Users',
                href: '/vendor/users',
                icon: Users,
            },
        ],
    },
];

// Admin-only platform management
const platformGroups: NavGroup[] = [
    {
        title: 'Platform',
        icon: Activity,
        items: [
            {
                title: 'Analytics',
                href: '/vendor/platform/analytics',
                icon: Activity,
            },
            {
                title: 'General Categories',
                href: '/vendor/general-categories',
                icon: FolderTree,
            },
            {
                title: 'All Shops',
                href: '/vendor/platform/shops',
                icon: Building2,
            },
            {
                title: 'All Users',
                href: '/vendor/platform/users',
                icon: Users,
            },
        ],
    },
];

// Items visible to standard users
const userNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/customer/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Orders',
        href: '/customer/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Cart',
        href: '/customer/cart',
        icon: Package,
    },
    {
        title: 'Favorites',
        href: '/customer/favorites',
        icon: Store,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as unknown as { auth: { user: { role: string }, permissions?: { isAdmin: boolean; isShopOwner: boolean; isStaff: boolean } } };
    const permissions = auth?.permissions;
    const userRole = auth?.user?.role;

    // Determine which nav items to show
    const isOwnerOrAdmin = permissions?.isAdmin || permissions?.isShopOwner;
    const isAdmin = permissions?.isAdmin;

    let navItems = isOwnerOrAdmin ? ownerNavItems : staffNavItems;

    // If not admin/owner/staff (i.e., just a user), show user items
    if (!permissions?.isAdmin && !permissions?.isShopOwner && !permissions?.isStaff) {
        navItems = userNavItems;
    }

    if (userRole === 'user') {
        navItems = userNavItems;
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={userRole === 'user' ? '/customer/dashboard' : dashboard().url} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
                {isAdmin && <NavGroups groups={adminManagementGroups} />}
                {!isAdmin && permissions?.isShopOwner && <NavGroups groups={ownerManagementGroups} />}
                {isAdmin && <NavGroups groups={platformGroups} />}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
