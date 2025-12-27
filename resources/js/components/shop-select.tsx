import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function ShopSelect({ shops, value, onChange, required = false }) {
    return (
        <Select value={value} onValueChange={onChange} required={required}>
            <SelectTrigger>
                <SelectValue placeholder="Select a shop (optional)" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="">No Shop</SelectItem>
                {shops.map((shop) => (
                    <SelectItem key={shop.id} value={String(shop.id)}>
                        {shop.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
