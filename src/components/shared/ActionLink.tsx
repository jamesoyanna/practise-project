import classNames from 'classnames'
import useThemeClass from '@/utils/hooks/useThemeClass'
import { Link } from 'react-router-dom'
import type { CommonProps } from '@/@types/common'
import type { ComponentPropsWithoutRef } from 'react'

interface ActionLink extends CommonProps, ComponentPropsWithoutRef<'a'> {
    themeColor?: boolean // Optional boolean prop to apply theme color
    to?: string
    href?: string
    reloadDocument?: boolean // Optional boolean prop to reload document
}

const ActionLink = (props: ActionLink) => {
    const { // Destructure props
        children,
        className,
        themeColor = true,
        to,
        reloadDocument,
        href = '',
        ...rest
    } = props

    const { textTheme } = useThemeClass() // Get text theme from useThemeClass hook

    const classNameProps = { // Define classNameProps object with conditional class names
        className: classNames(
            themeColor && textTheme,
            'hover:underline',
            className
        ),
    }

    return to ? ( // If to prop is provided, render Link component
        <Link
            to={to}
            reloadDocument={reloadDocument}
            {...classNameProps}
            {...rest}
        >
            {children}
        </Link>
    ) : ( // If href prop is provided, render anchor element
        <a href={href} {...classNameProps} {...rest}>
            {children}
        </a>
    )
}

export default ActionLink
