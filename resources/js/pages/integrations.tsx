import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BookOpen, CheckCircle2, MessageCircle, Package, Phone, RefreshCw, ShoppingBag, Unplug } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppStatus {
    connected: boolean;
    display_phone_number?: string;
    verified_name?: string;
    waba_name?: string;
    quality_rating?: string;
    catalog_id?: string;
    catalog_name?: string;
    commerce_enabled?: boolean;
    last_synced_at?: string;
}

interface Shop {
    id: number;
    name: string;
    public_id: string;
    image: string | null;
    products_count: number;
}

interface Props {
    whatsapp: WhatsAppStatus;
    shops: Shop[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Integrations',
        href: '/vendor/integrations',
    },
];

export default function Integrations({ whatsapp, shops }: Props) {
    const [settingUpCatalog, setSettingUpCatalog] = useState(false);
    const [syncingShop, setSyncingShop] = useState<number | null>(null);

    const handleConnect = () => {
        // Server-side redirect — no FB SDK needed
        window.location.href = '/vendor/integrations/whatsapp/redirect';
    };

    const handleDisconnect = () => {
        if (!confirm('Are you sure you want to disconnect your WhatsApp Business Account?')) return;
        router.delete('/vendor/integrations/whatsapp/disconnect');
    };

    const handleSetupCatalog = () => {
        setSettingUpCatalog(true);
        router.post(
            '/vendor/integrations/whatsapp/catalog/setup',
            {},
            { onFinish: () => setSettingUpCatalog(false) }
        );
    };

    const handleSyncProducts = (shopId: number) => {
        setSyncingShop(shopId);
        router.post(
            '/vendor/integrations/whatsapp/catalog/sync',
            { shop_id: shopId },
            { onFinish: () => setSyncingShop(null) }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Integrations" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <h1 className="text-lg font-semibold">Integrations</h1>
                    <p className="text-xs text-muted-foreground">Connect third-party services to enhance your shops.</p>
                </div>

                {/* Catalog management — shown only when WhatsApp is connected */}
                {whatsapp.connected && (
                    <Card className="border border-border/40 shadow-none">
                        <CardHeader className="pb-2 pt-3 px-4">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                Product Catalog
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-4 pb-4">
                            {!whatsapp.catalog_id ? (
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0">
                                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Set up your WhatsApp Catalog</p>
                                        <p className="text-xs text-muted-foreground mt-0.5 mb-3">
                                            Create a Facebook Product Catalog connected to your WhatsApp Business Account so customers can browse and order your products directly in WhatsApp.
                                        </p>
                                        <Button
                                            size="sm"
                                            onClick={handleSetupCatalog}
                                            disabled={settingUpCatalog}
                                        >
                                            {settingUpCatalog ? (
                                                <>
                                                    <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                                    Setting up...
                                                </>
                                            ) : (
                                                <>
                                                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                                                    Setup Catalog
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Catalog Active
                                        </span>
                                        {whatsapp.catalog_name && (
                                            <span className="text-xs text-muted-foreground">{whatsapp.catalog_name}</span>
                                        )}
                                        {whatsapp.last_synced_at && (
                                            <span className="text-xs text-muted-foreground ml-auto">
                                                Last synced {whatsapp.last_synced_at}
                                            </span>
                                        )}
                                    </div>

                                    {shops.length > 0 ? (
                                        <div className="space-y-2">
                                            <p className="text-xs font-medium text-muted-foreground">Sync products by shop</p>
                                            {shops.map((shop) => (
                                                <div key={shop.id} className="flex items-center justify-between rounded-lg border border-border/40 p-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                                                            {shop.image ? (
                                                                <img src={`/storage/${shop.image}`} alt={shop.name} className="h-full w-full object-cover" />
                                                            ) : (
                                                                <Package className="h-4 w-4 text-muted-foreground" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{shop.name}</p>
                                                            <p className="text-xs text-muted-foreground">{shop.products_count} active product{shop.products_count !== 1 ? 's' : ''}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleSyncProducts(shop.id)}
                                                        disabled={syncingShop === shop.id || shop.products_count === 0}
                                                    >
                                                        {syncingShop === shop.id ? (
                                                            <>
                                                                <RefreshCw className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                                                Syncing...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                                                                Sync Products
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">No shops found. Create a shop first to sync products.</p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[280px]">Integration</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[160px]">Status</TableHead>
                                <TableHead className="w-[140px] text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                                            <MessageCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">WhatsApp Business API</p>
                                            {whatsapp.connected && whatsapp.display_phone_number && (
                                                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                                    <Phone className="h-3 w-3" />
                                                    {whatsapp.display_phone_number}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {whatsapp.connected
                                        ? `Connected as ${whatsapp.verified_name || whatsapp.waba_name || 'your business'}. Customers can now order via WhatsApp.`
                                        : 'Connect your WhatsApp Business account to receive orders and send notifications to customers.'}
                                </TableCell>
                                <TableCell>
                                    {whatsapp.connected ? (
                                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Connected
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400">
                                            Not Connected
                                        </span>
                                    )}
                                </TableCell>
                                <TableCell className="text-right">
                                    {whatsapp.connected ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={handleDisconnect}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                                        >
                                            <Unplug className="mr-1.5 h-3.5 w-3.5" />
                                            Disconnect
                                        </Button>
                                    ) : (
                                        <Button size="sm" onClick={handleConnect}>
                                            Connect
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
