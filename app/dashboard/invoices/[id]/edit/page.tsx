import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

interface pageProp{
    params: Promise<{id: string}>;
}

export default async function Page(props: pageProp) {
    const params = await props.params;
    const id = params.id;
    // const invoice = await fetchInvoiceById(id);
    // const customers = await fetchCustomers();
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers(),
    ])

    if (!invoice){
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    {label: 'Invoices', href: '/dashboard/invoices'},
                    {
                        label: 'Edit Inovice', 
                        href: `/dashboard/invoices/${id}/edit`, 
                        active: true,
                    }
                ]}
            />
            <Form invoice={invoice} customers={customers}/>
        </main>
    );
}