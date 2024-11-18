import B2cCustomerListSearch from '@/components/customers/B2c/B2cCustomerListSearch'
import B2cTable from '@/components/customers/B2c/B2cTableTemplate'
import { injectReducer } from '@/store'
import reducer from '@/store/slices/customers'

injectReducer('customerB2cList', reducer)

export const HomeUse = () => {
    return (
        <div className="flex flex-col gap-8">
                  <h4>All Home Use (B2C) Customers</h4>

            <div className="">
                <B2cCustomerListSearch />
            </div>
            <B2cTable />
        </div>
    )
}
export default HomeUse
