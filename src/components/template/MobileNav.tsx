import { useState, Suspense, lazy } from 'react'
import classNames from 'classnames'
import Drawer from '@/components/ui/Drawer'
import {
    DIR_RTL,
} from '@/constants/theme.constant'
import withHeaderItem, { WithHeaderItemProps } from '@/utils/hoc/withHeaderItem'
import NavToggle from '@/components/shared/NavToggle'
import navigationConfig from '@/configs/navigation.config'
import useResponsive from '@/utils/hooks/useResponsive'
import { useAppSelector } from '@/store'

const VerticalMenuContent = lazy(
    () => import('@/components/template/VerticalMenuContent')
)

type MobileNavToggleProps = {
    toggled?: boolean
}

const MobileNavToggle = withHeaderItem<
    MobileNavToggleProps & WithHeaderItemProps
>(NavToggle)

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }
    const navMode = useAppSelector((state) => state.theme.navMode)
    const direction = useAppSelector((state) => state.theme.direction)
    const currentRouteKey = useAppSelector(
        (state) => state.base.common.currentRouteKey
    )
    const sideNavCollapse = useAppSelector(
        (state) => state.theme.layout.sideNavCollapse
    )
    const userAuthority = useAppSelector((state) => state.auth.user.authority)

    const { smaller } = useResponsive()

    const navColor = () => {

        return `side-nav-${navMode}`
    }

    return (
        <>
            {smaller.md && (
                <>
                    <div className="text-2xl" onClick={openDrawer}>
                        <MobileNavToggle toggled={isOpen} />
                    </div>
                
                    <Drawer
                        title="Homefort"
                        isOpen={isOpen}
                        bodyClass={classNames(navColor(), 'p-0')}
                        width={330}
                        placement={direction === DIR_RTL ? 'right' : 'left'}
                        onClose={onDrawerClose}
                        onRequestClose={onDrawerClose}
                    >
                        <Suspense fallback={<></>}>
                            {isOpen && (
                                <VerticalMenuContent
                                    navMode={navMode}
                                    collapsed={sideNavCollapse}
                                    navigationTree={navigationConfig}
                                    routeKey={currentRouteKey}
                                    userAuthority={userAuthority as string[]}
                                    direction={direction}
                                    onMenuItemClick={onDrawerClose}
                                />
                            )}
                        </Suspense>
                   
                    </Drawer>
                </>
            )}
        </>
    )
}

export default MobileNav
