import ApiService from './ApiService'

export async function apiGetMaintenanceDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/maintenancedashboard',
        method: 'get',
    })
}

export async function apiGetMaintenanceDetails<T>(maintenanceCode: string) {
    return ApiService.fetchData<T>({
        url: `/maintenance-details/${maintenanceCode}`,
        method: 'get',
    })
}

