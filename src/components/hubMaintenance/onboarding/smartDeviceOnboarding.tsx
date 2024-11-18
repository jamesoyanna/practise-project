import { useEffect } from 'react'
import reducer, {
    getMaintenanceDashboardData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/hubMaintenance/maintenanceDashboard'
import { injectReducer } from '@/store/'
import Loading from '@/components/shared/Loading'
import TopBar from '@/components/hubMaintenance/topbar/OnboardingTopBar'
import SmartCylinderForm from '@/components/hubMaintenance/onboarding/form/smartDeviceform'

// Inject the hub dashboard reducer
injectReducer('maintenancedashboard', reducer)

// Component for the hub dashboard
const GenericCylinder = () => {
    const dispatch = useAppDispatch()

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
            <SmartCylinderForm />
            {/* </Loading> */}
        </div>
    )
}

export default GenericCylinder
