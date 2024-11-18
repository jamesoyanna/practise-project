
import TransactionHistoryDateFilter from '../B2c/TransactionHistoryDateFilter'
import B2bChargeCustomer from './cards/B2bChargeCustomer'
import B2bTransactionHistoryTable from './transactionHistoryTable'

const B2bCustomerTransactionHistory = () => {
    return (
        <div className='pt-5'>
            <div className="flex flex-col gap-4 pb-4 md:hidden">
               
                <div className=" w-full">
                    {/* <TransactionHistoryDateFilter /> */}
                </div>
                <div className="flex items-center justify-between">
                <h4 className="text-sm md:text-base2">
                    Transaction History
                </h4>
                    {/* <ChargeCustomer /> */}
                </div>
            </div>
            <div className="hidden md:flex md:flex-row items-center justify-between pb-4">
                <h4 className="text-sm md:text-base ">
                    Transaction History
                </h4>
                <div >
                    <TransactionHistoryDateFilter />
                </div>
                <div >
                    <B2bChargeCustomer />
                </div>
            </div>
            <div >
                <B2bTransactionHistoryTable />
            </div>
        </div>
    )
}






export default B2bCustomerTransactionHistory