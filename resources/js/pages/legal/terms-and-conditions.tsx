import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, Phone } from 'lucide-react';

export default function TermsAndConditions() {
    return (
        <>
            <Head title="Terms and Conditions - GoOrder">
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
                            Terms and Conditions
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Last updated: {new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>

                    <div className="prose prose-gray max-w-none dark:prose-invert">
                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">1. Introduction and Acceptance</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                Welcome to GoOrder. These Terms and Conditions ("Terms") govern your access to and use of the GoOrder platform, including our website, mobile applications, and all related services (collectively, the "Platform").
                            </p>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform. These Terms constitute a legally binding agreement between you and GoOrder Nigeria ("GoOrder," "we," "our," or "us").
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                We may modify these Terms at any time. Continued use of the Platform after any changes constitutes acceptance of the modified Terms.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">2. Definitions</h2>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li><strong>"Platform"</strong> refers to the GoOrder website, mobile applications, and all related services.</li>
                                <li><strong>"User"</strong> refers to any individual who accesses or uses the Platform, including Customers and Vendors.</li>
                                <li><strong>"Customer"</strong> refers to Users who purchase products or services through the Platform.</li>
                                <li><strong>"Vendor"</strong> refers to Users who sell products or services through the Platform.</li>
                                <li><strong>"Shop"</strong> refers to a Vendor's online storefront on the Platform.</li>
                                <li><strong>"Content"</strong> refers to text, images, videos, product listings, and any other materials displayed on the Platform.</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">3. Account Registration</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">3.1 Eligibility</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                To use the Platform, you must be at least 18 years old and have the legal capacity to enter into binding contracts. By registering, you represent that you meet these requirements.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">3.2 Account Responsibilities</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                You are responsible for:
                            </p>
                            <ul className="mb-4 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Providing accurate and complete registration information</li>
                                <li>Maintaining the confidentiality of your account credentials</li>
                                <li>All activities that occur under your account</li>
                                <li>Notifying us immediately of any unauthorized use of your account</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">3.3 Account Termination</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                We reserve the right to suspend or terminate your account at any time for violation of these Terms, fraudulent activity, or any conduct that we deem harmful to the Platform or other Users.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">4. Customer Terms</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">4.1 Purchasing Products</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                When you place an order through the Platform:
                            </p>
                            <ul className="mb-4 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>You are making an offer to purchase from the Vendor</li>
                                <li>The Vendor has the right to accept or decline your order</li>
                                <li>Prices displayed are set by Vendors and may change without notice</li>
                                <li>You agree to pay the full price including any delivery fees</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">4.2 Payments</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                All payments are processed in Nigerian Naira (NGN). By making a purchase, you authorize us to charge your selected payment method. GoOrder uses secure third-party payment processors and does not store your payment card details.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">4.3 Delivery</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                Delivery is handled by individual Vendors or their appointed delivery partners. Delivery times and costs are estimates and may vary. GoOrder is not responsible for delays caused by factors outside our control.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">4.4 Returns and Refunds</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Return and refund policies are set by individual Vendors. Please review the Vendor's policy before making a purchase. In case of disputes, GoOrder may facilitate resolution but is not obligated to provide refunds for Vendor products.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">5. Vendor Terms</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">5.1 Shop Registration</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                To sell on GoOrder, you must register as a Vendor and create a Shop. By registering, you represent that:
                            </p>
                            <ul className="mb-4 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>You have the legal right to sell the products you list</li>
                                <li>Your products comply with all applicable Nigerian laws and regulations</li>
                                <li>Product descriptions and images are accurate and not misleading</li>
                                <li>You will fulfill orders in a timely manner</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">5.2 Prohibited Products</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                Vendors may not sell:
                            </p>
                            <ul className="mb-4 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Illegal or controlled substances</li>
                                <li>Counterfeit or stolen goods</li>
                                <li>Products that infringe intellectual property rights</li>
                                <li>Weapons, explosives, or hazardous materials</li>
                                <li>Adult content or services</li>
                                <li>Any product prohibited by Nigerian law</li>
                            </ul>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">5.3 Fees and Payments</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                GoOrder may charge transaction fees or commissions on sales. Fee structures will be communicated to Vendors and may be updated with notice. Vendors are responsible for their own tax obligations.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">5.4 Vendor Obligations</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Vendors must maintain accurate inventory, respond to customer inquiries promptly, fulfill orders within stated timeframes, and resolve disputes in good faith.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">6. Intellectual Property</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">6.1 GoOrder's Intellectual Property</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                The Platform, including its design, features, and content created by GoOrder, is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our written permission.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">6.2 User Content</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                By posting content on the Platform (including product listings, reviews, and images), you grant GoOrder a non-exclusive, royalty-free, worldwide license to use, display, and distribute that content in connection with the Platform. You represent that you own or have the right to share any content you post.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">6.3 Infringement Claims</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                If you believe your intellectual property rights have been violated on the Platform, please contact us with details of the alleged infringement. We will investigate and take appropriate action.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">7. Prohibited Conduct</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                You agree not to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>Use the Platform for any illegal purpose</li>
                                <li>Harass, threaten, or abuse other Users</li>
                                <li>Post false, misleading, or defamatory content</li>
                                <li>Attempt to gain unauthorized access to the Platform or other accounts</li>
                                <li>Interfere with the proper functioning of the Platform</li>
                                <li>Use automated systems to access the Platform without permission</li>
                                <li>Manipulate reviews, ratings, or feedback</li>
                                <li>Circumvent fees or payment systems</li>
                                <li>Engage in fraudulent transactions</li>
                            </ul>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">8. Limitation of Liability</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                To the maximum extent permitted by Nigerian law:
                            </p>
                            <ul className="mb-4 list-disc pl-6 text-gray-600 dark:text-gray-400">
                                <li>GoOrder provides the Platform "as is" without warranties of any kind</li>
                                <li>We do not guarantee the accuracy, completeness, or reliability of any content</li>
                                <li>We are not liable for any indirect, incidental, special, or consequential damages</li>
                                <li>Our total liability shall not exceed the amount you paid to us in the preceding 12 months</li>
                            </ul>
                            <p className="text-gray-600 dark:text-gray-400">
                                GoOrder acts as a marketplace connecting Vendors and Customers. We are not responsible for the quality, safety, or legality of products sold by Vendors.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">9. Indemnification</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                You agree to indemnify, defend, and hold harmless GoOrder, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">10. Dispute Resolution</h2>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">10.1 Between Users</h3>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                GoOrder may provide tools to help resolve disputes between Customers and Vendors but is not obligated to do so. Users are encouraged to resolve disputes directly before involving GoOrder.
                            </p>

                            <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">10.2 With GoOrder</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Any disputes arising from these Terms or your use of the Platform shall be governed by Nigerian law. You agree to attempt to resolve disputes through informal negotiation before pursuing formal legal action. Any legal proceedings shall be conducted in the courts of Nigeria.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">11. Privacy</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your use of the Platform is also governed by our <Link href="/privacy-policy" className="text-emerald-600 hover:underline dark:text-emerald-400">Privacy Policy</Link> and <Link href="/data-protection" className="text-emerald-600 hover:underline dark:text-emerald-400">Data Protection Policy</Link>, which explain how we collect, use, and protect your personal information.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">12. Modifications to the Platform</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                We reserve the right to modify, suspend, or discontinue any aspect of the Platform at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Platform.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">13. Third-Party Links and Services</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                The Platform may contain links to third-party websites or services. These links are provided for convenience only. GoOrder is not responsible for the content, privacy practices, or terms of any third-party sites or services.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">14. Severability</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">15. Entire Agreement</h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                These Terms, together with our Privacy Policy and Data Protection Policy, constitute the entire agreement between you and GoOrder regarding your use of the Platform and supersede any prior agreements.
                            </p>
                        </section>

                        <section className="mb-10">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">16. Contact Information</h2>
                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900">
                                <p className="text-gray-600 dark:text-gray-400">
                                    <strong className="text-gray-900 dark:text-white">GoOrder Nigeria</strong><br />
                                    Email: legal@goorder.ng<br />
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
                                        <Link href="/data-protection" className="text-gray-600 transition hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400">Data Protection</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms-and-conditions" className="text-emerald-600 dark:text-emerald-400">Terms & Conditions</Link>
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
