import { useEffect } from 'react'
import reducer, {
    getMaintenanceDashboardData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/hubMaintenance/maintenanceDashboard'
import { injectReducer } from '@/store/'

import TopBar from '@/components/hubMaintenance/topbar/OnboardingTopBar'
import NewCylinderForm from '@/components/hubMaintenance/onboarding/newCylinderOnboarding'

import Loading from '@/components/shared/Loading'
import MaintenanceStoreTable from '@/components/hubMaintenance/MaintenanceStoreTable'

// Inject the hub dashboard reducer
injectReducer('maintenancedashboard', reducer)

// Component for the hub dashboard
const Onboarding = () => {
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
            {/* Render the top bar */}
            <TopBar />
            {/* Render the statistic component with the fetched data */}
            <NewCylinderForm />

            {/* Render the recent orders component */}
            {/* <MaintenanceStoreTable /> */}
            {/* </Loading> */}
        </div>
    )
}

export default Onboarding
