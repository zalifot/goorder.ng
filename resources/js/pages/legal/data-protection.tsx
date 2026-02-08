import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, Lock, Mail, Phone, Shield, UserCheck } from 'lucide-react';

export default function DataProtection() {
    return (
        <>
            <Head title="Data Protection - GoOrder">
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

                {/* Hero Section */}
                <section className="relative bg-gradient-to-b from-emerald-50/50 to-white pt-32 pb-16 dark:from-emerald-950/20 dark:to-black">
                    <div className="mx-auto max-w-4xl px-6 text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                            <Shield className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Data Protection
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                            Your data security is our priority. Learn how we protect your personal information in compliance with Nigerian and international data protection standards.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <main className="mx-auto max-w-4xl px-6 py-16">
                    {/* Key Principles */}
                    <section className="mb-16">
                        <h2 className="mb-8 text-2xl font-semibold text-gray-900 dark:text-white">Our Data Protection Principles</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <Lock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Security First</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We implement industry-standard encryption and security protocols to protect your data at all times.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <UserCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">User Control</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    You have full control over your personal data, including the right to access, modify, and delete it.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-800">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Compliance</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    We adhere to the Nigeria Data Protection Regulation (NDPR) and international best practices.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="prose prose-gray max-w-none dark:prose-invert">
                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">1. NDPR Compliance</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                GoOrder is committed to complying with the Nigeria Data Protection Regulation (NDPR) 2019, issued by the National Information Technology Development Agency (NITDA). Our data protection practices are designed to ensure:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Lawful, fair, and transparent processing of personal data</li>
                                <li>Collection of data only for specified, explicit, and legitimate purposes</li>
                                <li>Data minimization - collecting only what is necessary</li>
                                <li>Accuracy and keeping data up to date</li>
                                <li>Storage limitation - keeping data only as long as necessary</li>
                                <li>Integrity and confidentiality through appropriate security measures</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">2. Legal Basis for Processing</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We process your personal data based on the following legal grounds:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li><strong>Consent:</strong> You have given explicit consent for processing for specific purposes</li>
                                <li><strong>Contract:</strong> Processing is necessary to fulfill our contract with you (e.g., processing orders)</li>
                                <li><strong>Legal Obligation:</strong> Processing is required to comply with Nigerian law</li>
                                <li><strong>Legitimate Interest:</strong> Processing is necessary for our legitimate business interests, provided these do not override your rights</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">3. Data Security Measures</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We employ comprehensive security measures to protect your data:
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">3.1 Technical Measures</h3>
                            <ul className="mb-6 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>SSL/TLS encryption for all data transmission</li>
                                <li>Secure password hashing algorithms</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>Firewall protection and intrusion detection systems</li>
                                <li>Two-factor authentication (2FA) options for accounts</li>
                                <li>Encrypted database storage for sensitive information</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">3.2 Organizational Measures</h3>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Staff training on data protection and security</li>
                                <li>Access controls and role-based permissions</li>
                                <li>Data protection impact assessments for new features</li>
                                <li>Incident response and data breach notification procedures</li>
                                <li>Regular review and update of security policies</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">4. Your Data Protection Rights</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                Under the NDPR, you have the following rights regarding your personal data:
                            </p>

                            <div className="space-y-4">
                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Access</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        You can request a copy of all personal data we hold about you. We will provide this information within 30 days of your request.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Rectification</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        You can request that we correct any inaccurate or incomplete personal data. You can also update your information directly through your account settings.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Erasure</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        You can request deletion of your personal data. Note that we may need to retain certain data for legal or legitimate business purposes.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Data Portability</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        You can request to receive your personal data in a structured, commonly used, and machine-readable format.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Object</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        You can object to the processing of your personal data for direct marketing purposes or processing based on legitimate interests.
                                    </p>
                                </div>

                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-900">
                                    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Right to Withdraw Consent</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Where we rely on your consent for processing, you can withdraw that consent at any time without affecting the lawfulness of prior processing.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">5. Data Breach Notification</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                In the event of a data breach that affects your personal data, we will:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Notify NITDA within 72 hours of becoming aware of the breach</li>
                                <li>Notify affected individuals without undue delay if the breach poses a high risk to their rights and freedoms</li>
                                <li>Document all breaches and the remedial actions taken</li>
                                <li>Take immediate steps to contain and mitigate the impact of the breach</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">6. International Data Transfers</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your data is primarily stored and processed in Nigeria. If we need to transfer your data internationally (for example, to service providers located outside Nigeria), we will ensure appropriate safeguards are in place, including contractual provisions that provide equivalent protection to the NDPR.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">7. Third-Party Data Processors</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                We work with trusted third-party service providers who process data on our behalf. All processors are required to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Process data only on our documented instructions</li>
                                <li>Ensure their personnel are bound by confidentiality obligations</li>
                                <li>Implement appropriate security measures</li>
                                <li>Not engage sub-processors without our authorization</li>
                                <li>Assist us in responding to data subject requests</li>
                                <li>Delete or return all data upon termination of services</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">8. Data Protection Officer</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                GoOrder has designated a Data Protection Officer (DPO) to oversee our data protection strategy and ensure compliance with the NDPR. The DPO is responsible for:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Monitoring compliance with data protection laws</li>
                                <li>Advising on data protection impact assessments</li>
                                <li>Acting as a point of contact for data subjects and NITDA</li>
                                <li>Raising awareness about data protection within the organization</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">9. How to Exercise Your Rights</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                To exercise any of your data protection rights, you can:
                            </p>
                            <ul className="mb-6 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Log into your account and access the privacy settings</li>
                                <li>Email our Data Protection Officer at dpo@goorder.ng</li>
                                <li>Submit a request through our contact form</li>
                            </ul>
                            <p className="text-gray-600 dark:text-gray-400">
                                We will respond to your request within 30 days. We may ask you to verify your identity before processing your request to ensure we protect your data from unauthorized access.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">10. Complaints</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                If you are not satisfied with our response to your data protection concerns, you have the right to lodge a complaint with the National Information Technology Development Agency (NITDA) at <a href="https://nitda.gov.ng" className="text-emerald-600 hover:underline dark:text-emerald-400" target="_blank" rel="noopener noreferrer">www.nitda.gov.ng</a>.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                            <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong className="text-gray-900 dark:text-white">Data Protection Officer</strong><br />
                                    GoOrder Nigeria<br />
                                    Email: dpo@goorder.ng<br />
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
                                        <Link href="/privacy-policy" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/data-protection" className="text-emerald-600 dark:text-emerald-400">Data Protection</Link>
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
