import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy - GoOrder">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=poppins:300,400,500,600,700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white dark:bg-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl dark:bg-black/80 border-b border-gray-100 dark:border-gray-900">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                        <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            goorder<span className="text-emerald-600">.ng</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Content */}
                <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
                    <div className="mb-12">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Last updated: {new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <div className="prose prose-gray max-w-none dark:prose-invert">
                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">1. Introduction</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                Welcome to GoOrder ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our e-commerce platform.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                By using GoOrder, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">2. Information We Collect</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">2.1 Personal Information</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We collect personal information that you voluntarily provide to us when you:
                            </p>
                            <ul className="mb-6 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Register for an account (username, email address, password)</li>
                                <li>Create a vendor store (business name, contact details, bank information for payments)</li>
                                <li>Make purchases (delivery address, phone number)</li>
                                <li>Contact our customer support</li>
                                <li>Subscribe to newsletters or marketing communications</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">2.2 Automatically Collected Information</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                When you access our platform, we automatically collect certain information, including:
                            </p>
                            <ul className="mb-6 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Device information (device type, operating system, browser type)</li>
                                <li>IP address and location data</li>
                                <li>Usage data (pages visited, time spent, clicks)</li>
                                <li>Cookies and similar tracking technologies</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">2.3 Transaction Information</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                We collect information related to your transactions on the platform, including purchase history, payment details (processed securely through our payment partners), and delivery information.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">3. How We Use Your Information</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We use the information we collect for the following purposes:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>To create and manage your account</li>
                                <li>To process transactions and send related information</li>
                                <li>To facilitate communication between buyers and sellers</li>
                                <li>To provide customer support and respond to inquiries</li>
                                <li>To send promotional communications (with your consent)</li>
                                <li>To improve our platform and develop new features</li>
                                <li>To detect, prevent, and address fraud and security issues</li>
                                <li>To comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">4. Information Sharing and Disclosure</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We may share your information in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li><strong>With Vendors:</strong> When you make a purchase, we share necessary delivery information with the vendor to fulfill your order.</li>
                                <li><strong>With Service Providers:</strong> We work with third-party companies for payment processing, analytics, and other services.</li>
                                <li><strong>For Legal Compliance:</strong> We may disclose information when required by law or to protect our rights.</li>
                                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
                            </ul>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                We do not sell your personal information to third parties.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">5. Cookies and Tracking Technologies</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We use cookies and similar tracking technologies to collect information about your browsing activities. These technologies help us:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Remember your preferences and login status</li>
                                <li>Understand how you use our platform</li>
                                <li>Provide personalized content and recommendations</li>
                                <li>Analyze and improve our services</li>
                            </ul>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our platform.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">6. Data Security</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">7. Your Rights</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                Under the Nigeria Data Protection Regulation (NDPR) and other applicable laws, you have the following rights:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li><strong>Access:</strong> Request a copy of your personal data</li>
                                <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                                <li><strong>Erasure:</strong> Request deletion of your data (subject to legal requirements)</li>
                                <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
                                <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
                                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                            </ul>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                To exercise any of these rights, please contact us using the information provided below.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">8. Data Retention</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                We retain your personal information for as long as your account is active or as needed to provide you services. We may also retain and use your information to comply with legal obligations, resolve disputes, and enforce our agreements. When your data is no longer needed, we will securely delete or anonymize it.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">9. Children's Privacy</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">10. Changes to This Privacy Policy</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">11. Contact Us</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                If you have any questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong className="text-gray-900 dark:text-white">GoOrder Nigeria</strong><br />
                                    Email: privacy@goorder.ng<br />
                                    Website: www.goorder.ng
                                </p>
                            </div>
                        </section>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-950">
                    <div className="mx-auto max-w-6xl px-6">
                        {/* Footer Grid */}
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Company Info */}
                            <div>
                                <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    goorder<span className="text-emerald-600">.ng</span>
                                </Link>
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                    Empowering Nigerian Commerce. The all-in-one platform for vendors to sell and customers to discover amazing local products.
                                </p>
                                <div className="mt-6 space-y-3">
                                    <a href="mailto:hello@goorder.ng" className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                        <Mail className="h-4 w-4" />
                                        hello@goorder.ng
                                    </a>
                                    <a href="tel:+2348000000000" className="flex items-center gap-3 text-sm text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">
                                        <Phone className="h-4 w-4" />
                                        +234 800 000 0000
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Quick Links</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/marketplace" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Marketplace</Link>
                                    </li>
                                    <li>
                                        <Link href="/#vendors" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">For Vendors</Link>
                                    </li>
                                    <li>
                                        <Link href="/#features" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Features</Link>
                                    </li>
                                    <li>
                                        <Link href="/vendor-register" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Start Selling</Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Support</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/vendor-login" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Vendor Login</Link>
                                    </li>
                                    <li>
                                        <Link href="/customer-login" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Customer Login</Link>
                                    </li>
                                    <li>
                                        <a href="mailto:support@goorder.ng" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Help Center</a>
                                    </li>
                                    <li>
                                        <a href="mailto:support@goorder.ng" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Contact Us</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Legal */}
                            <div>
                                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">Legal</h4>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href="/privacy-policy" className="text-emerald-600 dark:text-emerald-400">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/data-protection" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Data Protection</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-and-conditions" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Terms & Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
                            <p className="text-center text-sm text-gray-500 dark:text-gray-500">
                                © {new Date().getFullYear()} GoOrder Nigeria. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
