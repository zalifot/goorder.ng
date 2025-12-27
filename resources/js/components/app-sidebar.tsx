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
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FolderTree, LayoutGrid, Package, Plug, Receipt, ShoppingCart, Store, Truck, UserCog, Users, Wallet } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
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
        title: 'Staff',
        href: '/manage/staff',
        icon: UserCog,
    },
    {
        title: 'Users',
        href: '/users',
        icon: Users,
    },
];

export function AppSidebar() {
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
