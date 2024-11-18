import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function hubsFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/dashboard`, (schema) => {
        return schema.db.hubsData[0]
    })

    // server.get(`${apiPrefix}/hubs`, (schema, { requestBody }) => {
    //     const body = JSON.parse(requestBody)
    //     const { pageIndex, pageSize, sort, query } = body
    //     const { order, key } = sort
    //     const hubs = schema.db.hubsData
    //     const sanitizeHubs = hubs.filter(
    //         (elm) => typeof elm !== 'function'
    //     )
    //     let data = sanitizeHubs
    //     let total = hubs.length

    //     if ((key === 'category' || key === 'name') && order) {
    //         data.sort(
    //             sortBy(key, order === 'desc', (a) =>
    //                 (a as string).toUpperCase()
    //             )
    //         )
    //     } else {
    //         data.sort(sortBy(key, order === 'desc', parseInt as Primer))
    //     }

    //     if (query) {
    //         data = wildCardSearch(data, query)
    //         total = data.length
    //     }

    //     data = paginate(data, pageSize, pageIndex)

    //     const responseData = {
    //         data: data,
    //         total: total,
    //     }
    //     return responseData
    // })


    server.post(`${apiPrefix}/hubs`, (schema, { requestBody }) => {
        const body = JSON.parse(requestBody);
        const { pageIndex, pageSize, sort, query, data: newHub } = body;
    
        const { order, key } = sort || {};
    
        const hubs = schema.db.hubsData;
        const sanitizeHubs = hubs.filter((elm) => typeof elm !== 'function');
        const responseData = {
            data: sanitizeHubs,
            total: sanitizeHubs.length,
        };
    
        if ((key === 'category' || key === 'name') && order) {
            responseData.data.sort(
                sortBy(key, order === 'desc', (a) =>
                    (a as string).toUpperCase()
                )
            );
        } else {
            responseData.data.sort(sortBy(key, order === 'desc', parseInt as Primer));
        }
    
        if (query) {
            responseData.data = wildCardSearch(responseData.data, query);
            responseData.total = responseData.data.length;
        }
    
        responseData.data = paginate(responseData.data, pageSize, pageIndex);
    
        // Add the newly created hub to the data if it exists
        if (newHub) {
            responseData.data.push(newHub);
            responseData.total++; // Increment total count
        }
    
        // Remove the outer array wrapper from the response data
        responseData.data = responseData.data.flat(); 
    
        return responseData;
    });
    
   
    
    
    

    

    server.get(`${apiPrefix}/hubs`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const hubs = schema.db.hubsData
        console.log('hubs :', hubs)

        const sanitizehubs = hubs.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizehubs
        let total = hubs.length

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

    server.del(
        `${apiPrefix}/hubs/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            schema.db.hubsData.remove({ id })
            return true
        }
    )

    // server.get(`${apiPrefix}/hub`, (schema, { queryParams }) => {
    //     const id = queryParams.id
    //     const hub = schema.db.hubsData.find(id)
    //     return hub
    // })

    // server.get(`${apiPrefix}/hub/:hubId`, (schema, request) => {
    //     try {
    //         const hubId = request.params.hubId
    //         console.log('hubIdIdParam :', hubId)

    //         console.log('schema :', schema.db.hubsData)

    //         const hubDetail = schema.db.hubsData.filter(
    //             (customer) => customer.hubId === hubId
    //         )
    //         console.log('hubId :', hubDetail)

    //         if (hubDetail) {
    //             return { data: hubDetail }
    //         } else {
    //             return { status: 404, error: 'Customer not found' }
    //         }
    //     } catch (error) {
    //         console.error(
    //             'Error occurred while fetching customer details:',
    //             error
    //         )
    //         return { status: 500, error: 'Internal server error' }
    //     }
    // })
    server.get(`${apiPrefix}/hub/:hubId`, (schema, request) => {
        try {
            const hubId = request.params.hubId;
            console.log('hubIdIdParam :', hubId);
    
            console.log('schema :', schema.db.hubsData);
    
            const hubDetail = schema.db.hubsData.filter(
                (customer) => customer.hubId === hubId
            );
    
            console.log('hubDetail :', hubDetail);
    
            if (hubDetail.length > 0) {
                return { data: hubDetail[0] };
            } else {
                return { status: 404, error: 'Customer not found' };
            }
        } catch (error) {
            console.error(
                'Error occurred while fetching customer details:',
                error
            );
            return { status: 500, error: 'Internal server error' };
        }
    });
    
    
    

    server.put(
        `${apiPrefix}/hubs/update`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            const { id } = data
            schema.db.hubsData.update({ id }, data)
            return true
        }
    )

    server.post(
        `${apiPrefix}/hubs/create`,
        (schema, { requestBody }) => {
            const data = JSON.parse(requestBody)
            schema.db.hubsData.insert(data)
            return true
        }
    )

    server.get(`${apiPrefix}/orders`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const order = queryParams['sort[order]']
        const key = queryParams['sort[key]']
        const orders = schema.db.ordersData
        const sanitizeHUbs = orders.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeHUbs
        let total = orders.length

        if (key) {
            if (
                (key === 'date' ||
                    key === 'status' ||
                    key === 'paymentMehod') &&
                order
            ) {
                data.sort(sortBy(key, order === 'desc', parseInt as Primer))
            } else {
                data.sort(
                    sortBy(key, order === 'desc', (a) =>
                        (a as string).toUpperCase()
                    )
                )
            }
        }

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

    server.del(
        `${apiPrefix}/orders/delete`,
        (schema, { requestBody }) => {
            const { id } = JSON.parse(requestBody)
            id.forEach((elm: string) => {
                schema.db.ordersData.remove({ id: elm })
            })
            return true
        }
    )

    server.get(
        `${apiPrefix}/orders-details`,
        (schema, { queryParams }) => {
            const { id } = queryParams
            const orderDetail = schema.db.orderDetailsData
            orderDetail[0].id = id
            return orderDetail[0]
        }
    )
}
