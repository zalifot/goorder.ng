import { useState, useEffect, useMemo } from 'react';
import { Country, State, ICountry, IState } from 'country-state-city';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface Props {
    countryCode: string;
    stateCode: string;
    onCountryChange: (value: string) => void;
    onStateChange: (value: string) => void;
    countryError?: string;
    stateError?: string;
    required?: boolean;
}

export function CountryStateSelect({
    countryCode,
    stateCode,
    onCountryChange,
    onStateChange,
    countryError,
    stateError,
    required = false,
}: Props) {
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [states, setStates] = useState<IState[]>([]);

    // Load all countries on mount
    useEffect(() => {
        const allCountries = Country.getAllCountries();
        setCountries(allCountries);
    }, []);

    // Load states when country changes
    useEffect(() => {
        if (countryCode) {
            const countryStates = State.getStatesOfCountry(countryCode);
            setStates(countryStates);
        } else {
            setStates([]);
        }
    }, [countryCode]);

    const handleCountryChange = (value: string) => {
        onCountryChange(value);
        onStateChange(''); // Reset state when country changes
    };

    // Find current country and state for display
    const selectedCountry = useMemo(() =>
        countries.find(c => c.isoCode === countryCode),
        [countries, countryCode]
    );

    const selectedState = useMemo(() =>
        states.find(s => s.isoCode === stateCode),
        [states, stateCode]
    );

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="country">
                    Country {required && <span className="text-red-500">*</span>}
                </Label>
                <Select value={countryCode} onValueChange={handleCountryChange}>
                    <SelectTrigger id="country">
                        <SelectValue placeholder="Select country">
                            {selectedCountry && (
                                <span>
                                    {selectedCountry.flag} {selectedCountry.name}
                                </span>
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {countries.map((country) => (
                            <SelectItem key={country.isoCode} value={country.isoCode}>
                                {country.flag} {country.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={countryError} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="state">
                    State/Province {required && <span className="text-red-500">*</span>}
                </Label>
                <Select
                    value={stateCode}
                    onValueChange={onStateChange}
                    disabled={!countryCode || states.length === 0}
                >
                    <SelectTrigger id="state">
                        <SelectValue placeholder={countryCode ? (states.length === 0 ? "No states available" : "Select state") : "Select country first"}>
                            {selectedState?.name}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {states.map((state) => (
                            <SelectItem key={state.isoCode} value={state.isoCode || state.name}>
                                {state.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={stateError} />
            </div>
        </div>
    );
}
