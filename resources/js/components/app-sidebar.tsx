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
import { dashboard } from '@/routes';
import { type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Activity, Building2, FolderTree, LayoutGrid, Package, Plug, Receipt, Settings, Shield, ShoppingCart, Store, Truck, UserCog, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

// Items visible to owners and admins only
const ownerNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventory',
        href: '/inventory',
        icon: Package,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: FolderTree,
    },
    {
        title: 'Shops',
        href: '/shops',
        icon: Store,
    },
    {
        title: 'Delivery Options',
        href: '/delivery-options',
        icon: Truck,
    },
    {
        title: 'Orders',
        href: '/orders',
        icon: ShoppingCart,
    },
    {
        title: 'Transactions',
        href: '/transactions',
        icon: Receipt,
    },
    {
        title: 'Wallet',
        href: '/wallet',
        icon: Wallet,
    },
    {
        title: 'Integrations',
        href: '/integrations',
        icon: Plug,
    },
    {
        title: 'Systems',
        href: '/systems',
        icon: Settings,
    },
];

// Items visible to staff only (they can see assigned shops)
const staffNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'My Shops',
        href: '/staff/shops',
        icon: Store,
    },
    {
        title: 'Orders',
        href: '/orders',
        icon: ShoppingCart,
    },
];

const managementGroups: NavGroup[] = [
    {
        title: 'User Management',
        icon: Users,
        items: [
            {
                title: 'Staff',
                href: '/manage/staff',
                icon: UserCog,
            },
            {
                title: 'Roles',
                href: '/manage/roles',
                icon: Shield,
            },
            {
                title: 'Users',
                href: '/users',
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
                href: '/platform/analytics',
                icon: Activity,
            },
            {
                title: 'All Shops',
                href: '/platform/shops',
                icon: Building2,
            },
            {
                title: 'All Users',
                href: '/platform/users',
                icon: Users,
            },
        ],
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as { auth: { permissions?: { isAdmin: boolean; isShopOwner: boolean; isStaff: boolean } } };
    const permissions = auth?.permissions;

    // Determine which nav items to show
    const isOwnerOrAdmin = permissions?.isAdmin || permissions?.isShopOwner;
    const isAdmin = permissions?.isAdmin;
    const navItems = isOwnerOrAdmin ? ownerNavItems : staffNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
                {isOwnerOrAdmin && <NavGroups groups={managementGroups} />}
                {isAdmin && <NavGroups groups={platformGroups} />}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
