import ApiService from './ApiService'

export async function apiGetCustomersB2c<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/customers/b2c',
        method: 'get',
        params,
    })
}


export async function apiGetCustomerB2cDetails<T>(customerId: string) {
    console.log("api :", "api");
    
    return ApiService.fetchData<T>({
        url: `/customers/b2c/${customerId}`,
        method: 'get',
    });
}

