// Importing necessary dependencies and configurations
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { themeConfig } from '@/configs/theme.config'
import {
    LAYOUT_TYPE_CLASSIC,
    NAV_MODE_LIGHT,
} from '@/constants/theme.constant'
import type {
    LayoutType,
    Mode,
    NavMode,
    ColorLevel,
    Direction,
} from '@/@types/theme'

// Function to determine initial navigation mode based on theme configuration
const initialNavMode = () => {
    if (
        themeConfig.layout.type === LAYOUT_TYPE_CLASSIC
    ) {
        return NAV_MODE_LIGHT
    }

    return themeConfig.navMode
}

// State type for managing theme settings
export type ThemeState = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
        previousType?: LayoutType
    }
}

// Initial state for the theme slice
const initialState: ThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    panelExpand: themeConfig.panelExpand,
    cardBordered: themeConfig.cardBordered,
    navMode: initialNavMode(),
    layout: themeConfig.layout,
}

// Creating the theme slice
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // Reducer for setting theme direction
        setDirection: (state, action: PayloadAction<Direction>) => {
            state.direction = action.payload
        },
        // Reducer for setting theme mode
        setMode: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload
        },
        // Reducer for setting theme layout
        setLayout: (state, action: PayloadAction<LayoutType>) => {
            state.cardBordered = action.payload === LAYOUT_TYPE_CLASSIC
            if (action.payload === LAYOUT_TYPE_CLASSIC) {
                state.navMode = NAV_MODE_LIGHT
            }

            state.layout = {
                ...state.layout,
                ...{ type: action.payload },
            }
        },
        // Reducer for setting previous theme layout
        setPreviousLayout: (state, action) => {
            state.layout.previousType = action.payload
        },
        // Reducer for toggling side navigation collapse
        setSideNavCollapse: (state, action) => {
            state.layout = {
                ...state.layout,
                ...{ sideNavCollapse: action.payload },
            }
        },
        // Reducer for setting navigation mode
        setNavMode: (state, action: PayloadAction<NavMode | 'default'>) => {
            if (action.payload !== 'default') {
                state.navMode = action.payload
            } else {
                if (state.layout.type === LAYOUT_TYPE_CLASSIC) {
                    state.navMode = NAV_MODE_LIGHT
                }
            }
        },
        // Reducer for setting panel expansion
        setPanelExpand: (state, action: PayloadAction<boolean>) => {
            state.panelExpand = action.payload
        },
        // Reducer for setting theme color
        setThemeColor: (state, action: PayloadAction<string>) => {
            state.themeColor = action.payload
        },
        // Reducer for setting theme color level
        setThemeColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
    },
})

// Exporting actions from the theme slice
export const {
    setDirection,
    setMode,
    setLayout,
    setSideNavCollapse,
    setNavMode,
    setPanelExpand,
    setThemeColor,
    setThemeColorLevel,
    setPreviousLayout,
} = themeSlice.actions

// Exporting the reducer
export default themeSlice.reducer
