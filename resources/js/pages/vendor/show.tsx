import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertCircle, ChevronDown, ChevronRight, Clock, Construction, Eye, Filter, LogOut, MapPin, Minus, Pencil, Plus, Search, Settings, ShoppingCart, Store, Truck, User } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    category_id: number;
    category: Category;
    image: string | null;
    image_url: string | null;
    price: number;
    discount_percentage: number;
    sale_price: number;
    stock_quantity: number;
    stock_status: string;
    description: string | null;
}

interface Shop {
    id: number;
    public_id: string;
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    image: string | null;
    image_url: string | null;
    is_active: boolean;
    is_under_construction: boolean;
}

interface DeliverySlot {
    id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    formatted_start_time: string;
    formatted_end_time: string;
    day_name: string;
    is_active: boolean;
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

interface Props {
    shop: Shop;
    products: Product[];
    categories: Category[];
    isOwner?: boolean;
    deliverySlots?: DeliverySlot[];
    deliveryStates?: DeliveryState[];
}

export default function VendorShow({ shop, products, categories, isOwner = false, deliverySlots = [], deliveryStates = [] }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [cart, setCart] = useState<{ productId: number; quantity: number }[]>([]);
    const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
    const [cartDialogOpen, setCartDialogOpen] = useState(false);
    const [deliverySlotDialogOpen, setDeliverySlotDialogOpen] = useState(false);
    const [deliveryLocationDialogOpen, setDeliveryLocationDialogOpen] = useState(false);
    const [tempSelectedCategory, setTempSelectedCategory] = useState<number | null>(null);
    const [expandedStates, setExpandedDeliveryStates] = useState<number[]>([]);

    // Generate upcoming delivery dates based on configured slots
    const generateUpcomingSlots = () => {
        const upcomingSlots: { id: string; date: Date; slot: DeliverySlot; label: string }[] = [];
        const today = new Date();
        const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        
        // Look ahead 4 weeks
        for (let i = 0; i < 28; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayName = daysOfWeek[date.getDay()];
            
            // Find slots that match this day
            const matchingSlots = deliverySlots.filter(slot => slot.day_of_week === dayName);
            
            matchingSlots.forEach(slot => {
                // For today, check if the slot end time hasn't passed
                if (i === 0) {
                    const now = new Date();
                    const [endHour, endMinute] = slot.end_time.split(':').map(Number);
                    const slotEndTime = new Date(today);
                    slotEndTime.setHours(endHour, endMinute, 0, 0);
                    if (now >= slotEndTime) return; // Skip if slot has passed
                }
                
                const isToday = i === 0;
                const dateStr = isToday 
                    ? 'Today' 
                    : date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
                upcomingSlots.push({
                    id: `${date.toISOString().split('T')[0]}-${slot.id}`,
                    date: new Date(date),
                    slot,
                    label: `${dateStr} | ${slot.formatted_start_time} - ${slot.formatted_end_time}`,
                });
            });
        }
        
        return upcomingSlots.slice(0, 8); // Show next 8 available slots
    };

    const upcomingDeliverySlots = generateUpcomingSlots();

    // Get today's first available slot for default
    const getTodayFirstSlot = () => {
        const todaySlot = upcomingDeliverySlots.find(s => s.id.startsWith(new Date().toISOString().split('T')[0]));
        return todaySlot?.id || (upcomingDeliverySlots.length > 0 ? upcomingDeliverySlots[0].id : null);
    };

    // Default: Pickup location if shop has address
    const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState<{ type: 'pickup' | 'delivery'; stateId?: number; locationId?: number; locationName?: string; stateName?: string; fee?: number } | null>(
        shop.address ? { type: 'pickup' } : null
    );
    
    // Default: Today's first available slot
    const [selectedDeliverySlot, setSelectedDeliverySlot] = useState<string | null>(getTodayFirstSlot);
    const [orderNotes, setOrderNotes] = useState('');
    const [showNotesInput, setShowNotesInput] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [showAddressInput, setShowAddressInput] = useState(false);
    const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+234');

    const { auth } = usePage<SharedData>().props;
    const isLoggedIn = !!auth?.user;

    const handleCheckout = () => {
        if (isLoggedIn) {
            // Process checkout for logged-in users
            toast.loading('Processing checkout...', 'Please wait while we process your order');
        } else {
            // Show checkout dialog for guests
            setCheckoutDialogOpen(true);
        }
    };

    const toggleDeliveryState = (stateId: number) => {
        setExpandedDeliveryStates((prev) =>
            prev.includes(stateId)
                ? prev.filter((id) => id !== stateId)
                : [...prev, stateId]
        );
    };

    const openCategoryDialog = () => {
        setTempSelectedCategory(selectedCategory);
        setCategoryDialogOpen(true);
    };

    const applyCategoryFilter = () => {
        setSelectedCategory(tempSelectedCategory);
        setCategoryDialogOpen(false);
    };

    const resetCategoryFilter = () => {
        setTempSelectedCategory(null);
        setSelectedCategory(null);
        setCategoryDialogOpen(false);
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (productId: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing) {
                return prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { productId, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.productId === productId);
            if (existing && existing.quantity > 1) {
                return prev.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prev.filter((item) => item.productId !== productId);
        });
    };

    const getCartItemQuantity = (productId: number) => {
        const item = cart.find((item) => item.productId === productId);
        return item ? item.quantity : 0;
    };

    const deleteFromCart = (productId: number) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
    };

    const getCartProducts = () => {
        return cart.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return { ...item, product };
        }).filter((item) => item.product);
    };

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartTotal = cart.reduce((sum, item) => {
        const product = products.find((p) => p.id === item.productId);
        return sum + (product ? product.sale_price * item.quantity : 0);
    }, 0);

    // Show under construction page
    if (shop.is_under_construction && !isOwner) {
        return (
            <>
                <Head title={`${shop.name} - Under Construction`} />
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 px-4">
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-100">
                            <Construction className="h-12 w-12 text-amber-600" />
                        </div>
                        <h1 className="mb-3 text-3xl font-bold text-gray-900">We're Building Something Amazing</h1>
                        <p className="mb-2 text-lg text-gray-600">{shop.name} is currently under construction.</p>
                        <p className="mb-8 text-gray-500">We'll be right back with an even better shopping experience!</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                            <Store className="h-4 w-4" />
                            <span>Check back soon</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Show inactive shop page
    if (!shop.is_active && !isOwner) {
        return (
            <>
                <Head title={`${shop.name} - Currently Unavailable`} />
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
                            <AlertCircle className="h-12 w-12 text-gray-500" />
                        </div>
                        <h1 className="mb-3 text-3xl font-bold text-gray-900">Shop Currently Unavailable</h1>
                        <p className="mb-2 text-lg text-gray-600">{shop.name} is not available at the moment.</p>
                        <p className="mb-8 text-gray-500">Please contact support for more information.</p>
                        <a
                            href="mailto:support@example.com"
                            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-white transition hover:bg-gray-800"
                        >
                            <span>Contact Support</span>
                        </a>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title={shop.name} />
            <div className="min-h-screen bg-gray-50">
                {/* Top Navigation */}
                <header className="sticky top-0 z-50 border-b bg-white">
                    <div className="mx-auto max-w-4xl px-4">
                        <div className="flex h-14 items-center justify-between">
                            <div className="flex items-center gap-2">
                                {shop.image_url ? (
                                    <img
                                        src={shop.image_url}
                                        alt={shop.name}
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <Store className="h-6 w-6 text-gray-600" />
                                )}
                                <span className="text-lg font-semibold">{shop.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {/* Cart Icon with Badge */}
                                <button
                                    onClick={() => cartItemCount > 0 && setCartDialogOpen(true)}
                                    className="relative text-gray-600 hover:text-gray-900"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    {cartItemCount > 0 && (
                                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-400 text-xs font-medium text-white">
                                            {cartItemCount > 99 ? '99+' : cartItemCount}
                                        </span>
                                    )}
                                </button>
                                {auth?.user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100">
                                            <User className="h-4 w-4 text-gray-600" />
                                            <span className="text-sm font-medium text-gray-700">
                                                {auth.user.username || auth.user.name}
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48">
                                            <DropdownMenuItem asChild>
                                                <Link href="/settings/profile" className="cursor-pointer">
                                                    <User className="mr-2 h-4 w-4" />
                                                    Profile
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem asChild>
                                                <Link href="/logout" method="post" as="button" className="w-full cursor-pointer text-red-600">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Logout
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/register"
                                            className="rounded-lg bg-orange-400 px-4 py-2 text-sm font-medium text-white hover:bg-orange-500"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Admin Preview Banner */}
                {isOwner && (
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                        <div className="mx-auto max-w-4xl px-4 py-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                                        <Eye className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-sm font-medium">
                                        You're viewing your shop
                                    </span>
                                </div>
                                <Link
                                    href={`/manage/shop/${shop.public_id}`}
                                    className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium transition-colors hover:bg-white/30"
                                >
                                    <Settings className="h-3.5 w-3.5" />
                                    Manage Shop
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Under Construction Banner for Owner */}
                {isOwner && shop.is_under_construction && (
                    <div className="bg-amber-500 text-white">
                        <div className="mx-auto max-w-4xl px-4 py-2">
                            <div className="flex items-center justify-center gap-2">
                                <Construction className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    Your shop is under construction. Customers cannot see this page.
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Inactive Shop Banner for Owner */}
                {isOwner && !shop.is_active && (
                    <div className="bg-red-500 text-white">
                        <div className="mx-auto max-w-4xl px-4 py-2">
                            <div className="flex items-center justify-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    Your shop is inactive. Customers cannot see this page.
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Location and Time Selection Bar */}
                <div className="border-b bg-white">
                    <div className="mx-auto max-w-4xl px-4">
                        {/* Location Row */}
                        <button
                            onClick={() => setDeliveryLocationDialogOpen(true)}
                            className="flex w-full items-center justify-between py-3 hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500">LOCATION:</span>
                                <div className="text-left">
                                    <span className="font-medium text-gray-900">
                                        {selectedDeliveryLocation
                                            ? selectedDeliveryLocation.type === 'pickup'
                                                ? 'PickUp'
                                                : selectedDeliveryLocation.locationName
                                            : 'Select Location'}
                                    </span>
                                    {selectedDeliveryLocation?.type === 'pickup' && shop.address && (
                                        <p className="text-sm text-gray-500">{shop.address}</p>
                                    )}
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>

                        <div className="border-t border-dashed" />

                        {/* Time Row */}
                        <button
                            onClick={() => upcomingDeliverySlots.length > 0 && setDeliverySlotDialogOpen(true)}
                            className="flex w-full items-center justify-between py-3 hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500">TIME:</span>
                                <span className="font-medium text-gray-900">
                                    {selectedDeliverySlot
                                        ? upcomingDeliverySlots.find(s => s.id === selectedDeliverySlot)?.label
                                        : upcomingDeliverySlots.length > 0
                                            ? 'Select Time'
                                            : 'No slots available'}
                                </span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>

                        {/* Ordering closes countdown */}
                        {selectedDeliverySlot && (() => {
                            const slot = upcomingDeliverySlots.find(s => s.id === selectedDeliverySlot);
                            if (!slot) return null;
                            const now = new Date();
                            const slotDate = new Date(slot.date);
                            const [endHour, endMinute] = slot.slot.end_time.split(':').map(Number);
                            slotDate.setHours(endHour, endMinute, 0, 0);
                            const diff = slotDate.getTime() - now.getTime();
                            if (diff <= 0) return null;
                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            return (
                                <div className="border-t pb-3 pt-1">
                                    <span className="text-sm text-gray-500">Ordering closes </span>
                                    <span className="text-sm font-medium text-green-600">
                                        in {hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''} ` : ''}{minutes} minute{minutes !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-4 py-6">
                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search for products"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="mb-6 overflow-x-auto">
                        <div className="flex items-center gap-2 border-b">
                            <button
                                onClick={openCategoryDialog}
                                className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                            >
                                <Filter className="h-4 w-4" />
                                All
                            </button>
                            <div className="h-4 w-px bg-gray-300" />
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                                    selectedCategory === null
                                        ? 'border-b-2 border-primary text-primary'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                All
                            </button>
                            {categories.slice(0, 6).map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                                        selectedCategory === category.id
                                            ? 'border-b-2 border-primary text-primary'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                            {categories.length > 6 && (
                                <button
                                    onClick={openCategoryDialog}
                                    className="whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                                >
                                    More...
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        {filteredProducts.length === 0 ? (
                            <div className="col-span-2 py-12 text-center text-gray-500">
                                No products found.
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 rounded-lg border bg-white p-4"
                                >
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 truncate">
                                            {product.name}
                                        </h3>
                                        {product.description && (
                                            <p className="text-sm text-gray-500 truncate">
                                                {product.description}
                                            </p>
                                        )}
                                        <div className="mt-1 flex items-center gap-2">
                                            <p className="font-semibold text-gray-900">
                                                ₦{Math.round(product.sale_price).toLocaleString()}
                                            </p>
                                            {product.discount_percentage > 0 && (
                                                <>
                                                    <p className="text-sm text-gray-400 line-through">
                                                        ₦{Math.round(product.price).toLocaleString()}
                                                    </p>
                                                    <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">
                                                        -{Math.round(product.discount_percentage)}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {product.stock_quantity > 0 
                                                ? `${product.stock_quantity} unit${product.stock_quantity > 1 ? 's' : ''} available`
                                                : 'Out of stock'
                                            }
                                        </p>
                                    </div>
                                    {getCartItemQuantity(product.id) > 0 ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => removeFromCart(product.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="w-8 text-center text-sm font-medium">
                                                {getCartItemQuantity(product.id)}
                                            </span>
                                            <button
                                                onClick={() => addToCart(product.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded bg-blue-500 text-white hover:bg-blue-600"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addToCart(product.id)}
                                            disabled={product.stock_status !== 'in_stock'}
                                        >
                                            {product.stock_status === 'in_stock' ? 'Add' : 'Out of Stock'}
                                        </Button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </main>

                {/* Sticky Cart Footer */}
                {cartItemCount > 0 && (
                    <div className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg">
                        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
                            <div>
                                <p className="text-sm text-gray-500">{cartItemCount} Products</p>
                                <p className="text-lg font-bold text-gray-900">₦{Math.round(cartTotal).toLocaleString()}</p>
                            </div>
                            <Button
                                className="gap-2 bg-orange-400 px-6 hover:bg-orange-500"
                                onClick={() => setCartDialogOpen(true)}
                            >
                                View Cart
                            </Button>
                        </div>
                    </div>
                )}

                {/* Categories Filter Dialog */}
                <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Categories</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[400px] overflow-y-auto py-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setTempSelectedCategory(category.id)}
                                    className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-gray-100 ${
                                        tempSelectedCategory === category.id
                                            ? 'bg-primary/10 font-medium text-primary'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3 border-t pt-4">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={resetCategoryFilter}
                            >
                                Reset
                            </Button>
                            <Button
                                className="flex-1 bg-orange-400 hover:bg-orange-500"
                                onClick={applyCategoryFilter}
                            >
                                Apply
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Review Cart Dialog */}
                <Dialog open={cartDialogOpen} onOpenChange={setCartDialogOpen}>
                    <DialogContent className="max-w-lg p-0">
                        <DialogHeader className="border-b px-6 py-4">
                            <DialogTitle>Review Cart</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[400px] overflow-y-auto px-6 py-4">
                            {getCartProducts().length === 0 ? (
                                <p className="py-8 text-center text-gray-500">Your cart is empty</p>
                            ) : (
                                <div className="space-y-4">
                                    {getCartProducts().map(({ productId, quantity, product }) => (
                                        <div key={productId} className="flex gap-4">
                                            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                                {product?.image_url ? (
                                                    <img
                                                        src={product.image_url}
                                                        alt={product.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                        No image
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-1 flex-col">
                                                <h4 className="font-medium text-gray-900">{product?.name}</h4>
                                                {product?.description && (
                                                    <p className="text-sm text-gray-500">{product.description}</p>
                                                )}
                                                <div className="mt-1 flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900">
                                                        ₦{Math.round(product?.sale_price ?? 0).toLocaleString()}
                                                    </p>
                                                    {product && product.discount_percentage > 0 && (
                                                        <>
                                                            <p className="text-sm text-gray-400 line-through">
                                                                ₦{Math.round(product.price).toLocaleString()}
                                                            </p>
                                                            <span className="rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-600">
                                                                -{Math.round(product.discount_percentage)}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => deleteFromCart(productId)}
                                                    className="mt-2 w-fit rounded border border-blue-500 px-3 py-1 text-sm text-blue-500 hover:bg-blue-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <button
                                                    onClick={() => removeFromCart(productId)}
                                                    className="flex h-8 w-8 items-center justify-center rounded bg-gray-200 text-gray-600 hover:bg-gray-300"
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </button>
                                                <span className="w-8 pt-1 text-center text-sm font-medium">
                                                    {quantity}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(productId)}
                                                    className="flex h-8 w-8 items-center justify-center rounded bg-blue-500 text-white hover:bg-blue-600"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Payment Summary */}
                        <div className="border-t px-6 py-4">
                            <h4 className="font-semibold text-gray-900">Payment Summary</h4>
                            <div className="mt-3 flex items-center justify-between border-t border-dashed pt-3">
                                <span className="text-gray-700">Total</span>
                                <span className="text-lg font-bold text-gray-900">₦{Math.round(cartTotal).toLocaleString()}</span>
                            </div>
                        </div>

                        {/* Delivery */}
                        <div className="border-t px-6 py-4">
                            <h4 className="font-semibold text-gray-900">Delivery</h4>
                            <div className="mt-3 space-y-1">
                                {/* Delivery Time Slots */}
                                <button 
                                    onClick={() => upcomingDeliverySlots.length > 0 && setDeliverySlotDialogOpen(true)}
                                    className="flex w-full items-center justify-between rounded-lg py-3 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Truck className="h-5 w-5 text-gray-600" />
                                        <div className="text-left">
                                            {selectedDeliverySlot ? (
                                                <span className="text-gray-700">
                                                    {upcomingDeliverySlots.find(s => s.id === selectedDeliverySlot)?.label}
                                                </span>
                                            ) : upcomingDeliverySlots.length > 0 ? (
                                                <span className="text-blue-600">Select delivery time</span>
                                            ) : (
                                                <span className="text-gray-500">No delivery times available</span>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </button>

                                {/* Delivery Locations */}
                                <button
                                    onClick={() => setDeliveryLocationDialogOpen(true)}
                                    className="flex w-full items-center justify-between rounded-lg py-3 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-gray-600" />
                                        <div className="text-left">
                                            {selectedDeliveryLocation ? (
                                                <div>
                                                    <span className="text-gray-700">
                                                        {selectedDeliveryLocation.type === 'pickup'
                                                            ? 'In store Pickup'
                                                            : `${selectedDeliveryLocation.locationName}, ${selectedDeliveryLocation.stateName}`}
                                                    </span>
                                                    {selectedDeliveryLocation.type === 'delivery' && selectedDeliveryLocation.fee !== undefined && (
                                                        <span className="ml-2 text-xs text-green-600">
                                                            +₦{selectedDeliveryLocation.fee.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            ) : deliveryStates.length > 0 || shop.address ? (
                                                <span className="text-blue-600">Select delivery location</span>
                                            ) : (
                                                <span className="text-gray-500">No delivery locations configured</span>
                                            )}
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </button>

                                {/* Pickup Address - Only show when pickup is selected */}
                                {selectedDeliveryLocation?.type === 'pickup' && shop.address && (
                                    <div className="flex w-full items-center gap-3 rounded-lg py-3">
                                        <Store className="h-5 w-5 text-gray-600" />
                                        <div className="text-left">
                                            <span className="text-xs text-gray-500">Pickup at</span>
                                            <p className="text-gray-700">{shop.address}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Address Input Bar - Show when delivery location is selected */}
                            {selectedDeliveryLocation?.type === 'delivery' && (
                                <div className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Truck className="h-5 w-5 text-gray-600" />
                                            <span className="text-sm text-gray-700">
                                                Delivery available from {selectedDeliveryLocation.locationName} for{' '}
                                                <span className="font-semibold">₦{Number(selectedDeliveryLocation.fee || 0).toLocaleString()}</span>
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => setShowAddressInput(true)}
                                            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
                                        >
                                            {deliveryAddress ? 'EDIT ADDRESS' : 'SELECT ADDRESS'}
                                        </button>
                                    </div>
                                    {showAddressInput && (
                                        <div className="mt-3">
                                            <textarea
                                                value={deliveryAddress}
                                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                                placeholder="Enter your full delivery address..."
                                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                                rows={2}
                                            />
                                            <div className="mt-2 flex justify-end">
                                                <Button
                                                    size="sm"
                                                    onClick={() => setShowAddressInput(false)}
                                                    className="bg-orange-400 hover:bg-orange-500"
                                                >
                                                    Save Address
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    {deliveryAddress && !showAddressInput && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            <span className="font-medium">Delivering to:</span> {deliveryAddress}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Notes Section */}
                            {showNotesInput ? (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Order Notes</span>
                                        <button
                                            onClick={() => {
                                                setShowNotesInput(false);
                                                setOrderNotes('');
                                            }}
                                            className="text-xs text-gray-500 hover:text-gray-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <textarea
                                        value={orderNotes}
                                        onChange={(e) => setOrderNotes(e.target.value)}
                                        placeholder="Add any special instructions or notes for your order..."
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400"
                                        rows={3}
                                    />
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowNotesInput(true)}
                                    className="mt-3 flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Add Notes (if any)
                                </button>
                            )}
                        </div>

                        {/* Checkout Button */}
                        <div className="px-6 pb-6">
                            <Button onClick={handleCheckout} className="w-full bg-orange-400 hover:bg-orange-500">
                                Checkout
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Checkout Dialog for Non-Logged-In Users */}
                <Dialog open={checkoutDialogOpen} onOpenChange={setCheckoutDialogOpen}>
                    <DialogContent className="max-w-md p-6">
                        <div className="mt-4">
                            <p className="mb-6 text-center text-gray-700">
                                Please provide your WhatsApp Phone Number to receive Order Confirmation.
                            </p>

                            <div className="mb-6 flex rounded-lg border border-gray-300 overflow-hidden">
                                <select
                                    value={countryCode}
                                    onChange={(e) => setCountryCode(e.target.value)}
                                    className="border-r border-gray-300 bg-gray-50 px-3 py-3 text-sm focus:outline-none"
                                >
                                    <option value="+234">NG +234</option>
                                    <option value="+1">US +1</option>
                                    <option value="+44">GB +44</option>
                                    <option value="+91">IN +91</option>
                                    <option value="+49">DE +49</option>
                                    <option value="+33">FR +33</option>
                                    <option value="+86">CN +86</option>
                                    <option value="+81">JP +81</option>
                                    <option value="+27">ZA +27</option>
                                    <option value="+254">KE +254</option>
                                    <option value="+233">GH +233</option>
                                </select>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Phone Number"
                                    className="flex-1 px-4 py-3 text-gray-600 placeholder-gray-400 focus:outline-none"
                                />
                            </div>

                            <Button
                                onClick={() => {
                                    // Process guest checkout
                                    toast.success('Order placed!', `We'll contact you at ${countryCode}${phoneNumber}`);
                                    setCheckoutDialogOpen(false);
                                }}
                                disabled={!phoneNumber}
                                className="mb-6 w-full bg-orange-400 hover:bg-orange-500 disabled:opacity-50"
                            >
                                Checkout
                            </Button>

                            <div className="relative mb-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-4 text-gray-500">or</span>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    // Google login
                                    window.location.href = '/auth/google';
                                }}
                                className="mb-3 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 text-gray-700 transition hover:bg-gray-50"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>

                            <Link
                                href="/register"
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-orange-400 px-4 py-3 text-orange-500 transition hover:bg-orange-50"
                            >
                                <User className="h-4 w-4" />
                                Sign Up
                            </Link>

                            <p className="mt-4 text-center text-sm text-gray-500">
                                Already have an account?{' '}
                                <Link href="/login" className="font-medium text-orange-500 hover:text-orange-600">
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delivery Slot Selection Dialog */}
                <Dialog open={deliverySlotDialogOpen} onOpenChange={setDeliverySlotDialogOpen}>
                    <DialogContent className="max-w-md p-0">
                        <DialogHeader className="border-b px-6 py-4">
                            <DialogTitle>Select Delivery Slot</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[400px] overflow-y-auto">
                            {upcomingDeliverySlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => {
                                        setSelectedDeliverySlot(slot.id);
                                        setDeliverySlotDialogOpen(false);
                                    }}
                                    className="flex w-full items-center justify-between border-b px-6 py-4 hover:bg-gray-50"
                                >
                                    <span className="text-gray-900">{slot.label}</span>
                                    <div className={`h-5 w-5 rounded-full border-2 ${
                                        selectedDeliverySlot === slot.id 
                                            ? 'border-blue-500 bg-blue-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedDeliverySlot === slot.id && (
                                            <div className="flex h-full items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-white" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delivery Location Selection Dialog */}
                <Dialog open={deliveryLocationDialogOpen} onOpenChange={setDeliveryLocationDialogOpen}>
                    <DialogContent className="max-w-md p-0">
                        <DialogHeader className="border-b px-6 py-4">
                            <DialogTitle>Select Delivery Location</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[400px] overflow-y-auto">
                            {/* Pickup Option */}
                            {shop.address && (
                                <button
                                    onClick={() => {
                                        setSelectedDeliveryLocation({ type: 'pickup' });
                                        setDeliveryLocationDialogOpen(false);
                                    }}
                                    className="flex w-full items-center justify-between border-b px-6 py-4 hover:bg-gray-50"
                                >
                                    <div className="flex items-center gap-3">
                                        <Store className="h-5 w-5 text-gray-600" />
                                        <div className="text-left">
                                            <div className="font-medium text-gray-900">Pickup</div>
                                            <div className="text-sm text-gray-500">In store Pickup</div>
                                        </div>
                                    </div>
                                    <div className={`h-5 w-5 rounded-full border-2 ${
                                        selectedDeliveryLocation?.type === 'pickup' 
                                            ? 'border-blue-500 bg-blue-500' 
                                            : 'border-gray-300'
                                    }`}>
                                        {selectedDeliveryLocation?.type === 'pickup' && (
                                            <div className="flex h-full items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-white" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            )}

                            {/* Delivery States and Locations */}
                            {deliveryStates.map((state) => (
                                <div key={state.id} className="border-b">
                                    {/* State Header (Expandable) */}
                                    <button
                                        onClick={() => toggleDeliveryState(state.id)}
                                        className="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-5 w-5 text-gray-600" />
                                            <div className="text-left">
                                                <div className="font-medium text-gray-900">{state.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {state.locations.length} location{state.locations.length !== 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                                            expandedStates.includes(state.id) ? 'rotate-90' : ''
                                        }`} />
                                    </button>

                                    {/* Locations under this state */}
                                    {expandedStates.includes(state.id) && (
                                        <div className="bg-gray-50">
                                            {state.locations.map((location) => (
                                                <button
                                                    key={location.id}
                                                    onClick={() => {
                                                        setSelectedDeliveryLocation({
                                                            type: 'delivery',
                                                            stateId: state.id,
                                                            locationId: location.id,
                                                            locationName: location.name,
                                                            stateName: state.name,
                                                            fee: location.delivery_fee,
                                                        });
                                                        setDeliveryLocationDialogOpen(false);
                                                    }}
                                                    className="flex w-full items-center justify-between border-t border-gray-200 px-6 py-3 pl-14 hover:bg-gray-100"
                                                >
                                                    <div className="text-left">
                                                        <div className="text-gray-900">{location.name}</div>
                                                        <div className="text-sm text-green-600">
                                                            +₦{Number(location.delivery_fee).toLocaleString()} delivery fee
                                                        </div>
                                                    </div>
                                                    <div className={`h-5 w-5 rounded-full border-2 ${
                                                        selectedDeliveryLocation?.type === 'delivery' && 
                                                        selectedDeliveryLocation?.locationId === location.id 
                                                            ? 'border-blue-500 bg-blue-500' 
                                                            : 'border-gray-300'
                                                    }`}>
                                                        {selectedDeliveryLocation?.type === 'delivery' && 
                                                         selectedDeliveryLocation?.locationId === location.id && (
                                                            <div className="flex h-full items-center justify-center">
                                                                <div className="h-2 w-2 rounded-full bg-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Empty state */}
                            {!shop.address && deliveryStates.length === 0 && (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    No delivery options configured for this shop.
                                </div>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
