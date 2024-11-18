import { injectReducer } from '@/store'
import reducer from '@/store/slices/customers/customerDetails'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'
import WalletHistoryTableTemplate from '@/components/customers/B2c/WalletHistoryTableTemplate'


injectReducer('b2cCustomerDetails', reducer)

const WalletHistory = () => {
    const param = useParams()
    const navigate = useNavigate()
    console.log('data :', param)

    return (
        <div className="div">
            <div className="flex items-center gap-3">
                <span
                    onClick={() => {
                        navigate(`/customers/b2c/`)
                    }}
                >
                    <IoArrowBackOutline />
                </span>
                <span>Customer Details</span>
            </div>
            <div>
                <WalletHistoryTableTemplate customerName={''} />
            </div>
           
        </div>
    )
}

export default WalletHistory
