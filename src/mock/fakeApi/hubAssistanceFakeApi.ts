import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function hubAssitanceFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/hub-assistance`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const hubAssistance = schema.db.hubassistanceData
        const sanitizeOrders = hubAssistance.filter((elm) => typeof elm !== 'function')
        let data = sanitizeOrders
        let total = hubAssistance.length

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
   

    // get hubAssistance details
    server.get(`${apiPrefix}/hubassistance-details/:hubAssistanceCode`, (schema, request) => {
        try {
            const hubAssistanceCode = request.params.hubAssistanceCode
            const hubAssistanceDetail = schema.db.hubassitanceData.filter(
                (order) => order.hubAssistanceCode === hubAssistanceCode
            )?.[0]
            if (hubAssistanceDetail) {
                return { data: hubAssistanceDetail }
            } else {
                return { status: 404, error: 'order not found' }
            }
        } catch (error) {
            console.error(
                'Error occurred while fetching customer details:',
                error
            )
            return { status: 500, error: 'Internal server error' }
        }
    })

    server.get(`${apiPrefix}/hubassistance/analytics`, (schema) => {
        return schema.db.hubassistanceAnalyticsData[0]
    })

    server.get(`${apiPrefix}/hubassistance-details`, (schema, { queryParams }) => {
        const { id } = queryParams
        const hubAssistanceDetail = schema.db.hubAssistanceDetailsData
        hubAssistanceDetail[0].id = id
        return hubAssistanceDetail[0]
    })
}
