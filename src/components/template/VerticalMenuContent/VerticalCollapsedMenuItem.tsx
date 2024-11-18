import Menu from '@/components/ui/Menu'
import Dropdown from '@/components/ui/Dropdown'
import AuthorityCheck from '@/components/shared/AuthorityCheck'
import { Link } from 'react-router-dom'
import VerticalMenuIcon from './VerticalMenuIcon'
import type { CommonProps } from '@/@types/common'
import type { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'

interface DefaultItemProps extends CommonProps {
    nav: NavigationTree
    onLinkClick?: (link: { key: string; title: string; path: string }) => void
    userAuthority: string[]
}

interface CollapsedItemProps extends DefaultItemProps {
    direction: Direction
}

interface VerticalCollapsedMenuItemProps extends CollapsedItemProps {
    sideCollapsed?: boolean
}

const { MenuItem, MenuCollapse } = Menu

const DefaultItem = ({ nav, onLinkClick, userAuthority }: DefaultItemProps) => {
    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <MenuCollapse
                key={nav.key}
                label={
                    <>
                        <VerticalMenuIcon icon={nav.icon || nav.subIcon} />
                        <span>{nav.title}</span>
                    </>
                }
                eventKey={nav.key}
                expanded={false}
                className="mb-2"
            >
                {nav.subMenu.map((subNav) => (
                    <AuthorityCheck
                        key={subNav.key}
                        userAuthority={userAuthority}
                        authority={subNav.authority}
                    >
                        <MenuItem eventKey={subNav.key}>
                            {subNav.path ? (
                                <Link
                                    className="h-full w-full flex items-center"
                                    to={subNav.path}
                                    onClick={() =>
                                        onLinkClick?.({
                                            key: subNav.key,
                                            title: subNav.title,
                                            path: subNav.path,
                                        })
                                    }
                                    target={
                                        subNav.isExternalLink ? '_blank' : ''
                                    }
                                >
                                      <VerticalMenuIcon icon={nav.subIcon} />
                                    <span>{subNav.title}</span>
                                </Link>
                            ) : (
                                <span>{subNav.title}</span>
                            )}
                        </MenuItem>
                    </AuthorityCheck>
                ))}
            </MenuCollapse>
        </AuthorityCheck>
    )
}

const CollapsedItem = ({
    nav,
    onLinkClick,
    userAuthority,
    direction,
}: CollapsedItemProps) => {
    const menuItem = (
        <MenuItem key={nav.key} eventKey={nav.key} className="mb-2">
            <VerticalMenuIcon icon={nav.subIcon} />
        </MenuItem>
    )

    return (
        <AuthorityCheck userAuthority={userAuthority} authority={nav.authority}>
            <Dropdown
                trigger="hover"
                renderTitle={menuItem}
                placement={
                    direction === 'rtl' ? 'middle-end-top' : 'middle-start-top'
                }
            >
                {nav.subMenu.map((subNav) => (
                    <AuthorityCheck
                        key={subNav.key}
                        userAuthority={userAuthority}
                        authority={subNav.authority}
                    >
                        <Dropdown.Item eventKey={subNav.key}>
                            {subNav.path ? (
                                <Link
                                    className="h-full w-full flex items-center"
                                    to={subNav.path}
                                    onClick={() =>
                                        onLinkClick?.({
                                            key: subNav.key,
                                            title: subNav.title,
                                            path: subNav.path,
                                        })
                                    }
                                    target={
                                        subNav.isExternalLink ? '_blank' : ''
                                    }
                                >
                                    
                                    <span>{subNav.title}</span>
                                </Link>
                            ) : (
                                <span>{subNav.title}</span>
                            )}
                        </Dropdown.Item>
                    </AuthorityCheck>
                ))}
            </Dropdown>
        </AuthorityCheck>
    )
}

const VerticalCollapsedMenuItem = ({
    sideCollapsed,
    ...rest
}: VerticalCollapsedMenuItemProps) => {
    return sideCollapsed ? (
        <CollapsedItem {...rest} />
    ) : (
        <DefaultItem {...rest} />
    )
}

export default VerticalCollapsedMenuItem
