import ApiService from './ApiService'

export async function apiGetHubAssistance<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/hub-assistance',
        method: 'get',
        params,
    })
}

export async function apiGetHubAssistanceDetails<T>(hubAssistanceCode: string) {
    return ApiService.fetchData<T>({
        url: `/hubassistance-details/${hubAssistanceCode}`,
        method: 'get',
    })
}



export async function apiGetStockAnalyticsData<T>() {
    return ApiService.fetchData<T>({
        url: '/hubassistance/analytics',
        method: 'get',
    })
}
