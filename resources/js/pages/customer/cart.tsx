import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronRight, Minus, Package, Plus, ShoppingCart, Store, Trash2 } from 'lucide-react';

interface Shop {
    id: number;
    name: string;
    public_id: string;
    image_url?: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    sale_price: number;
    discount_percentage: number;
    image_url?: string;
    stock_quantity: number;
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    line_total: number;
    product: Product;
}

interface Cart {
    id: number;
    shop: Shop;
    items: CartItem[];
    subtotal: number;
    item_count: number;
}

interface Props {
    carts: Cart[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cart',
        href: '/customer/cart',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function UserCart({ carts }: Props) {
    const totalItems = carts.reduce((sum, cart) => sum + cart.item_count, 0);
    const grandTotal = carts.reduce((sum, cart) => sum + cart.subtotal, 0);

    const updateQuantity = (cartItemId: number, quantity: number) => {
        router.patch(
            `/customer/cart/items/${cartItemId}`,
            { quantity },
            {
                preserveScroll: true,
            },
        );
    };

    const removeItem = (cartItemId: number) => {
        router.delete(`/customer/cart/items/${cartItemId}`, {
            preserveScroll: true,
        });
    };

    const clearCart = (cartId: number) => {
        router.delete(`/customer/cart/${cartId}`, {
            preserveScroll: true,
        });
    };

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="My Cart" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-semibold">My Cart</h1>
                        <p className="text-xs text-muted-foreground">
                            {totalItems} item{totalItems !== 1 ? 's' : ''} from {carts.length} shop{carts.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                    {carts.length > 1 && (
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Grand Total</p>
                            <p className="text-lg font-semibold">{formatCurrency(grandTotal)}</p>
                        </div>
                    )}
                </div>

                {carts.length > 0 ? (
                    <div className="space-y-6">
                        {carts.map((cart) => (
                            <Card key={cart.id} className="border border-border/40 shadow-none">
                                <CardHeader className="pb-2 pt-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                            {cart.shop.image_url ? (
                                                <img
                                                    src={cart.shop.image_url}
                                                    alt={cart.shop.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Store className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-sm font-medium">{cart.shop.name}</CardTitle>
                                            <p className="text-xs text-muted-foreground">
                                                {cart.item_count} item{cart.item_count !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/shop/${cart.shop.public_id}`}
                                                className="text-xs text-primary hover:underline flex items-center gap-1"
                                            >
                                                Visit shop
                                                <ChevronRight className="h-3 w-3" />
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                                                onClick={() => clearCart(cart.id)}
                                            >
                                                <Trash2 className="h-3 w-3 mr-1" />
                                                Clear
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-3">
                                    <div className="space-y-3">
                                        {cart.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3 py-2 border-b border-border/30 last:border-0"
                                            >
                                                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                                                    {item.product.image_url ? (
                                                        <img
                                                            src={item.product.image_url}
                                                            alt={item.product.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package className="h-6 w-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        {item.product.discount_percentage > 0 ? (
                                                            <>
                                                                <span className="text-sm font-medium text-primary">
                                                                    {formatCurrency(item.product.sale_price)}
                                                                </span>
                                                                <span className="text-xs text-muted-foreground line-through">
                                                                    {formatCurrency(item.product.price)}
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <span className="text-sm font-medium">
                                                                {formatCurrency(item.product.sale_price)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.product.stock_quantity} in stock
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center border border-border rounded-md">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-7 w-7"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= item.product.stock_quantity}
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-destructive hover:text-destructive"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="text-right flex-shrink-0 w-20">
                                                    <p className="text-sm font-semibold">{formatCurrency(item.line_total)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Cart subtotal and checkout */}
                                    <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-muted-foreground">Subtotal</p>
                                            <p className="text-lg font-semibold">{formatCurrency(cart.subtotal)}</p>
                                        </div>
                                        <Link href={`/customer/checkout?cart_id=${cart.id}`}>
                                            <Button className="px-6">Proceed to Checkout</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="border border-border/40 shadow-none">
                        <CardContent className="py-12">
                            <div className="text-center">
                                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                                <h2 className="text-sm font-medium mb-1">Your cart is empty</h2>
                                <p className="text-xs text-muted-foreground mb-4">
                                    Add products from shops to see them here.
                                </p>
                                <Link
                                    href="/marketplace"
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                                >
                                    Browse Marketplace
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </UserLayout>
    );
}
