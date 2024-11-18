import B2bCustomerListSearch from "@/components/customers/B2b/B2bCustomerListSearch"
import B2bTable from "@/components/customers/B2b/B2bTableTemplate"
import { injectReducer } from "@/store"
import reducer from "@/store/slices/customers/b2bCustomerSlice"

injectReducer('customerB2bList', reducer)

const B2b = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="div">
      <B2bCustomerListSearch/>

      </div>
      <B2bTable/>
    </div>
  )
}
export default B2b