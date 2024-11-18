import ApiService from './ApiService'

export async function apiGetSettings<T>() {
    return ApiService.fetchData<T>({
        url: '/getsettings',
        method: 'get',
    })
}

export async function apiPutSettings<T>(settingsData: any = null) {
    return ApiService.fetchData<T>({
        url: '/putsettings',
        method: 'put',
        data: settingsData
    });
}


