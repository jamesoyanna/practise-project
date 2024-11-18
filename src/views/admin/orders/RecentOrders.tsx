import reducer from '../../../store/slices/orders'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import RecentOrdersTable from '@/components/Orders/RecentOrdersTable';

injectReducer('OrderList', reducer)

const OrderList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 mt-4 ml-8 lg:mb-0">Recent Stock Orders</h3>
            </div>
            <RecentOrdersTable />
        </AdaptableCard>
    )
}

export default OrderList
