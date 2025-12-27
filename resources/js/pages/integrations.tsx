import { Button } from '@/components/ui/button';
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
import { Head } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Integrations',
        href: '/integrations',
    },
];

const integrations = [
    {
        id: 1,
        name: 'WhatsApp Business API',
        description: 'Connect your WhatsApp Business account to receive orders and send notifications to customers.',
        icon: MessageCircle,
        status: 'not_connected',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
    },
];

export default function Integrations() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Integrations" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Integrations</h1>
                
                <div className="rounded-lg border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Integration</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="w-[150px]">Status</TableHead>
                                <TableHead className="w-[120px] text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {integrations.map((integration) => (
                                <TableRow key={integration.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${integration.bgColor}`}>
                                                <integration.icon className={`h-5 w-5 ${integration.color}`} />
                                            </div>
                                            <span className="font-medium">{integration.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {integration.description}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            integration.status === 'connected'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant={integration.status === 'connected' ? 'outline' : 'default'}
                                            size="sm"
                                        >
                                            {integration.status === 'connected' ? 'Configure' : 'Connect'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
