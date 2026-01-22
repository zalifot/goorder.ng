import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from 'lucide-react';
import { Toaster as Sonner, toast as sonnerToast } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="light"
            className="toaster group"
            toastOptions={{
                unstyled: true,
                classNames: {
                    toast: `
                        group toast 
                        flex items-start gap-3 w-full p-4 
                        rounded-2xl shadow-xl
                        backdrop-blur-xl
                        border border-white/20
                        bg-white/80 dark:bg-gray-900/80
                        text-gray-900 dark:text-gray-100
                        font-['Poppins',sans-serif]
                        animate-in slide-in-from-top-5 fade-in duration-300
                    `,
                    title: 'text-sm font-semibold tracking-tight',
                    description: 'text-sm text-gray-600 dark:text-gray-400',
                    actionButton:
                        'bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity',
                    cancelButton:
                        'text-gray-500 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                    closeButton:
                        'absolute right-2 top-2 rounded-full p-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
                },
            }}
            position="top-center"
            expand={false}
            richColors={false}
            closeButton
            {...props}
        />
    );
};

// Apple-style toast variants with custom icons
const toast = {
    // Success toast - green checkmark
    success: (message: string, description?: string) => {
        return sonnerToast.custom(() => (
            <div className="group flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/80 p-4 font-['Poppins',sans-serif] text-gray-900 shadow-xl backdrop-blur-xl dark:bg-gray-900/80 dark:text-gray-100">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold tracking-tight">{message}</p>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        ));
    },

    // Error toast - red X
    error: (message: string, description?: string) => {
        return sonnerToast.custom(() => (
            <div className="group flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/80 p-4 font-['Poppins',sans-serif] text-gray-900 shadow-xl backdrop-blur-xl dark:bg-gray-900/80 dark:text-gray-100">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/30">
                    <XCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold tracking-tight">{message}</p>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        ));
    },

    // Warning toast - amber triangle
    warning: (message: string, description?: string) => {
        return sonnerToast.custom(() => (
            <div className="group flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/80 p-4 font-['Poppins',sans-serif] text-gray-900 shadow-xl backdrop-blur-xl dark:bg-gray-900/80 dark:text-gray-100">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30">
                    <AlertTriangle className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold tracking-tight">{message}</p>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        ));
    },

    // Info toast - blue info icon
    info: (message: string, description?: string) => {
        return sonnerToast.custom(() => (
            <div className="group flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/80 p-4 font-['Poppins',sans-serif] text-gray-900 shadow-xl backdrop-blur-xl dark:bg-gray-900/80 dark:text-gray-100">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30">
                    <Info className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold tracking-tight">{message}</p>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        ));
    },

    // Loading toast - spinning loader
    loading: (message: string, description?: string) => {
        return sonnerToast.custom(() => (
            <div className="group flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/80 p-4 font-['Poppins',sans-serif] text-gray-900 shadow-xl backdrop-blur-xl dark:bg-gray-900/80 dark:text-gray-100">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg shadow-gray-500/30">
                    <Loader2 className="h-5 w-5 animate-spin text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold tracking-tight">{message}</p>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        ));
    },

    // Default/message toast
    message: (message: string, description?: string) => {
        return sonnerToast.custom(() => (
            <div className="group flex w-full items-start gap-3 rounded-2xl border border-white/20 bg-white/80 p-4 font-['Poppins',sans-serif] text-gray-900 shadow-xl backdrop-blur-xl dark:bg-gray-900/80 dark:text-gray-100">
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold tracking-tight">{message}</p>
                    {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                </div>
            </div>
        ));
    },

    // Promise toast for async operations
    promise: sonnerToast.promise,

    // Dismiss toast
    dismiss: sonnerToast.dismiss,
};

export { Toaster, toast };
