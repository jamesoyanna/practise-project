import { useEffect } from 'react'
import reducer, {
    getMaintenanceDashboardData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/hubMaintenance/maintenanceDashboard'
import { injectReducer } from '@/store/'
import Loading from '@/components/shared/Loading'
import TopBar from '@/components/hubMaintenance/topbar/OnboardingTopBar'
import CylindersDashboardAnalytics from '@/components/hubMaintenance/onboarding/genericCylinder/genericCard'
import SizeTableSearch from '@/components/hubAssistance/TableSize/SizeTableSearch'
import CylindersOnboardedTable from '@/components/hubMaintenance/onboarding/genericCylinder/GenericTable'

// Inject the hub dashboard reducer
injectReducer('maintenancedashboard', reducer)

// Component for the hub dashboard
const GenericCylinder = () => {
    const dispatch = useAppDispatch()

    // Retrieve data and loading state from the Redux store
    const { maintenancedashboardAnalyticsData } = useAppSelector(
        (state) =>
            state.maintenancedashboard.data.maintenancedashboardAnalyticsData
    )
    const loading = useAppSelector(
        (state) => state.maintenancedashboard.data.loading
    )

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
            <TopBar />
            {/* Render the statistic component with the fetched data */}
            <CylindersDashboardAnalytics
                data={maintenancedashboardAnalyticsData}
            />
            <div className="mt-5" />
            <SizeTableSearch />
            <CylindersOnboardedTable />
            {/* </Loading> */}
        </div>
    )
}

export default GenericCylinder
