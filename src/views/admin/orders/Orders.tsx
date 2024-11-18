  import { useEffect } from 'react'
import { injectReducer } from '@/store'
import OrdersTable from '@/components/Orders/OrdersTable'
import OrderDeleteConfirmation from '@/components/Orders/OrderDeleteConfirmation'
import OrderTableSearch from '@/components/Orders/OrderTableSearch'
import OrderTopbar from '@/components/Orders/OrderTopbar';
  import OrderAnalytics from '@/components/Orders/OrderAnalytics';
//  import Loading from '@/components/shared/Loading'
import reducer, {
    getOrderAnalyticsData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/orders'
import StockOrderAnalytics from '@/components/Orders/StockOrderAnalytics'

injectReducer('OrderList', reducer)
const Orders = () => {
    const dispatch = useAppDispatch()
    const userData = useAppSelector((state) => state)
    const staff_role = userData.auth.user.authority


    const {orderStatsData} = userData.OrderList.data.analyticsData

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getOrderAnalyticsData())
    }
    return (
        <>
            <div>
                <div className="lg:flex items-center justify-between mb-6">
                    <h4 className="ml-8 lg:mb-0">Orders</h4>
                </div>
                <OrderTopbar />
             
                {staff_role?.includes("SUPER_ADMIN")? (
                 <StockOrderAnalytics data={orderStatsData} />
                ) :(
                  <OrderAnalytics data={orderStatsData} />
                )}
               
                    <OrderTableSearch />
                <OrdersTable />
                <OrderDeleteConfirmation />
            </div>
        </>
    )
}

export default Orders;

