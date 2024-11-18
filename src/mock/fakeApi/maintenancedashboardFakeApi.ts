import type { Server } from 'miragejs'

export default function maintenancedashboardFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/maintenancedashboard`, (schema) => {
        return schema.db.maintenancedashboardData[0]
    })


// get maintenance details
server.get(`${apiPrefix}/maintenance-details/:maintenanceCode`, (schema, request) => {
    try {
        const maintenanceCode = request.params.maintenanceCode
        const maintenanceDetail = schema.db.maintenanceData.filter(
            (maintenance) => maintenance.maintenanceCode === maintenanceCode
        )

        if (maintenanceDetail) {
            return { data: maintenanceDetail }
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

}
