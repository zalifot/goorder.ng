import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from '@/components/ui/sonner';

interface FlashMessages {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
    message?: string;
}

interface PageProps {
    flash?: FlashMessages;
}

/**
 * Hook to automatically display toast notifications from Laravel flash messages.
 * 
 * Usage in Laravel controller:
 * return redirect()->back()->with('success', 'Item saved successfully!');
 * return redirect()->back()->with('error', 'Something went wrong.');
 * 
 * Usage in React component:
 * import { useFlashToast } from '@/hooks/use-flash-toast';
 * 
 * function MyComponent() {
 *     useFlashToast();
 *     // ... rest of component
 * }
 */
export function useFlashToast() {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (!flash) return;

        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
        if (flash.warning) {
            toast.warning(flash.warning);
        }
        if (flash.info) {
            toast.info(flash.info);
        }
        if (flash.message) {
            toast.message(flash.message);
        }
    }, [flash]);
}
