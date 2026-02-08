import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthAppleLayout from '@/layouts/auth/auth-apple-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, ShoppingBag } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function CustomerRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/customer-register');
    };

    return (
        <AuthAppleLayout
            title="Create your account"
            description="Start shopping from amazing Nigerian vendors"
            variant="customer"
        >

            <Head title="Create Account" />

            <button
                onClick={() => window.history.back()}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-5">
                    <div className="grid gap-2">
                        <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Username
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            name="username"
                            placeholder="johndoe"
                            className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 transition focus:border-blue-500 focus:bg-white focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-500"
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            tabIndex={2}
                            autoComplete="email"
                            name="email"
                            placeholder="you@example.com"
                            className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 transition focus:border-blue-500 focus:bg-white focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-500"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Create a password"
                                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 pr-12 transition focus:border-blue-500 focus:bg-white focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-300"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password_confirmation"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Confirm your password"
                                className="h-12 rounded-xl border-gray-300 bg-gray-50 px-4 pr-12 transition focus:border-blue-500 focus:bg-white focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-300"
                                tabIndex={-1}
                            >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 h-12 w-full rounded-xl bg-blue-600 text-base font-medium transition hover:bg-blue-700"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <>
                                <ShoppingBag className="mr-2 h-5 w-5" />
                                Create Account
                            </>
                        )}
                    </Button>
                </div>

                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-4 text-gray-500 dark:bg-gray-900 dark:text-gray-500">or continue with</span>
                    </div>
                </div>

                {/* Google Sign Up */}
                <a
                    href="/auth/google?role=user"
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
                </a>

                <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link href="/customer-login" className="font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-500" tabIndex={6}>
                        Sign in
                    </Link>
                </div>


            </form>
        </AuthAppleLayout>
    );
}
