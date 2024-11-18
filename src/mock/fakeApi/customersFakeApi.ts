import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function customerFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/customers/b2c`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query, } = queryParams
        const customers = schema.db.customerB2cData
        console.log('customers :', customers)

        const sanitizeCustomers = customers.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeCustomers
        let total = customers.length

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

    server.get(`${apiPrefix}/customers/b2c/:customerId`, (schema, request) => {
        try {
            const customerId = request.params.customerId
            console.log('customerIdParam :', customerId)

            console.log('schema :', schema.db.customerB2cData)

            const customerDetail = schema.db.customerB2cData.filter(
                (customer) => customer.customerId === customerId
            )?.[0]
            console.log('customerId :', customerDetail)

            if (customerDetail) {
                return { data: customerDetail }
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
