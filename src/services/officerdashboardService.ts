import ApiService from './ApiService'

export async function apiGetOfficerDashboardData<T>() {
    console.log("testing")
    return ApiService.fetchData<T>({
        url: '/officer-dashboard',
        method: 'get',
    })
}


