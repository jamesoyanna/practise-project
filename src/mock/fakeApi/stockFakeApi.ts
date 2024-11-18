import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function stockFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/stocks`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const stock = schema.db.StockData
        const sanitizeOrders = stock.filter((elm) => typeof elm !== 'function')
        let data = sanitizeOrders
        let total = stock.length

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
   

    // get stock details
    server.get(`${apiPrefix}/stock-details/:cylinderId`, (schema, request) => {
        try {
            const cylinderId = request.params.cylinderId
            const stockDetail = schema.db.StockData.filter(
                (stock) => stock.cylinderId === cylinderId
            )?.[0]
            if ( stockDetail) {
                return { data:  stockDetail }
            } else {
                return { status: 404, error: 'cylinder not found' }
            }
        } catch (error) {
            console.error(
                'Error occurred while fetching stock details:',
                error
            )
            return { status: 500, error: 'Internal server error' }
        }
    })

    server.get(`${apiPrefix}/stock/analytics`, (schema) => {
        return schema.db.stockAnalyticsData[0]
    })

    server.get(`${apiPrefix}/stock-details`, (schema, { queryParams }) => {
        const { id } = queryParams
        const stockDetail = schema.db.StockDetailsData
        stockDetail[0].id = id
        return stockDetail[0]
    })
}
