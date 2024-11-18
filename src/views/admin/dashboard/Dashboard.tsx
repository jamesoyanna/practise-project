import { useEffect } from 'react'
import reducer, {
    getDashboardData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/dashboard'
import { injectReducer } from '@/store/'

import TopBar from '@/components/topbar/TopBar'

import Loading from '@/components/shared/Loading'
import Statistic from '@/components/dashboard/Statistic'

import RecentOrders from '../orders/RecentOrders'

// Inject the dashboard reducer
injectReducer('dashboard', reducer)

// Component for the dashboard
const Dashboard = () => {
    const dispatch = useAppDispatch()

    // Retrieve data and loading state from the Redux store
    const { statisticData } =
        useAppSelector((state) => state.dashboard.data.dashboardData)
    const loading = useAppSelector((state) => state.dashboard.data.loading)

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Function to fetch dashboard data
    const fetchData = () => {
        dispatch(getDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Render a loading indicator while data is being fetched */}
            <Loading loading={loading}>
                {/* Render the top bar */}
                <TopBar />
                {/* Render the statistic component with the fetched data */}
                <Statistic data={statisticData} />
                {/* Render the recent orders component */}
                <RecentOrders />
            </Loading>
        </div>
    )
}

export default Dashboard;
