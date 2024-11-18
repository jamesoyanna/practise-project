import ApiService from './ApiService'

export async function apiGetAssets<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/account-officer/assets',
        method: 'get',
        params,
    })
}


export async function apiGetAssetsDetails<T>(customerId: string) {
    console.log("api :", "api");
    
    return ApiService.fetchData<T>({
        url: `/account-officer/assets/${customerId}`,
        method: 'get',
    });
}

