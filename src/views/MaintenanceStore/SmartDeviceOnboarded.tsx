import { useEffect } from 'react'
import reducer, {
    getMaintenanceDashboardData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/hubMaintenance/maintenanceDashboard'
import { injectReducer } from '@/store/'
import Loading from '@/components/shared/Loading'
import SmartDeviceDashboardAnalytics from '@/components/hubMaintenance/smartDeviceOnboarded/SmartDeviceDashboardAnalytics'
import SizeTableSearch from '@/components/hubAssistance/TableSize/SizeTableSearch'
import SmartDeviceTable from '@/components/hubMaintenance/smartDeviceOnboarded/SmartDeviceTable'

// Inject the hub dashboard reducer
 injectReducer('maintenancedashboard', reducer)

// Component for the hub dashboard
const SmartDeviceOnboarded = () => {
    const dispatch = useAppDispatch()

    // Retrieve data and loading state from the Redux store
    const { maintenancedashboardAnalyticsData } = useAppSelector(
        (state) => state.maintenancedashboard.data.maintenancedashboardAnalyticsData
    )
    const loading = useAppSelector((state) => state.maintenancedashboard.data.loading)

    // Fetch data on component mount
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Function to fetch hub dashboard data
    const fetchData = () => {
        dispatch(getMaintenanceDashboardData())
    }

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Render a loading indicator while data is being fetched */}
            {/* <Loading loading={loading}> */}
                {/* Render the statistic component with the fetched data */}
                <SmartDeviceDashboardAnalytics data={maintenancedashboardAnalyticsData} />
                <SizeTableSearch />
               <SmartDeviceTable />
            {/* </Loading> */}
        </div>
    )
}

export default SmartDeviceOnboarded
