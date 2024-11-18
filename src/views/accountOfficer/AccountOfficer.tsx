import { useEffect} from 'react'
import reducer, {
    getOfficerDashboardData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/officerdashboard'
import { injectReducer } from '@/store/'

import Loading from '@/components/shared/Loading'
import RecentOrdersTable from '@/components/Orders/RecentOrdersTable'
import Statistic from '@/components/accountOfficer/OfficerDashboardAnalytics'

// Inject the hub dashboard reducer
injectReducer('officerdashboard', reducer)

// Component for the hub dashboard
const OfficerDashboard = () => {
    const dispatch = useAppDispatch()

    // Retrieve data and loading state from the Redux store
    const { officerdashboardAnalyticsData } = useAppSelector(
        (state) => state.officerdashboard.data.officerdashboardAnalyticsData
    )
    console.log('account officer :', officerdashboardAnalyticsData)
    const loading = useAppSelector(
        (state) => state.officerdashboard.data.loading
    )

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Function to fetch accoutn officer dashboard data
    const fetchData = () => {
        dispatch(getOfficerDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Render a loading indicator while data is being fetched */}
            <Loading loading={loading}>
                <Statistic data={officerdashboardAnalyticsData} />
                <div className="my-5">
                    <h4>Recent Orders</h4>
                </div>
                {/* Render the recent orders component */}
                <RecentOrdersTable />
            </Loading>
        </div>
    )
}

export default OfficerDashboard
