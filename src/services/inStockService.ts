import ApiService from './ApiService'

export async function apiGetInStockData<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/instock',
        method: 'get',
        params,
    })
}

export async function apiGetInStockStats<T>(
) {
    try {
        const response = await ApiService.fetchData<T>({
            url: `/instock/stats`,
            method: 'GET',
            // params,
        })
        console.log('stats1010 :', response)

        return response
    } catch (error) {
        console.error('Error fetching in-stock statistics:', error)
        throw error
    }
}
