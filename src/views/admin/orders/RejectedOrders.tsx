import reducer from '../../../store/slices/orders'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RejectedOrdersTable from '@/components/Orders/RejectedOrdersTable'
import OrderTableSearch from '@/components/Orders/OrderTableSearch'

// Inject the reducer for managing orders
injectReducer('OrderList', reducer)

// RejectedOrders component for displaying rejected orders
const RejectedOrders = () => {
    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <div className="lg:flex items-center justify-between mb-4">
                    <h3 className="mb-4 mt-4 ml-8 lg:mb-0">Rejected Orders</h3>
                </div>
                <div className="flex justify-center mb-6">
                    <OrderTableSearch />
                </div>
                <RejectedOrdersTable />
            </AdaptableCard>
        </>
    )
}

export default RejectedOrders;