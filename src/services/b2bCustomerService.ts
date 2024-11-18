import ApiService from './ApiService'

export async function apiGetCustomersB2b<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/customers/b2b',
        method: 'get',
        params,
    })
}


export async function apiGetCustomerB2bDetails<T>(customerId: string) {
    return ApiService.fetchData<T>({
        url: `/customers/b2b/${customerId}`,
        method: 'get',
    });
}

export async function apiPutCustomerTier<T>(customerId: string, updatedData: Partial<T>) {
    return ApiService.fetchData<T>({
        url: `/customers/b2b/${customerId}`, 
        method: 'put',
        data: updatedData
    });
}

export async function apiGetUnpaidCustomers<T, U extends Record<string, unknown>>(
    params: U
){
    return ApiService.fetchData<T>({
        url: '/customers/b2b/unpaid', 
        method: 'get',
       params
    });
}
