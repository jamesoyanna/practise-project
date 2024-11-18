import type { Server } from 'miragejs'
import paginate from '@/utils/paginate'

// Get Accounting Analytics data
export default function accoutningFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/accounting`, (schema) => {
        return schema.db.accountingData[0]
    })

    // Get expense data
    server.get(
        `${apiPrefix}/accounting/expenses`,
        (schema, { queryParams }) => {
            const { pageIndex, pageSize } = queryParams
            const orders = schema.db.expenseData
            const sanitizeOrders = orders.filter(
                (elm) => typeof elm !== 'function'
            )
            let data = sanitizeOrders
            const total = orders.length
            data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

            const responseData = {
                data: data,
                total: total,
            }
            return responseData
        }
    )

    // Create Expense
    server.put(`${apiPrefix}/expenses/create`, (schema, { requestBody }) => {
        const data = JSON.parse(requestBody)

        schema.db.expenseData.insert(data)

        return schema.db.expenseData
    })
}
