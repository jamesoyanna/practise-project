export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    userauthenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    accountofficerEntryPath: string
    hubAssistanceEntryPath: string
    maintenancestoreEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/dashboard',
    userauthenticatedEntryPath: '/hub-dashboard',
    accountofficerEntryPath:'/account-officer/dashboard',
    hubAssistanceEntryPath:'/stocks',
    maintenancestoreEntryPath:'/maintenance-dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: true,
}

export default appConfig
