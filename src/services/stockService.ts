import ApiService from './ApiService'

export async function apiGetStock<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/stocks',
        method: 'get',
        params,
    })
}

export async function apiGetStockDetails<T>(cylinderId: string) {
    return ApiService.fetchData<T>({
        url: `/stock-details/${cylinderId}`,
        method: 'get',
    })
}



export async function apiGetStockAnalyticsData<T>() {
    return ApiService.fetchData<T>({
        url: '/stock/analytics',
        method: 'get',
    })
}
