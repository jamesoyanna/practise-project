import B2bUnpaidCustomersTable from '@/components/invoices/InvoiceTableTemplate'
import reducer from '@/store/slices/dueInvoices'
import { injectReducer } from '@/store'
import InvoicesListSearch from '@/components/invoices/invoicesListSearch'

injectReducer('dueInvoicesList', reducer)

const Invoices = () => {
    return (
        <div className='space-y-4'>
            <h4>Due Invoices</h4>
            <InvoicesListSearch />
            <B2bUnpaidCustomersTable />
        </div>
    )
}

export default Invoices
