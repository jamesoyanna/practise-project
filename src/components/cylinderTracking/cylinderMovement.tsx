import { useEffect } from 'react'
import reducer, {
    getMaintenanceDashboardData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/hubMaintenance/maintenanceDashboard'
import { injectReducer } from '@/store/'

import CylinderMovTopBar from '@/components/cylinderTracking/topbar/CylinderMovTopBar'

//import Loading from '@/components/shared/Loading'
import CylinderMovementTable from '@/components/cylinderTracking/cylinderMovementTable'
import SizeTableSearch from '@/components/cylinderTracking/movementTableSearch'

// Inject the hub dashboard reducer
 injectReducer('maintenancedashboard', reducer)

// Component for the hub dashboard
const CylinderMovement = () => {
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
                <div className='flex flex-row'>
                <span><h4>Cylinder movement History</h4></span>
                <CylinderMovTopBar />
                </div>
                {/* Render the recent orders component */}
                <div className="mt-5" />
                <SizeTableSearch />
               <CylinderMovementTable />
            {/* </Loading> */}
        </div>
    )
}

export default CylinderMovement