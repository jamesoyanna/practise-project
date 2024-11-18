import Tooltip from '@/components/ui/Tooltip'
import Menu from '@/components/ui/Menu'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import VerticalMenuIcon from './VerticalMenuIcon'
import { Link } from 'react-router-dom'
import type { CommonProps } from '@/@types/common'
import type { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'

const { MenuItem } = Menu

interface CollapsedItemProps extends CommonProps {
    title: string
    direction?: Direction
}

interface DefaultItemProps {
    nav: NavigationTree
    onLinkClick?: (link: { key: string; title: string; path: string }) => void
    sideCollapsed?: boolean
    userAuthority: string[]
}

interface VerticalMenuItemProps extends CollapsedItemProps, DefaultItemProps {}

const CollapsedItem = ({
    title,
    children,
    direction,
}: CollapsedItemProps) => {

    return (
        <Tooltip
            title={ title}
            placement={direction === 'rtl' ? 'left' : 'right'}
        >
            {children}
        </Tooltip>
    )
}

const DefaultItem = (props: DefaultItemProps) => {
    const { nav, onLinkClick, sideCollapsed, userAuthority } = props

    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
                <Link
                    to={nav.path}
                    className="flex items-center h-full w-full"
                    onClick={() =>
                        onLinkClick?.({
                            key: nav.key,
                            title: nav.title,
                            path: nav.path,
                        })
                    }
                    target={nav.isExternalLink ? '_blank' :  ''}
                >
                    <VerticalMenuIcon icon={nav.icon} />
                    {!sideCollapsed && (
                        <span>
                            {nav.title}
                        </span>
                    )}
                </Link>
            </MenuItem>
        </AuthorityCheck>
    )
}

const VerticalSingleMenuItem = ({
    nav,
    onLinkClick,
    sideCollapsed,
    userAuthority,
    direction,
}: Omit<VerticalMenuItemProps, 'title'>) => {
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            {sideCollapsed ? (
                <CollapsedItem
                    title={nav.title}
                    direction={direction}
                >
                    <DefaultItem
                        nav={nav}
                        sideCollapsed={sideCollapsed}
                        userAuthority={userAuthority}
                        onLinkClick={onLinkClick}
                    />
                </CollapsedItem>
            ) : (
                <DefaultItem
                    nav={nav}
                    sideCollapsed={sideCollapsed}
                    userAuthority={userAuthority}
                    onLinkClick={onLinkClick}
                />
            )}
        </AuthorityCheck>
    )
}

export default VerticalSingleMenuItem
