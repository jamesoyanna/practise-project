import { injectReducer } from '@/store'
import reducer from '@/store/slices/customers/b2bCustomerDetailsSlice'
import B2bCustomerName from '@/components/customers/B2b/B2bCustomerName'
import { useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackOutline } from 'react-icons/io5'
import AddOnAsset from '@/components/customers/B2b/AddOnAsset'
import QuantityReadingSlider from '@/components/customers/B2b/QuantityReadingSlider'
import QuantityPurchased from '@/components/customers/B2b/cards/QuantityPurchased'
import B2bCustomerTransactionHistory from '@/components/customers/B2b/B2bCustomerTransactionHistory'



injectReducer('b2bCustomerDetails', reducer)

const B2bView = () => {
    const param = useParams()
    const navigate =  useNavigate()

    return (
        <div className="div">
            <div className="flex items-center gap-3 mb-[2rem] cursor-pointer font-semibold" onClick={() => {
                    navigate(`/customers/b2b`)
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
                        <B2bCustomerName customerId={param.customerId} />
                        <AddOnAsset />
                    </div>
                    {/* typeError from component */}
                    <QuantityReadingSlider totalGas={0} gasCurrentReading={0}  />
                </div>
                <QuantityPurchased />
            </div>
            <div>
                <B2bCustomerTransactionHistory />
            </div>
        </div>
    )
}

export default B2bView
