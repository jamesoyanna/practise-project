import { Navigate, Outlet } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => { // Define PublicRoute component
    const { authenticated } = useAuth()  // Check if user is authenticated

     // If user is authenticated, redirect to authenticated entry path, otherwise render child routes
    return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
