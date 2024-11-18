import ApiService from './ApiService'

export async function apiGetOnboarding<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/onboarding',
        method: 'get',
        params,
    })
}

export async function apiGetOnboardingDetails<T>(customerCode: string) {
    
    return ApiService.fetchData<T>({
        url: `/onboarding/${customerCode}`,
        method: 'get',
    });
}

export async function apiGetMissedOnboarding<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/onboarding/missed',
        method: 'get',
        params,
    })
}

export async function apiGetMissedOnboardingDetails<T>(customerCode: string) {
    console.log("api :", "api");
    
    return ApiService.fetchData<T>({
        url: `/onboarding/missed/${customerCode}`,
        method: 'get',
    });
}

export async function apiGetB2bOnboarding<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/onboarding/b2b',
        method: 'get',
        params,
    })
}

export async function apiGetB2bOnboardingDetails<T>(customerCode: string) {
    
    return ApiService.fetchData<T>({
        url: `/onboarding/b2b/${customerCode}`,
        method: 'get',
    });
}

export async function apiGetB2bMissedOnboarding<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/onboarding/b2b/missed',
        method: 'get',
        params,
    })
}

export async function apiGetB2bMissedOnboardingDetails<T>(customerCode: string) {
    console.log("api :", "api");
    
    return ApiService.fetchData<T>({
        url: `/onboarding/b2b/missed/${customerCode}`,
        method: 'get',
    });
}