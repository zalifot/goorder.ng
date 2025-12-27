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
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Heart, LayoutGrid, ShoppingBag, ShoppingCart, Store } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/user-dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Orders',
        href: '/user/orders',
        icon: ShoppingBag,
    },
    {
        title: 'Cart',
        href: '/user/cart',
        icon: ShoppingCart,
    },
    {
        title: 'Favorites',
        href: '/user/favorites',
        icon: Heart,
    },
    {
        title: 'Shops',
        href: '/shops',
        icon: Store,
    },
];

export function UserSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/user-dashboard" prefetch>
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
