import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function ordersFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/orders`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        // const order = queryParams['sort[order]']
        // const key = queryParams['sort[key]']
        const orders = schema.db.ordersData
        const sanitizeOrders = orders.filter((elm) => typeof elm !== 'function')
        let data = sanitizeOrders
        let total = orders.length

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
   

    // get order details
    server.get(`${apiPrefix}/order-details/:orderCode`, (schema, request) => {
        try {
            const orderCode = request.params.orderCode
            const orderDetail = schema.db.ordersData.filter(
                (order) => order.orderCode === orderCode
            )?.[0]

            if (orderDetail) {
                return { data: orderDetail }
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

    // Get rejected order details
    server.get(
        `${apiPrefix}/rejected-order-details/:orderCode`,
        (schema, request) => {
            try {
                const orderCode = request.params.orderCode
                const rejectedOrderDetail = schema.db.rejectedordersData.filter(
                    (order) => order.orderCode === orderCode
                )?.[0]

                if (rejectedOrderDetail) {
                    return { data: rejectedOrderDetail }
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
        }
    )

    server.get(`${apiPrefix}/rejected-orders`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const rejectOrders = schema.db.rejectedordersData
        const sanitizeOrders = rejectOrders.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeOrders
        let total = rejectOrders.length

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

    server.get(`${apiPrefix}/orders/analytics`, (schema) => {
        return schema.db.orderAnalyticsData[0]
    })

    server.del(`${apiPrefix}/orders/delete`, (schema, { requestBody }) => {
        const { id } = JSON.parse(requestBody)
        id.forEach((elm: string) => {
            schema.db.ordersData.remove({ id: elm })
        })
        return true
    })

    server.get(`${apiPrefix}/orders-details`, (schema, { queryParams }) => {
        const { id } = queryParams
        const orderDetail = schema.db.orderDetailsData
        orderDetail[0].id = id
        return orderDetail[0]
    })
}
