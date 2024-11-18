import ApiService from './ApiService'

export async function apiGetHubDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/hubdashboard',
        method: 'get',
    })
}

