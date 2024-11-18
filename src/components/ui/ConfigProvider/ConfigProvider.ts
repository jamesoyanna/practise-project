import { createContext, useContext } from 'react'
import { SIZES } from '../utils/constants'
import type { TypeAttributes, ColorLevel } from '../@types/common'

export type Config = {
    themeColor: string
    locale:string
    mode: 'light'
    primaryColorLevel: ColorLevel
    cardBordered: boolean
    controlSize: TypeAttributes.ControlSize
    navMode: TypeAttributes.MenuVariant
    direction: TypeAttributes.Direction
}

export const defaultConfig = {
    themeColor: 'blue',
    direction: 'ltr',
    mode: 'light',
    locale: 'en',
    primaryColorLevel: 800,
    cardBordered: false,
    controlSize: SIZES.MD,
    navMode: 'light',
} as const

export const ConfigContext = createContext<Config>(defaultConfig)

const ConfigProvider = ConfigContext.Provider

export const ConfigConsumer = ConfigContext.Consumer

export function useConfig() {
    return useContext(ConfigContext)
}

export default ConfigProvider
