import classNames from 'classnames'
import type { ComponentType, FC } from 'react'

// Define props that can be passed to components wrapped by withHeaderItem HOC
export type WithHeaderItemProps = {
    className?: string
    hoverable?: boolean
}

// Define a Higher Order Component (HOC) to add header item styles and behavior
const withHeaderItem = <T extends WithHeaderItemProps>(
    Component: ComponentType<Omit<T, keyof WithHeaderItemProps>>
): FC<T> => {
    // Define the component with added header item styles and behavior
    const WithHeaderItem: FC<T> = (props: T) => {
        const { className, hoverable = true } = props
        return (
            // Wrap the original component with additional header item styles
            <Component
                {...(props as Omit<T, keyof WithHeaderItemProps>)}
                className={classNames(
                    'header-action-item', // Base class for header item
                    hoverable && 'header-action-item-hoverable', // Add hoverable class conditionally
                    className // Add any additional classes passed to the component
                )}
            />
        )
    }
    // Set display name for the wrapped component
    WithHeaderItem.displayName = `withHeaderItem(${
        Component.displayName || Component.name || 'Component'
    })`
    // Return the wrapped component
    return WithHeaderItem
}

// Export the withHeaderItem HOC
export default withHeaderItem;
