import ApiService from './ApiService'

export async function apiGetDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/dashboard',
        method: 'get',
    })
}

