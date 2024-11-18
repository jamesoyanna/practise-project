import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function assetsFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/account-officer/assets`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query, } = queryParams
        const assets = schema.db.assetsData
        console.log('customers :', assets)

        const sanitizeAssets = assets.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeAssets
        let total = assets.length

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

    server.get(`${apiPrefix}/account-officer/assets/:customerId`, (schema, request) => {
        try {
            const customerId = request.params.customerId
            console.log('customerIdParam :', customerId)

            console.log('schema :', schema.db.assetsData)

            const assetsDetail = schema.db.assetsData.filter(
                (customer) => customer.customerId === customerId
            )?.[0]
            console.log('customerId :', assetsDetail)

            if (assetsDetail) {
                return { data: assetsDetail }
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
