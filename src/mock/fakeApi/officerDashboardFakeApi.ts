import type { Server } from 'miragejs'

export default function officerdashboardFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/officer-dashboard`, (schema) => {
        console.log("api :", schema.db.officerdashboardData[0])
        return schema.db.officerdashboardData[0]

    })
}
