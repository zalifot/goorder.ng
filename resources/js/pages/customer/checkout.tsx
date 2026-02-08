import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import UserLayout from '@/layouts/user-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, BadgeCheck, Banknote, CreditCard, Loader2, MapPin, Package, Smartphone, Store, Truck, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

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

interface DeliveryLocation {
    id: number;
    name: string;
    delivery_fee: number;
    is_active: boolean;
}

interface DeliveryState {
    id: number;
    name: string;
    is_active: boolean;
    locations: DeliveryLocation[];
}

interface UserInfo {
    name: string;
    email: string;
    phone: string;
}

interface Props {
    cart: Cart;
    deliveryStates: DeliveryState[];
    user: UserInfo;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cart',
        href: '/customer/cart',
    },
    {
        title: 'Checkout',
        href: '/customer/checkout',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
    }).format(amount);
}

export default function Checkout({ cart, deliveryStates, user }: Props) {
    const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');

    const { data, setData, post, processing, errors, setError } = useForm({
        cart_id: cart.id,
        customer_name: user.name,
        customer_phone: user.phone,
        customer_email: user.email,
        customer_country: '',
        customer_state: '',
        customer_city: '',
        customer_address: '',
        delivery_type: 'pickup' as 'pickup' | 'delivery',
        delivery_state_id: '',
        delivery_location_id: '',
        delivery_address: '',
        notes: '',
    });

    const selectedState = useMemo(() => {
        return deliveryStates.find((s) => s.id.toString() === data.delivery_state_id);
    }, [deliveryStates, data.delivery_state_id]);

    const selectedLocation = useMemo(() => {
        return selectedState?.locations.find((l) => l.id.toString() === data.delivery_location_id);
    }, [selectedState, data.delivery_location_id]);

    const deliveryFee = deliveryType === 'delivery' && selectedLocation ? Number(selectedLocation.delivery_fee) : 0;
    const total = Number(cart.subtotal) + deliveryFee;

    const handleDeliveryTypeChange = (type: 'pickup' | 'delivery') => {
        setDeliveryType(type);
        setData((prev) => ({
            ...prev,
            delivery_type: type,
            delivery_state_id: '',
            delivery_location_id: '',
            delivery_address: type === 'pickup' ? '' : prev.delivery_address,
        }));
    };

    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
    const [stage, setStage] = useState<'select' | 'processing' | 'done'>('select');
    const [txLogs, setTxLogs] = useState<{ text: string; done: boolean }[]>([]);
    const [orderRef] = useState(() => 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let hasErrors = false;
        if (!data.customer_name.trim()) {
            setError('customer_name', 'Full name is required');
            hasErrors = true;
        }
        if (!data.customer_phone.trim()) {
            setError('customer_phone', 'Phone number is required');
            hasErrors = true;
        }
        if (deliveryType === 'delivery') {
            if (!data.delivery_state_id) {
                setError('delivery_state_id', 'Please select a state');
                hasErrors = true;
            }
            if (!data.delivery_location_id) {
                setError('delivery_location_id', 'Please select a location');
                hasErrors = true;
            }
            if (!data.delivery_address.trim()) {
                setError('delivery_address', 'Delivery address is required');
                hasErrors = true;
            }
        }
        if (hasErrors) return;
        setStage('select');
        setTxLogs([]);
        setPaymentDialogOpen(true);
    };

    const handleConfirmPayment = () => {
        setStage('processing');
        const steps = [
            'Connecting to payment gateway...',
            `Processing ${paymentMethod === 'card' ? 'card' : paymentMethod === 'transfer' ? 'bank transfer' : 'USSD'} payment...`,
            `Authorizing ${formatCurrency(total)}...`,
            'Payment confirmed ✓',
            'Creating order in database...',
            'Updating product inventory...',
            'Sending order confirmation...',
        ];
        steps.forEach((text, i) => {
            setTimeout(() => {
                setTxLogs((prev) => [...prev, { text, done: false }]);
                setTimeout(() => {
                    setTxLogs((prev) => prev.map((l, idx) => (idx === prev.length - 1 ? { ...l, done: true } : l)));
                }, 400);
            }, i * 900);
        });

        const totalAnimTime = steps.length * 900 + 600;
        setTimeout(() => setStage('done'), totalAnimTime);
        setTimeout(() => {
            post('/customer/checkout', {
                onError: () => {
                    setStage('select');
                    toast.error('Order failed', { description: 'Please check your details and try again.' });
                },
            });
        }, totalAnimTime + 600);
    };

    return (
        <UserLayout breadcrumbs={breadcrumbs}>
            <Head title="Checkout" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => router.visit('/customer/cart')}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-lg font-semibold">Checkout</h1>
                        <p className="text-xs text-muted-foreground">Complete your order from {cart.shop.name}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Customer Info & Delivery */}
                    <div className="space-y-4">
                        {/* Customer Information */}
                        <Card className="border border-border/40 shadow-none">
                            <CardHeader className="pb-2 pt-3 px-4">
                                <CardTitle className="text-sm font-medium">Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-3">
                                <div>
                                    <Label htmlFor="customer_name" className="text-xs">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="customer_name"
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="mt-1"
                                    />
                                    {errors.customer_name && (
                                        <p className="text-xs text-destructive mt-1">{errors.customer_name}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="customer_phone" className="text-xs">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="customer_phone"
                                        value={data.customer_phone}
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        placeholder="Enter your phone number"
                                        className="mt-1"
                                    />
                                    {errors.customer_phone && (
                                        <p className="text-xs text-destructive mt-1">{errors.customer_phone}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="customer_email" className="text-xs">
                                        Email (Optional)
                                    </Label>
                                    <Input
                                        id="customer_email"
                                        type="email"
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        placeholder="Enter your email"
                                        className="mt-1"
                                    />
                                    {errors.customer_email && (
                                        <p className="text-xs text-destructive mt-1">{errors.customer_email}</p>
                                    )}
                                </div>
                                {/* Country / State / City / Address moved to Delivery Options below */}
                            </CardContent>
                        </Card>

                        {/* Delivery Options */}
                        <Card className="border border-border/40 shadow-none">
                            <CardHeader className="pb-2 pt-3 px-4">
                                <CardTitle className="text-sm font-medium">Delivery Option</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleDeliveryTypeChange('pickup')}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                                            deliveryType === 'pickup'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                        }`}
                                    >
                                        <MapPin
                                            className={`h-6 w-6 ${deliveryType === 'pickup' ? 'text-primary' : 'text-muted-foreground'}`}
                                        />
                                        <span className="text-sm font-medium">Pickup</span>
                                        <span className="text-xs text-muted-foreground">Free</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDeliveryTypeChange('delivery')}
                                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-colors ${
                                            deliveryType === 'delivery'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                        }`}
                                    >
                                        <Truck
                                            className={`h-6 w-6 ${deliveryType === 'delivery' ? 'text-primary' : 'text-muted-foreground'}`}
                                        />
                                        <span className="text-sm font-medium">Delivery</span>
                                        <span className="text-xs text-muted-foreground">
                                            {deliveryStates.length > 0 ? 'Fee varies' : 'Not available'}
                                        </span>
                                    </button>
                                </div>

                                {deliveryType === 'delivery' && (
                                    <div className="space-y-3 pt-2">
                                        <div>
                                            <Label htmlFor="delivery_state" className="text-xs">
                                                State
                                            </Label>
                                            <Select
                                                value={data.delivery_state_id}
                                                onValueChange={(value) => {
                                                    setData((prev) => ({
                                                        ...prev,
                                                        delivery_state_id: value,
                                                        delivery_location_id: '',
                                                    }));
                                                }}
                                            >
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Select state" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {deliveryStates.map((state) => (
                                                        <SelectItem key={state.id} value={state.id.toString()}>
                                                            {state.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.delivery_state_id && (
                                                <p className="text-xs text-destructive mt-1">{errors.delivery_state_id}</p>
                                            )}
                                        </div>

                                        {selectedState && selectedState.locations.length > 0 && (
                                            <div>
                                                <Label htmlFor="delivery_location" className="text-xs">
                                                    Location
                                                </Label>
                                                <Select
                                                    value={data.delivery_location_id}
                                                    onValueChange={(value) => setData('delivery_location_id', value)}
                                                >
                                                    <SelectTrigger className="mt-1">
                                                        <SelectValue placeholder="Select location" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {selectedState.locations.map((location) => (
                                                            <SelectItem key={location.id} value={location.id.toString()}>
                                                                {location.name} - {formatCurrency(Number(location.delivery_fee))}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.delivery_location_id && (
                                                    <p className="text-xs text-destructive mt-1">
                                                        {errors.delivery_location_id}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        <div>
                                            <Label htmlFor="delivery_address" className="text-xs">
                                                Delivery Address
                                            </Label>
                                            <Textarea
                                                id="delivery_address"
                                                value={data.delivery_address}
                                                onChange={(e) => setData('delivery_address', e.target.value)}
                                                placeholder="Enter your full delivery address"
                                                className="mt-1"
                                                rows={2}
                                            />
                                            {errors.delivery_address && (
                                                <p className="text-xs text-destructive mt-1">{errors.delivery_address}</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Order Notes */}
                        <Card className="border border-border/40 shadow-none">
                            <CardHeader className="pb-2 pt-3 px-4">
                                <CardTitle className="text-sm font-medium">Order Notes (Optional)</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pb-4">
                                <Textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Add any special instructions for your order..."
                                    rows={3}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="space-y-4">
                        <Card className="border border-border/40 shadow-none sticky top-4">
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
                                    <div>
                                        <CardTitle className="text-sm font-medium">{cart.shop.name}</CardTitle>
                                        <p className="text-xs text-muted-foreground">
                                            {cart.item_count} item{cart.item_count !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4">
                                {/* Items */}
                                <div className="space-y-2 mb-4">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-2 py-2 border-b border-border/30 last:border-0">
                                            <div className="h-10 w-10 rounded bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {item.product.image_url ? (
                                                    <img
                                                        src={item.product.image_url}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <Package className="h-4 w-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">{item.product.name}</p>
                                                <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                                            </div>
                                            <p className="text-xs font-medium">{formatCurrency(Number(item.line_total))}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary */}
                                <div className="space-y-2 pt-3 border-t border-border/30">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatCurrency(Number(cart.subtotal))}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span>{deliveryFee > 0 ? formatCurrency(deliveryFee) : 'Free'}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold pt-2 border-t border-border/30">
                                        <span>Total</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full mt-4" disabled={processing}>
                                    {processing ? 'Placing Order...' : `Pay ${formatCurrency(total)}`}
                                </Button>

                                <p className="text-[10px] text-muted-foreground text-center mt-3">
                                    By placing this order, you agree to our terms and conditions.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </form>

                {/* Payment Simulation Dialog */}
                <Dialog open={paymentDialogOpen} onOpenChange={(open) => (stage === 'select' || (stage === 'done' && !processing)) && setPaymentDialogOpen(open)}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-base">
                                {stage === 'done' ? 'Order Confirmed' : stage === 'processing' ? 'Processing Payment' : 'Complete Payment'}
                            </DialogTitle>
                        </DialogHeader>

                        {stage === 'done' ? (
                            <div className="space-y-4">
                                {/* Success header */}
                                <div className="flex flex-col items-center gap-2 py-3">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                                        <BadgeCheck className="h-8 w-8 text-green-600" />
                                    </div>
                                    <p className="text-sm font-semibold text-green-700">Payment Successful!</p>
                                    <p className="text-xs text-muted-foreground">Ref: {orderRef}</p>
                                </div>
                                {/* Order receipt */}
                                <div className="rounded-lg border bg-muted/20 p-3 space-y-2 text-xs font-mono">
                                    <div className="flex justify-between border-b pb-1 mb-1">
                                        <span className="font-semibold text-foreground">ORDER RECEIPT</span>
                                        <span className="text-muted-foreground">{new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shop</span>
                                        <span>{cart.shop.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Customer</span>
                                        <span>{data.customer_name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Method</span>
                                        <span className="capitalize">{paymentMethod}</span>
                                    </div>
                                    <div className="border-t pt-1 mt-1 space-y-1">
                                        {cart.items.map((item) => (
                                            <div key={item.id} className="flex justify-between">
                                                <span className="text-muted-foreground truncate max-w-[150px]">{item.product.name} x{item.quantity}</span>
                                                <span>{formatCurrency(Number(item.line_total))}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {deliveryFee > 0 && (
                                        <div className="flex justify-between border-t pt-1">
                                            <span className="text-muted-foreground">Delivery</span>
                                            <span>{formatCurrency(deliveryFee)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t pt-1 font-bold text-foreground">
                                        <span>TOTAL PAID</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                                            <span className="text-[10px] text-muted-foreground">Saving order to database...</span>
                                        </>
                                    ) : (
                                        <p className="text-[10px] text-muted-foreground">Redirecting to your orders...</p>
                                    )}
                                </div>
                            </div>
                        ) : stage === 'processing' ? (
                            <div className="space-y-4 py-2">
                                <div className="rounded-lg border bg-muted/20 p-3 space-y-2 font-mono text-xs max-h-64 overflow-y-auto">
                                    {txLogs.map((log, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {log.done ? (
                                                <span className="text-green-500">✓</span>
                                            ) : (
                                                <Loader2 className="h-3 w-3 animate-spin text-primary flex-shrink-0" />
                                            )}
                                            <span className={log.done ? 'text-green-600' : 'text-foreground'}>{log.text}</span>
                                        </div>
                                    ))}
                                    {txLogs.length === 0 && (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-3 w-3 animate-spin text-primary" />
                                            <span>Initializing...</span>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] text-center text-muted-foreground">Please wait, do not close this window</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Order summary */}
                                <div className="rounded-lg border bg-muted/30 p-3 space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Order from</span>
                                        <span className="font-medium">{cart.shop.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Items</span>
                                        <span>{cart.item_count}</span>
                                    </div>
                                    {deliveryFee > 0 && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Delivery</span>
                                            <span>{formatCurrency(deliveryFee)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm font-semibold border-t pt-1 mt-1">
                                        <span>Total</span>
                                        <span>{formatCurrency(total)}</span>
                                    </div>
                                </div>

                                {/* Payment method selector */}
                                <div>
                                    <p className="text-xs font-medium mb-2">Payment Method</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { id: 'card' as const, label: 'Card', icon: CreditCard },
                                            { id: 'transfer' as const, label: 'Transfer', icon: Banknote },
                                            { id: 'ussd' as const, label: 'USSD', icon: Smartphone },
                                        ].map(({ id, label, icon: Icon }) => (
                                            <button
                                                key={id}
                                                type="button"
                                                onClick={() => setPaymentMethod(id)}
                                                className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 text-xs transition-colors ${
                                                    paymentMethod === id
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-primary/50'
                                                }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setPaymentDialogOpen(false)}
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        Cancel
                                    </Button>
                                    <Button className="flex-1" onClick={handleConfirmPayment}>
                                        Pay {formatCurrency(total)}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </UserLayout>
    );
}
