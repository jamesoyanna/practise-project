import { useEffect } from 'react'
import reducer, {
    getMaintenanceDashboardData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/hubMaintenance/maintenanceDashboard'
import { injectReducer } from '@/store/'

import CylinderTopBar from '@/components/cylinderTracking/topbar/CylinderTopBar'

//import Loading from '@/components/shared/Loading'
import MaintenanceDashboardAnalytics from '@/components/cylinderTracking/cylinderDashboardAnalytics'
import CylinderTableSearch from '@/components/cylinderTracking/CylinderTableSearch'
import CylindersTrackingTable from '@/components/cylinderTracking/cylinderTrackingTable'

// Inject the hub dashboard reducer
 injectReducer('maintenancedashboard', reducer)

// Component for the hub dashboard
const CylinderTracking = () => {
    const dispatch = useAppDispatch()

    // Retrieve data and loading state from the Redux store
    const { maintenancedashboardAnalyticsData } = useAppSelector(
        (state) => state.maintenancedashboard.data.maintenancedashboardAnalyticsData
    )
    console.log("Maintain Data", maintenancedashboardAnalyticsData)
   // const loading = useAppSelector((state) => state.maintenancedashboard.data.loading)

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
                {/* Render the top bar */}
                <CylinderTopBar />
                {/* Render the statistic component with the fetched data */}
                <MaintenanceDashboardAnalytics data={maintenancedashboardAnalyticsData} />
                
                {/* Render the recent orders component */}
                <div className="mt-5" />
                <CylinderTableSearch />
               <CylindersTrackingTable />
            {/* </Loading> */}
        </div>
    )
}

export default CylinderTracking