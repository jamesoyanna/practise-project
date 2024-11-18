import { useEffect, useCallback } from 'react'
import {
    setLayout,
    setPreviousLayout,
    setCurrentRouteKey,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import { useLocation } from 'react-router-dom'
import type { LayoutType } from '@/@types/theme'
import type { ComponentType } from 'react'

export type AppRouteProps<T> = {
    component: ComponentType<T>
    routeKey: string
    layout?: LayoutType
}

const AppRoute = <T extends Record<string, unknown>>({
    component: Component,
    routeKey,
    ...props
}: AppRouteProps<T>) => {
    const location = useLocation()  // Get current location

    const dispatch = useAppDispatch() // Get dispatch function from Redux

    const layoutType = useAppSelector((state) => state.theme.layout.type) // Get current layout type
    const previousLayout = useAppSelector(
        (state) => state.theme.layout.previousType // Get previous layout type
    )

     // Function to handle layout change
    const handleLayoutChange = useCallback(() => {
        dispatch(setCurrentRouteKey(routeKey)) // Set current route key

         // Change layout if different from current layout
        if (props.layout && props.layout !== layoutType) {
            dispatch(setPreviousLayout(layoutType))
            dispatch(setLayout(props.layout))
        }

          // Revert to previous layout if layout is not provided and a previous layout exists
        if (!props.layout && previousLayout && layoutType !== previousLayout) {
            dispatch(setLayout(previousLayout))
            dispatch(setPreviousLayout(''))
        }
    }, [dispatch, layoutType, previousLayout, props.layout, routeKey])

    useEffect(() => {
        handleLayoutChange() // Call handleLayoutChange function on component mount and location change
    }, [location, handleLayoutChange])

    return <Component {...(props as T)} />
}

export default AppRoute
