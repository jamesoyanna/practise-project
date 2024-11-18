import type { Server } from 'miragejs'

export default function dashboardFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/dashboard`, (schema) => {
        return schema.db.dashboardData[0]
    })
}
