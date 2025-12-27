import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ChevronDown, ChevronRight, Clock, MapPin, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface DeliveryLocation {
    id: number;
    delivery_state_id: number;
    shop_id: number | null;
    name: string;
    delivery_fee: number;
    is_active: boolean;
}

interface DeliveryState {
    id: number;
    shop_id: number | null;
    name: string;
    is_active: boolean;
    locations: DeliveryLocation[];
}

interface DeliverySlot {
    id: number;
    shop_id: number | null;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    formatted_start_time: string;
    formatted_end_time: string;
    day_name: string;
}

interface Shop {
    id: number;
    name: string;
    public_id: string;
}

interface Props {
    states: DeliveryState[];
    slots: DeliverySlot[];
    shops: Shop[];
    selectedShopId: number | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Delivery Options',
        href: '/delivery-options',
    },
];

const DAYS_OF_WEEK = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
];

export default function DeliveryOptions({ states = [], slots = [], shops = [], selectedShopId }: Props) {
    const [expandedStates, setExpandedStates] = useState<number[]>([]);
    
    // Shop selection handler
    const handleShopChange = (shopId: string) => {
        router.get('/delivery-options', { shop_id: shopId }, { preserveState: true });
    };
    
    // State Dialog
    const [stateDialogOpen, setStateDialogOpen] = useState(false);
    const [editingState, setEditingState] = useState<DeliveryState | null>(null);
    const stateForm = useForm({
        name: '',
        shop_id: selectedShopId?.toString() || '',
    });

    // Location Dialog
    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const [editingLocation, setEditingLocation] = useState<DeliveryLocation | null>(null);
    const locationForm = useForm({
        delivery_state_id: '',
        shop_id: selectedShopId?.toString() || '',
        name: '',
        delivery_fee: '',
    });

    // Slot Dialog
    const [slotDialogOpen, setSlotDialogOpen] = useState(false);
    const [editingSlot, setEditingSlot] = useState<DeliverySlot | null>(null);
    const slotForm = useForm({
        shop_id: selectedShopId?.toString() || '',
        day_of_week: 'monday',
        start_time: '09:00',
        end_time: '17:00',
    });

    const toggleStateExpanded = (stateId: number) => {
        setExpandedStates((prev) =>
            prev.includes(stateId)
                ? prev.filter((id) => id !== stateId)
                : [...prev, stateId]
        );
    };

    // State handlers
    const openAddState = () => {
        setEditingState(null);
        stateForm.reset();
        stateForm.setData('shop_id', selectedShopId?.toString() || '');
        setStateDialogOpen(true);
    };

    const openEditState = (state: DeliveryState) => {
        setEditingState(state);
        stateForm.setData({
            name: state.name,
            shop_id: state.shop_id?.toString() || '',
        });
        setStateDialogOpen(true);
    };

    const submitState = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingState) {
            stateForm.put(`/delivery-options/states/${editingState.id}`, {
                onSuccess: () => {
                    setStateDialogOpen(false);
                    stateForm.reset();
                },
            });
        } else {
            stateForm.post('/delivery-options/states', {
                onSuccess: () => {
                    setStateDialogOpen(false);
                    stateForm.reset();
                },
            });
        }
    };

    const deleteState = (state: DeliveryState) => {
        if (confirm(`Delete "${state.name}" and all its locations?`)) {
            router.delete(`/delivery-options/states/${state.id}`);
        }
    };

    // Location handlers
    const openAddLocation = (stateId?: number) => {
        setEditingLocation(null);
        locationForm.reset();
        locationForm.setData('shop_id', selectedShopId?.toString() || '');
        if (stateId) {
            locationForm.setData('delivery_state_id', stateId.toString());
        }
        setLocationDialogOpen(true);
    };

    const openEditLocation = (location: DeliveryLocation) => {
        setEditingLocation(location);
        locationForm.setData({
            delivery_state_id: location.delivery_state_id.toString(),
            shop_id: location.shop_id?.toString() || '',
            name: location.name,
            delivery_fee: location.delivery_fee.toString(),
        });
        setLocationDialogOpen(true);
    };

    const submitLocation = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLocation) {
            locationForm.put(`/delivery-options/locations/${editingLocation.id}`, {
                onSuccess: () => {
                    setLocationDialogOpen(false);
                    locationForm.reset();
                },
            });
        } else {
            locationForm.post('/delivery-options/locations', {
                onSuccess: () => {
                    setLocationDialogOpen(false);
                    locationForm.reset();
                },
            });
        }
    };

    const deleteLocation = (location: DeliveryLocation) => {
        if (confirm(`Delete location "${location.name}"?`)) {
            router.delete(`/delivery-options/locations/${location.id}`);
        }
    };

    // Slot handlers
    const openAddSlot = () => {
        setEditingSlot(null);
        slotForm.reset();
        slotForm.setData({
            shop_id: selectedShopId?.toString() || '',
            day_of_week: 'monday',
            start_time: '09:00',
            end_time: '17:00',
        });
        setSlotDialogOpen(true);
    };

    const openEditSlot = (slot: DeliverySlot) => {
        setEditingSlot(slot);
        slotForm.setData({
            shop_id: slot.shop_id?.toString() || '',
            day_of_week: slot.day_of_week,
            start_time: slot.start_time.slice(0, 5),
            end_time: slot.end_time.slice(0, 5),
        });
        setSlotDialogOpen(true);
    };

    const submitSlot = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingSlot) {
            slotForm.put(`/delivery-options/slots/${editingSlot.id}`, {
                onSuccess: () => {
                    setSlotDialogOpen(false);
                    slotForm.reset();
                },
            });
        } else {
            slotForm.post('/delivery-options/slots', {
                onSuccess: () => {
                    setSlotDialogOpen(false);
                    slotForm.reset();
                },
            });
        }
    };

    const deleteSlot = (slot: DeliverySlot) => {
        if (confirm(`Delete this delivery slot?`)) {
            router.delete(`/delivery-options/slots/${slot.id}`);
        }
    };

    // Group slots by day
    const slotsByDay = DAYS_OF_WEEK.map((day) => ({
        ...day,
        slots: slots.filter((slot) => slot.day_of_week === day.value),
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Delivery Options" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Delivery Options</h1>
                    {shops.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Label className="text-sm text-muted-foreground">Shop:</Label>
                            <Select
                                value={selectedShopId?.toString() || ''}
                                onValueChange={handleShopChange}
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select a shop" />
                                </SelectTrigger>
                                <SelectContent>
                                    {shops.map((shop) => (
                                        <SelectItem key={shop.id} value={shop.id.toString()}>
                                            {shop.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {shops.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border bg-card py-16">
                        <MapPin className="mb-4 h-12 w-12 text-muted-foreground/50" />
                        <h2 className="text-lg font-semibold">No shops yet</h2>
                        <p className="text-muted-foreground">Create a shop first to configure delivery options.</p>
                    </div>
                ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Delivery Locations Section */}
                    <div className="rounded-xl border bg-card">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-muted-foreground" />
                                <h2 className="text-lg font-semibold">Delivery Locations</h2>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={openAddState}>
                                    <Plus className="mr-1 h-4 w-4" />
                                    Add State
                                </Button>
                                {states.length > 0 && (
                                    <Button size="sm" onClick={() => openAddLocation()}>
                                        <Plus className="mr-1 h-4 w-4" />
                                        Add Location
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="p-6">
                            {/* Pickup - Always shown */}
                            <div className="mb-4 flex items-center gap-3 rounded-lg border bg-green-50 p-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                    <MapPin className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-green-900">Pickup</p>
                                    <p className="text-sm text-green-700">Default option - customers pick up from your location</p>
                                </div>
                            </div>

                            {states.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    <MapPin className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                    <p>No delivery states added yet</p>
                                    <p className="text-sm">Add a state to start configuring delivery locations</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {states.map((state) => (
                                        <div key={state.id} className="rounded-lg border">
                                            <div
                                                className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50"
                                                onClick={() => toggleStateExpanded(state.id)}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {expandedStates.includes(state.id) ? (
                                                        <ChevronDown className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                    <span className="font-medium">{state.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        ({state.locations.length} locations)
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => openAddLocation(state.id)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => openEditState(state)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-red-500 hover:text-red-600"
                                                        onClick={() => deleteState(state)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            {expandedStates.includes(state.id) && (
                                                <div className="border-t bg-muted/30 p-4">
                                                    {state.locations.length === 0 ? (
                                                        <p className="text-center text-sm text-muted-foreground">
                                                            No locations added
                                                        </p>
                                                    ) : (
                                                        <div className="space-y-2">
                                                            {state.locations.map((location) => (
                                                                <div
                                                                    key={location.id}
                                                                    className="flex items-center justify-between rounded-md bg-background p-3"
                                                                >
                                                                    <div>
                                                                        <p className="font-medium">{location.name}</p>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            Delivery fee: ₦{Math.round(location.delivery_fee).toLocaleString()}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex items-center gap-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8"
                                                                            onClick={() => openEditLocation(location)}
                                                                        >
                                                                            <Pencil className="h-4 w-4" />
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8 text-red-500 hover:text-red-600"
                                                                            onClick={() => deleteLocation(location)}
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Delivery Slots Section */}
                    <div className="rounded-xl border bg-card">
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-muted-foreground" />
                                <h2 className="text-lg font-semibold">Delivery Slots</h2>
                            </div>
                            <Button size="sm" onClick={openAddSlot}>
                                <Plus className="mr-1 h-4 w-4" />
                                Add Slot
                            </Button>
                        </div>
                        <div className="p-6">
                            {slots.length === 0 ? (
                                <div className="py-8 text-center text-muted-foreground">
                                    <Clock className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                    <p>No delivery slots configured</p>
                                    <p className="text-sm">Add time slots for when you can deliver</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {slotsByDay.map((day) => (
                                        day.slots.length > 0 && (
                                            <div key={day.value}>
                                                <h3 className="mb-2 font-medium text-muted-foreground">{day.label}</h3>
                                                <div className="space-y-2">
                                                    {day.slots.map((slot) => (
                                                        <div
                                                            key={slot.id}
                                                            className="flex items-center justify-between rounded-lg border bg-background p-3"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                                <span>
                                                                    {slot.formatted_start_time} - {slot.formatted_end_time}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8"
                                                                    onClick={() => openEditSlot(slot)}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-red-500 hover:text-red-600"
                                                                    onClick={() => deleteSlot(slot)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                )}

                {/* State Dialog */}
                <Dialog open={stateDialogOpen} onOpenChange={setStateDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingState ? 'Edit State' : 'Add State'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitState}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="state-name">State Name</Label>
                                    <Input
                                        id="state-name"
                                        placeholder="e.g., Lagos, Abuja"
                                        value={stateForm.data.name}
                                        onChange={(e) => stateForm.setData('name', e.target.value)}
                                    />
                                    {stateForm.errors.name && (
                                        <p className="text-sm text-red-500">{stateForm.errors.name}</p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setStateDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={stateForm.processing}>
                                    {editingState ? 'Update' : 'Add'} State
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Location Dialog */}
                <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingLocation ? 'Edit Location' : 'Add Location'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitLocation}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location-state">State</Label>
                                    <Select
                                        value={locationForm.data.delivery_state_id}
                                        onValueChange={(value) => locationForm.setData('delivery_state_id', value)}
                                        disabled={!!editingLocation}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {states.map((state) => (
                                                <SelectItem key={state.id} value={state.id.toString()}>
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {locationForm.errors.delivery_state_id && (
                                        <p className="text-sm text-red-500">{locationForm.errors.delivery_state_id}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location-name">Location Name</Label>
                                    <Input
                                        id="location-name"
                                        placeholder="e.g., Ikeja, Lekki"
                                        value={locationForm.data.name}
                                        onChange={(e) => locationForm.setData('name', e.target.value)}
                                    />
                                    {locationForm.errors.name && (
                                        <p className="text-sm text-red-500">{locationForm.errors.name}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="delivery-fee">Delivery Fee (₦)</Label>
                                    <Input
                                        id="delivery-fee"
                                        type="number"
                                        min="0"
                                        step="100"
                                        placeholder="e.g., 1500"
                                        value={locationForm.data.delivery_fee}
                                        onChange={(e) => locationForm.setData('delivery_fee', e.target.value)}
                                    />
                                    {locationForm.errors.delivery_fee && (
                                        <p className="text-sm text-red-500">{locationForm.errors.delivery_fee}</p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setLocationDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={locationForm.processing}>
                                    {editingLocation ? 'Update' : 'Add'} Location
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Slot Dialog */}
                <Dialog open={slotDialogOpen} onOpenChange={setSlotDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editingSlot ? 'Edit Delivery Slot' : 'Add Delivery Slot'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitSlot}>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="slot-day">Day of Week</Label>
                                    <Select
                                        value={slotForm.data.day_of_week}
                                        onValueChange={(value) => slotForm.setData('day_of_week', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DAYS_OF_WEEK.map((day) => (
                                                <SelectItem key={day.value} value={day.value}>
                                                    {day.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {slotForm.errors.day_of_week && (
                                        <p className="text-sm text-red-500">{slotForm.errors.day_of_week}</p>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="start-time">Start Time</Label>
                                        <Input
                                            id="start-time"
                                            type="time"
                                            value={slotForm.data.start_time}
                                            onChange={(e) => slotForm.setData('start_time', e.target.value)}
                                        />
                                        {slotForm.errors.start_time && (
                                            <p className="text-sm text-red-500">{slotForm.errors.start_time}</p>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end-time">End Time</Label>
                                        <Input
                                            id="end-time"
                                            type="time"
                                            value={slotForm.data.end_time}
                                            onChange={(e) => slotForm.setData('end_time', e.target.value)}
                                        />
                                        {slotForm.errors.end_time && (
                                            <p className="text-sm text-red-500">{slotForm.errors.end_time}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setSlotDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={slotForm.processing}>
                                    {editingSlot ? 'Update' : 'Add'} Slot
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
