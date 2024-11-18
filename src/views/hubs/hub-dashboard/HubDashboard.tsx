import { useEffect } from 'react'
import reducer, {
    getHubDashboardData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/hubdashboard'
import { injectReducer } from '@/store/'

import TopBar from '@/components/hubs/topbar/HubTopBar'

import Loading from '@/components/shared/Loading'
import HubDashboardAnalytics from '@/components/hubs/HubDashboardAnalytics'
import RecentOrdersTable from '@/components/Orders/RecentOrdersTable'
import OrderTableSearch from '@/components/Orders/OrderTableSearch'

// Inject the hub dashboard reducer
 injectReducer('hubdashboard', reducer)

// Component for the hub dashboard
const HubDashboard = () => {
    const dispatch = useAppDispatch()

    // Retrieve data and loading state from the Redux store
    const { hubdashbardAnalyticsData } = useAppSelector(
        (state) => state.hubdashboard.data.hubdashbardAnalyticsData
    )
    const loading = useAppSelector((state) => state.hubdashboard.data.loading)

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Function to fetch hub dashboard data
    const fetchData = () => {
        dispatch(getHubDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Render a loading indicator while data is being fetched */}
            <Loading loading={loading}>
                {/* Render the top bar */}
                <TopBar />
                {/* Render the statistic component with the fetched data */}
                <HubDashboardAnalytics data={hubdashbardAnalyticsData} />
                <OrderTableSearch/>
                {/* Render the recent orders component */}
               <RecentOrdersTable />
            </Loading>
        </div>
    )
}

export default HubDashboard
