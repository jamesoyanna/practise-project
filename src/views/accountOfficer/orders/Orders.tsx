import { useEffect } from 'react'
import { injectReducer } from '@/store'
import OrdersTable from '@/components/Orders/OrdersTable'
import OrderDeleteConfirmation from '@/components/Orders/OrderDeleteConfirmation'
import OrderTableSearch from '@/components/Orders/OrderTableSearch'
import OrderTopbar from '@/components/Orders/OrderTopbar'
//  import Loading from '@/components/shared/Loading'
import reducer, {
    getOrderAnalyticsData,
    useAppDispatch,
} from '../../../store/slices/orders'

injectReducer('OrderList', reducer)
const Orders = () => {
    const dispatch = useAppDispatch()

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
                <OrderTableSearch />
                {/* <div className="col-span-2 lg:col-span-1 mx-4"> */}

                {/* </div> */}
                <OrdersTable />
                <OrderDeleteConfirmation />
            </div>
        </>
    )
}

export default Orders
