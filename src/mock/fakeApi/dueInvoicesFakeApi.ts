import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function dueInvoicesFakeApi(server: Server, apiPrefix: string) {
server.get(`${apiPrefix}/invoices/due`, (schema, { queryParams }) => {
    const { pageIndex, pageSize, query } = queryParams
    const dueInvoices = schema.db.dueInvoicesData
    console.log('invoices :', dueInvoices)

    const sanitizeB2bCustomers = dueInvoices.filter(
        (elm) => typeof elm !== 'function'
    )
    let data = sanitizeB2bCustomers
    let total = dueInvoices.length

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

    const responseData = {
        data: data,
        total: total,
    }
    return responseData
})

server.get(`${apiPrefix}/invoices/due/:invoiceId`, (schema, request) => {
    console.log('server')

    try {
        console.log('why')

        const invoiceId = request.params.invoiceId
        console.log('invoiceId :', invoiceId)

        console.log('schema :', schema.db.dueInvoicesData)

        const invoiceDetail = schema.db.dueInvoicesData.filter(
            (invoice) => invoice.invoiceId === invoiceId
        )?.[0]
        console.log('invoice :', invoiceDetail)

        if (invoiceDetail) {
            return { data: invoiceDetail }
        } else {
            return { status: 404, error: 'Customer not found' }
        }
    } catch (error) {
        console.error(
            'Error occurred while fetching customer details:',
            error
        )
        return { status: 500, error: 'Internal server error' }
    }
})
}