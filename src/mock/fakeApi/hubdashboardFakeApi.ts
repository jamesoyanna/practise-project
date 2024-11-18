import type { Server } from 'miragejs'

export default function hubdashboardFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/hubdashboard`, (schema) => {
        return schema.db.hubdashboardData[0]
    })
}
