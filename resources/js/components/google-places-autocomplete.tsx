import { useRef, useCallback, useState, useEffect } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface PlaceResult {
    formatted_address: string;
    place_id: string;
    latitude: number;
    longitude: number;
}

interface Props {
    value: string;
    onChange: (value: string) => void;
    onPlaceSelect: (place: PlaceResult) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    required?: boolean;
}

const libraries: ("places")[] = ["places"];

export function GooglePlacesAutocomplete({
    value,
    onChange,
    onPlaceSelect,
    label = "Location",
    placeholder = "Search for an address...",
    error,
    required = false,
}: Props) {
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey || '',
        libraries,
    });

    const onLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
        setAutocomplete(autocomplete);
    }, []);

    const onPlaceChanged = useCallback(() => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            if (place.geometry?.location) {
                onPlaceSelect({
                    formatted_address: place.formatted_address || '',
                    place_id: place.place_id || '',
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                });
                onChange(place.formatted_address || '');
            }
        }
    }, [autocomplete, onChange, onPlaceSelect]);

    // If no API key or load error, fall back to regular input
    if (!apiKey || loadError) {
        return (
            <div className="grid gap-2">
                <Label htmlFor="location">
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
                <Input
                    id="location"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
                {!apiKey && (
                    <p className="text-xs text-muted-foreground">
                        Google Places API not configured. Enter address manually.
                    </p>
                )}
                <InputError message={error} />
            </div>
        );
    }

    if (!isLoaded) {
        return (
            <div className="grid gap-2">
                <Label htmlFor="location">
                    {label} {required && <span className="text-red-500">*</span>}
                </Label>
                <Input disabled placeholder="Loading Google Places..." />
            </div>
        );
    }

    return (
        <div className="grid gap-2">
            <Label htmlFor="location">
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={{
                    types: ['address'],
                }}
            >
                <Input
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            </Autocomplete>
            <p className="text-xs text-muted-foreground">
                Start typing to search for your shop's address
            </p>
            <InputError message={error} />
        </div>
    );
}
