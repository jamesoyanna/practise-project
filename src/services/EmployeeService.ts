import ApiService from './ApiService'

export async function apiGetEmployees<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/hub-employees',
        method: 'get',
        params,
    })
}

export async function apiAddEmployees<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/employee/list/add',
        method: 'post',
        data,
    })
}

export async function apiGetHubEmployeeDetails<T>(staffId: string) { 
    console.log("api :", "api");
    
    return ApiService.fetchData<T>({
        url: `/employee-details/${staffId}`,
        method: 'get',
    });
}


export async function apiSaveEmployeeDetails<T, U extends Record<string, unknown>>(data: U) {
    return ApiService.fetchData<T>({
        url: `/employee-details/${data.id}`,
        method: 'put', 
        data,
    });
}

