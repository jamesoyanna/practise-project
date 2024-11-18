import { Suspense } from 'react'
import Loading from '@/components/shared/Loading'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import PageContainer from '@/components/template/PageContainer'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import ProtectedRoute from '@/components/route/ProtectedRoute'
import PublicRoute from '@/components/route/PublicRoute'
import AuthorityGuard from '@/components/route/AuthorityGuard'
import AppRoute from '@/components/route/AppRoute'
import type { LayoutType } from '@/@types/theme'

interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType // Define prop interface for Views component
}

type AllRoutesProps = ViewsProps // Define type for AllRoutesProps

const {
    authenticatedEntryPath,
    userauthenticatedEntryPath,
    accountofficerEntryPath,
    hubAssistanceEntryPath,
    maintenancestoreEntryPath
} = appConfig // Destructure authenticatedEntryPath from appConfig

const AllRoutes = (props: AllRoutesProps) => {
    // Get user authority from redux store
    const userRole = useAppSelector((state) => state.auth.user.authority)

    // Determine the entry path based on the user's role
    const entryPath =
        userRole && userRole.includes('SUPER_ADMIN')
            ? authenticatedEntryPath
            : userRole && userRole.includes('HUB_MANAGER')
            ? userauthenticatedEntryPath
            : userRole && userRole.includes('ACCOUNT_OFFICER')
            ? accountofficerEntryPath
            : userRole && userRole.includes('MAINTENANCE_STORE_OFFICER')
            ? maintenancestoreEntryPath
            : hubAssistanceEntryPath

    return (
        <Routes>
            <Route path="/" element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate replace to={entryPath} />} />
                {protectedRoutes.map((route, index) => (
                    <Route
                        key={route.key + index}
                        path={route.path}
                        element={
                            <AuthorityGuard
                                userAuthority={userRole}
                                authority={route.authority}
                            >
                                <PageContainer {...props} {...route.meta}>
                                    <AppRoute
                                        routeKey={route.key}
                                        component={route.component}
                                        {...route.meta}
                                    />
                                </PageContainer>
                            </AuthorityGuard>
                        }
                    />
                ))}
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
                {publicRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AppRoute
                                routeKey={route.key}
                                component={route.component}
                                {...route.meta}
                            />
                        }
                    />
                ))}
            </Route>
        </Routes>
    )
}

const Views = (props: ViewsProps) => {
    return (
        <Suspense fallback={<Loading loading={true} />}>
            <AllRoutes {...props} />
        </Suspense>
    )
}

export default Views
