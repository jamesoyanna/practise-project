import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'


export default function employeesFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/hub-employees`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const employees = schema.db.employeeData
        const sanitizeEmployees= employees.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeEmployees
        let total = employees.length

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

    // server.get(`${apiPrefix}/orders/analytics`, (schema) => {
    //     return schema.db.orderAnalyticsData[0]
    // })


    // server.del(
    //     `${apiPrefix}/orders/delete`,
    //     (schema, { requestBody }) => {
    //         const { id } = JSON.parse(requestBody)
    //         id.forEach((elm: string) => {
    //             schema.db.ordersData.remove({ id: elm })
    //         })
    //         return true
    //     }
    // )

    // server.get(
    //     `${apiPrefix}/orders-details`,
    //     (schema, { queryParams }) => {
    //         const { id } = queryParams
    //         const orderDetail = schema.db.orderDetailsData
    //         orderDetail[0].id = id
    //         return orderDetail[0]
    //     }
    // )


server.get(`${apiPrefix}/employee-details/:staffId`, (schema, request) => {
    try {
        const staffId = request.params.staffId;
        console.log('staffIdParam :', staffId);

        console.log('schema :', schema.db.employeeData);

        const hubEmployeeDetail = schema.db.employeeData.filter(
            (employee) => employee.staffId === staffId
        );

        console.log('hubEmplooyeeDetail :', hubEmployeeDetail);

        if (hubEmployeeDetail.length > 0) {
            return { data: hubEmployeeDetail[0] };
        } else {
            return { status: 404, error: 'Employee not found' };
        }
    } catch (error) {
        console.error(
            'Error occurred while fetching employee details:',
            error
        );
        return { status: 500, error: 'Internal server error' };
    }
}); 

 // PUT endpoint to update employee details
 server.put(`${apiPrefix}/employee-details/:staffId`, (schema, request) => {
    try {
        const staffId = request.params.staffId;
        const updatedData = JSON.parse(request.requestBody);
        let employee = schema.db.employeeData.find((emp) => emp.staffId === staffId);

        if (employee) {
            employee = { ...employee, ...updatedData };
            schema.db.employeeData.update(employee.staffId, employee);
            return { data: employee };
        } else {
            return { status: 404, error: 'Employee not found' };
        }
    } catch (error) {
        console.error('Error occurred while updating employee details:', error);
        return { status: 500, error: 'Internal server error' };
    }
});

}