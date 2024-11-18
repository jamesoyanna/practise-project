import ApiService from './ApiService'

export async function apiGetOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/orders',
        method: 'get',
        params,
    })
}

export async function apiGetOrderDetails<T>(orderCode: string) {
    return ApiService.fetchData<T>({
        url: `/order-details/${orderCode}`,
        method: 'get',
    })
}
export async function apiGetRejectedOrderDetails<T>(orderCode: string) {
    return ApiService.fetchData<T>({
        url: `/rejected-order-details/${orderCode}`,
        method: 'get',
    })
}

export async function apiGetRejectedOrders<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/rejected-orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteOrders<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/orders/delete',
        method: 'delete',
        data,
    })
}

export async function apiGeOrderDetails<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/orders-details',
        method: 'get',
        params,
    })
}

export async function apiGetOrderAnalyticsData<T>() {
    return ApiService.fetchData<T>({
        url: '/orders/analytics',
        method: 'get',
    })
}
