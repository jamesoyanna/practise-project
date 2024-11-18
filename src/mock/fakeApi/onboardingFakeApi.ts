import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function onboardingFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/onboarding/`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const onboardData = schema.db.onboardingData
        console.log('customers :', onboardData)

        const sanitizeOnboarding = onboardData.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeOnboarding
        let total = onboardData.length

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.get(`${apiPrefix}/onboarding/:customerCode`, (schema, request) => {
        try {
            const customerCode = request.params.customerCode
            console.log('customerCodeParam :', customerCode)

            console.log('schema :', schema.db.onboardingData)

            const customerOnboardingDetail = schema.db.onboardingData.filter(
                (customer) => customer.customerCode === customerCode
            )?.[0]
            console.log('customerCode :', customerOnboardingDetail)

            if (customerOnboardingDetail) {
                return { data: customerOnboardingDetail }
            } else {
                return { status: 404, error: 'Customer not found' }
            }
        } catch (error) {
            console.error(
                'Error occurred while fetching customer details:',
                error
            )
            return { status: 500, error: 'Internal server error' }
        }
    })

    server.get(`${apiPrefix}/onboarding/missed`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const onboardMissedData = schema.db.missedOnboardingData
        console.log('missedOnboarding :', onboardMissedData)

        const sanitizeMissedOnboarding = onboardMissedData.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeMissedOnboarding
        let total = onboardMissedData.length

        if (query) {
            data = wildCardSearch(data, query)
            total = data.length
        }

        data = paginate(data, parseInt(pageSize), parseInt(pageIndex))

        const responseData = {
            data: data,
            total: total,
        }
        return responseData
    })

    server.get(`${apiPrefix}/onboarding/missed/:customerCode`, (schema, request) => {
        try {
            const customerCode = request.params.customerCode
            console.log('customerCodeParam :', customerCode)

            console.log('schema :', schema.db.missedOnboardingData)

            const missedCustomerOnboardingDetail = schema.db.missedOnboardingData.filter(
                (customer) => customer.customerCode === customerCode
            )?.[0]
            console.log('customerCode :', missedCustomerOnboardingDetail)

            if (missedCustomerOnboardingDetail) {
                return { data: missedCustomerOnboardingDetail }
            } else {
                return { status: 404, error: 'Customer not found' }
            }
        } catch (error) {
            console.error(
                'Error occurred while fetching customer details:',
                error
            )
            return { status: 500, error: 'Internal server error' }
        }
    })

    server.get(`${apiPrefix}/onboarding/b2b`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams;
        let data = schema.db.onboardingData.filter(customer => customer.customerBusinessType === "B2B");
    
        if (query) {
            data = wildCardSearch(data, query); 
        }
    
        const total = data.length;
        data = paginate(data, parseInt(pageSize), parseInt(pageIndex));
    
        return {
            data: data,
            total: total
        };
    });

    server.get(`${apiPrefix}/onboarding/b2b/:customerCode`, (schema, request) => {
        try {
            const { customerCode } = request.params;
            const customer = schema.db.onboardingData.find(customer => 
                customer.customerBusinessType === "B2B" && customer.customerCode === customerCode
            );
    
            if (!customer) {
                throw new Error('Customer not found');
            }
    
            return {
                data: customer
            };
        } catch (error: any) {
            return { status: 404, error: error.message };
        }
    });
    
    server.get(`${apiPrefix}/onboarding/b2b/missed`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams;
        let data = schema.db.missedOnboardingData.filter(customer => customer.customerBusinessType === "B2B");
    
        if (query) {
            data = wildCardSearch(data, query); 
        }
    
        const total = data.length;
        data = paginate(data, parseInt(pageSize), parseInt(pageIndex));
    
        return {
            data: data,
            total: total
        };
    });

    server.get(`${apiPrefix}/onboarding/b2b/missed/:customerCode`, (schema, request) => {
        try {
            const { customerCode } = request.params;
            const customer = schema.db.missedOnboardingData.find(customer => 
                customer.customerBusinessType === "B2B" && customer.customerCode === customerCode
            );
    
            if (!customer) {
                throw new Error('Customer not found');
            }
    
            return {
                data: customer
            };
        } catch (error: any) {
            return { status: 404, error: error.message };
        }
    });
    
}

