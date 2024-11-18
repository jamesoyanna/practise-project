import ApiService from './ApiService'

export async function apiGetAccountingData<T>() {
    return ApiService.fetchData<T>({
        url: '/accounting',
        method: 'get',
    })
}

export async function apiGetExpenses<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/accounting/expenses',
        method: 'get',
        params,
    })
}
// Create expense
export async function apiCreateExpense<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/expenses/create',
        method: 'put',
        data,
    })
}

