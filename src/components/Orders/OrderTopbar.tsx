import Button from '@/components/ui/Button'
import { MdCancel } from 'react-icons/md'
import NewOrderDialog from './NewOrderDialog'
import ActionBar from './ActionBar'
import { useNavigate } from 'react-router-dom'
import { injectReducer } from '@/store'
import reducer, { useAppSelector } from '../../store/slices/orders'

injectReducer('OrderList', reducer)

const OrderTopbar = () => {
    const navigate = useNavigate()
    const rejectOrders = useAppSelector(
        (state) => state.OrderList.data.orderList
    )
    const rejectedOrdersCount = rejectOrders ? rejectOrders.length : 0

    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex-1">
                <ActionBar />
                <NewOrderDialog />
            </div>
            <div className="text-gray-500 text-lg mx-20">
                Last updated as at 12:30pm
            </div>
            <div>
                <Button
                    variant="solid"
                    color="red-500"
                    size="md"
                    icon={<MdCancel />}
                    onClick={() => {
                        navigate('/reject-orders')
                    }}
                >
                    Rejected Orders
                    {rejectedOrdersCount > 0 && (
                        <span className="relative top-[-2rem] left-9 bg-red-600 text-white rounded-full px-2 py-2 text-xs">
                            {rejectedOrdersCount}
                        </span>
                    )}
                </Button>
            </div>
        </div>
    )
}
export default OrderTopbar
