import { Server } from 'miragejs'

export default function settingsDataFakeApi(server: Server, apiPrefix: string) {
    server.post(`${apiPrefix}/settings`, (schema, request) => {
        const requestBody = JSON.parse(request.requestBody)
        console.log('settings request :', requestBody)
        const res = Object.assign(schema.db.settingsData, requestBody)
        console.log('settings response :', res)

        return res
    })

    server.get(`${apiPrefix}/getsettings`, (schema) => {
        const settings = schema.db.settingsData
        console.log('settings :', settings)
        const res = settings[0]
        console.log('api res :', res)

        return res
    })

    server.put(`${apiPrefix}/putsettings`, (schema, request) => {
        const requestBody = JSON.parse(request.requestBody);
        console.log('settings put request:', requestBody);
        
        const existingSettingsData = schema.db.settingsData;
    
        // Update existingSettingsData properties based on requestBody
        for (const key of Object.keys(requestBody)) {
            const currentKey: any = key;
            // Now you can safely use currentKey without TypeScript errors
            if (Object.prototype.hasOwnProperty.call(requestBody, currentKey)) {
                existingSettingsData[currentKey] = {
                    ...existingSettingsData[currentKey],
                    ...requestBody[currentKey],
                };
            }
        }
    
        console.log("settings put response :", existingSettingsData);
    
        return existingSettingsData[0];
    });
    

}
