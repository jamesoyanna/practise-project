import ApiService from './ApiService'

export async function apiGetDashboardData<
    T extends Record<string, unknown>
>() {
    return ApiService.fetchData<T>({
        url: '/dashboard',
        method: 'post',
    })
}


export async function apiGetHubs<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/hubs',
        method: 'get',
        params,
    })
}


//hubs post
export async function apiPostHubs<T, U extends Record<string, unknown>>(
    data: U
) {
    const response = await ApiService.fetchData<T>({
        url: '/hubs',
        method: 'post',
        data,
    });

    console.log('Response:', response); // Log the response object

    return response;
}



export async function apiGetHubDetails<T>(hubId: string) {
    console.log("api :", "api");
    return ApiService.fetchData<T>({
        url: `/hub/${hubId}`,
        method: 'get',
    });
}

// export async function apiPutHub<T, U extends Record<string, unknown>>(
//     data: U
// ) {
//     return ApiService.fetchData<T>({
//         url: '/hub/update',
//         method: 'put',
//         data,
//     })
// }

export async function apiCreateHub<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/hubs/create',
        method: 'post',
        data,
    })
}

export async function apiGetOrders<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/orders',
        method: 'get',
        params,
    })
}

export async function apiDeleteOrders<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/order/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetOrderDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/orders-details',
        method: 'get',
        params,
    })
}
