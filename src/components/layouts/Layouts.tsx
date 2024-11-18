import { useMemo, lazy, Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import { useAppSelector } from '@/store'
import {
    LAYOUT_TYPE_CLASSIC,
} from '@/constants/theme.constant'
import useAuth from '@/utils/hooks/useAuth'
import useDirection from '@/utils/hooks/useDirection'

// Define available layouts
const layouts = {
    [LAYOUT_TYPE_CLASSIC]: lazy(() => import('./MainLayout')),
}

// Layout component
const Layout = () => {
    const layoutType = useAppSelector((state) => state.theme.layout.type)

       // Check authentication status using custom hook
    const { authenticated } = useAuth()

      // Apply direction using custom hook
    useDirection()

     // Determine the appropriate layout based on authentication status and layout type
    const AppLayout = useMemo(() => {
        if (authenticated) {
            return layouts[layoutType] // Use main layout if authenticated
        }
        return lazy(() => import('./AuthLayout')) // Use authentication layout if not authenticated
    }, [layoutType, authenticated])

       // Render the appropriate layout inside Suspense for lazy loading
    return (
        <Suspense
            fallback={
                <div className="flex flex-auto flex-col h-[100vh]">
                    <Loading loading={true} />
                </div>
            }
        >
            <AppLayout />
        </Suspense>
    )
}

export default Layout
