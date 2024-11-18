import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'

const { unAuthenticatedEntryPath } = appConfig // Destructure unauthenticated entry path from appConfig

const ProtectedRoute = () => {  // Define ProtectedRoute component
    const { authenticated } = useAuth() // Check if user is authenticated

    const location = useLocation(); // Get current location

    if (!authenticated) { // If user is not authenticated
        return (
            <Navigate
                replace
                to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
            />
        )
    }

    return <Outlet />  // Render child routes if user is authenticated
}

export default ProtectedRoute
