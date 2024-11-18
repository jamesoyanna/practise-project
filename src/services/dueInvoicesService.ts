import ApiService from "./ApiService";

export async function apiGetDueInvoices<T, U extends Record<string, unknown>>(
    params: U
){
    return ApiService.fetchData<T>({
        url: '/invoices/due', 
        method: 'get',
       params
    });
}

export async function apiGetDueInvoiceDetails<T>(invoiceId: string) {
    return ApiService.fetchData<T>({
        url: `/invoices/due/${invoiceId}`,
        method: 'get',
    });
}