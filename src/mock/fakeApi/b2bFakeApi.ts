import wildCardSearch from '@/utils/wildCardSearch'
import paginate from '@/utils/paginate'
import type { Server } from 'miragejs'

export default function customerB2bFakeApi(server: Server, apiPrefix: string) {
    server.get(`${apiPrefix}/customers/b2b`, (schema, { queryParams }) => {
        const { pageIndex, pageSize, query } = queryParams
        const b2bCustomers = schema.db.customerB2bData
        console.log('customers :', b2bCustomers)

        const sanitizeB2bCustomers = b2bCustomers.filter(
            (elm) => typeof elm !== 'function'
        )
        let data = sanitizeB2bCustomers
        let total = b2bCustomers.length

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

    server.get(`${apiPrefix}/customers/b2b/:customerId`, (schema, request) => {
        console.log('server')

        try {
            console.log('why')

            const customerId = request.params.customerId
            console.log('customerIdParam :', customerId)

            console.log('schema :', schema.db.customerB2bData)

            const customerDetail = schema.db.customerB2bData.filter(
                (customer) => customer.customerId === customerId
            )?.[0]
            console.log('customerId :', customerDetail)

            if (customerDetail) {
                return { data: customerDetail }
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

    server.put(`${apiPrefix}/customers/b2b/:customerId`, (schema, request) => {
        const customerId = request.params.customerId
        const updatedData = JSON.parse(request.requestBody)
        console.log('Customer tier put request for customer ID:', customerId)
        console.log('Updated data:', updatedData)

        const existingCustomer = schema.db.customerB2bData.findBy({
            customerId,
        })
        console.log('existing customer :', existingCustomer)

        if (!existingCustomer) {
            return {
                status: 404,
                headers: {},
                body: { error: 'Customer not found' },
            }
        }
        for (const key of Object.keys(updatedData)) {
            if (Object.prototype.hasOwnProperty.call(updatedData, key)) {
                existingCustomer[key] = updatedData[key]
            }
        }

        console.log('Customer tier put response: ', existingCustomer)

        return existingCustomer
    })

    server.get(`${apiPrefix}/customers/b2b/unpaid`, (schema, request) => {
        const { pageIndex, pageSize, query } = request.queryParams;
        const b2bCustomers = schema.db.customerB2bData;
    
        const unpaidCustomers = b2bCustomers.map(customer => ({
            ...customer,
            transactionHistory: customer.transactionHistory.filter(
                (                transaction: { status: string }) => transaction.status === 'Unpaid'
            )
        })).filter(customer => customer.transactionHistory.length > 0);
    
        let data = unpaidCustomers;
        let total = unpaidCustomers.length;
    
        if (query) {
            data = wildCardSearch(data, query);
            total = data.length;
        }
    
        data = paginate(data, parseInt(pageSize), parseInt(pageIndex));
        const unpaidInvoiceIDs = unpaidCustomers.map(customer => (
            customer.transactionHistory.map((transaction: { invoiceID: any }) => transaction.invoiceID)
        ));
    
        const responseData = {
            data: data,
            total: total,
            unpaidInvoiceIDs: unpaidInvoiceIDs
        };
    
        return responseData;
    });
    
    server.get(`${apiPrefix}/customers/b2b/unpaid/transactions`, (schema, request) => {
        const b2bCustomers = schema.db.customerB2bData;
    
        // Array to hold transaction history with unpaid status
        const unpaidTransactions: any[] = [];
    
        // Iterate through each customer and filter their transaction history
        b2bCustomers.forEach((customer: any) => {
            const unpaidTransactionsForCustomer = customer.transactionHistory.filter(
                (transaction: { status: string }) => transaction.status === 'Unpaid'
            );
            
            // Push unpaid transactions for this customer to the main array
            unpaidTransactions.push(...unpaidTransactionsForCustomer);
        });
    
        // Return the unpaid transaction history
        return unpaidTransactions;
    });
    
}
