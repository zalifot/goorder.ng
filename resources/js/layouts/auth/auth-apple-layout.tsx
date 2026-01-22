import { useFlashToast } from '@/hooks/use-flash-toast';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
    variant?: 'customer' | 'vendor';
}

export default function AuthAppleLayout({
    children,
    title,
    description,
    variant = 'customer',
}: PropsWithChildren<AuthLayoutProps>) {
    useFlashToast();
    
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-white p-6 md:p-10 dark:bg-black" style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
            {/* Bunny Fonts */}
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700" rel="stylesheet" />
            
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${variant === 'vendor' ? 'from-emerald-50/50 via-white to-teal-50/30 dark:from-emerald-950/20 dark:via-black dark:to-teal-950/10' : 'from-blue-50/50 via-white to-indigo-50/30 dark:from-blue-950/20 dark:via-black dark:to-indigo-950/10'}`} />
            
            {/* Decorative circles */}
            <div className={`absolute -top-24 -right-24 h-96 w-96 rounded-full ${variant === 'vendor' ? 'bg-emerald-200/20 dark:bg-emerald-900/10' : 'bg-blue-200/20 dark:bg-blue-900/10'} blur-3xl`} />
            <div className={`absolute -bottom-24 -left-24 h-96 w-96 rounded-full ${variant === 'vendor' ? 'bg-teal-200/20 dark:bg-teal-900/10' : 'bg-indigo-200/20 dark:bg-indigo-900/10'} blur-3xl`} />
            
            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col gap-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-6">
                        <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${variant === 'vendor' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6 text-white"
                                >
                                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                                    <path d="M3 6h18" />
                                    <path d="M16 10a4 4 0 0 1-8 0" />
                                </svg>
                            </div>
                            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                                goorder<span className={`${variant === 'vendor' ? 'text-emerald-600' : 'text-blue-600'}`}>.ng</span>
                            </span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        </div>
                    </div>
                    
                    {/* Form Card */}
                    <div className="rounded-3xl border border-gray-200/80 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
                        {children}
                    </div>
                    
                    {/* Footer */}
                    <p className="text-center text-xs text-gray-500 dark:text-gray-500">
                        By continuing, you agree to our{' '}
                        <Link href="/terms" className={`${variant === 'vendor' ? 'text-emerald-600 hover:text-emerald-700' : 'text-blue-600 hover:text-blue-700'}`}>
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className={`${variant === 'vendor' ? 'text-emerald-600 hover:text-emerald-700' : 'text-blue-600 hover:text-blue-700'}`}>
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
