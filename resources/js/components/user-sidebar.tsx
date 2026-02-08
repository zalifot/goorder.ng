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
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Receipt, ShoppingBag, ShoppingCart, Store } from 'lucide-react';
import AppLogo from './app-logo';

export function UserSidebar() {
    const { cartItemCount } = usePage<{ cartItemCount: number }>().props;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/customer/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Marketplace',
            href: '/marketplace',
            icon: Store,
        },
        {
            title: 'Orders',
            href: '/customer/orders',
            icon: ShoppingBag,
        },
        {
            title: 'Transactions',
            href: '/customer/transactions',
            icon: Receipt,
        },
        {
            title: 'Cart',
            href: '/customer/cart',
            icon: ShoppingCart,
            badge: cartItemCount || undefined,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/customer/dashboard" prefetch>
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
