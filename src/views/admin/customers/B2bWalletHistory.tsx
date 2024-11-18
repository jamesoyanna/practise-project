import { Customer } from '@/store/slices/customers/customerDetails'
import { injectReducer } from '@/store'
import reducer from '@/store/slices/customers/b2bCustomerDetailsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'
import B2bWalletHistoryTableTemplate from '@/components/customers/B2b/B2bWalletHistory'

type CustomerProfileProps = {
    data?: Partial<Customer>
}

injectReducer('b2bCustomerDetails', reducer)

const B2bWalletHistory = () => {
    const param = useParams()
    const navigate = useNavigate()
    console.log('data :', param)

    return (
        <div className="div">
            <div className="flex items-center gap-3 cursor-pointer">
                <span
                    onClick={() => {
                        navigate(`/customers/b2b/`)
                    }}
                >
                    <IoArrowBackOutline />
                </span>
                <span>Customer Details</span>
            </div>
            <div>
                <B2bWalletHistoryTableTemplate customerName={''} />
            </div>
        </div>
    )
}

export default B2bWalletHistory
