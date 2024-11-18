import { injectReducer } from '@/store'
import reducer from '@/store/slices/customers/customerDetails'
import B2cCustomerName from '@/components/customers/B2c/B2cCustomerName'
import AddOnAsset from '@/components/customers/B2c/AddOnAsset'
import GasQuantityReading from '@/components/customers/B2c/Cards/GasQuantityReading'
import GasQuantityPurchased from '@/components/customers/B2c/Cards/GasQuantityPurchased.tsx'
import TransactionHistory from '@/components/customers/B2c/TransactionHistory'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'

injectReducer('b2cCustomerDetails', reducer)

const B2cView = () => {
    const param = useParams()
    const navigate = useNavigate()
    console.log('data :', param)

    return (
        <div className="div">
            <div className="flex items-center gap-3 mb-[2rem] cursor-pointer font-semibold"   onClick={() => {
                        navigate(`/customers/b2c/`)
                    }}>
                <span
                  
                >
                    <IoArrowBackOutline />
                </span>
                <span>Customer Details</span>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[45%]">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center w-full justify-between">
                        <B2cCustomerName customerId={param.customerId} />
                        <AddOnAsset />
                    </div>
                    <GasQuantityReading />
                </div>
                <GasQuantityPurchased />
            </div>
            <div>
                <TransactionHistory />
            </div>
        </div>
    )
}

export default B2cView
