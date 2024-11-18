import ConfigProvider from '@/components/ui/ConfigProvider'
import type { CommonProps } from '@/@types/common'
import { themeConfig } from '@/configs/theme.config'
import { useAppSelector } from '@/store'

const Theme = (props: CommonProps) => {
    const theme = useAppSelector((state) => state.theme)

    const currentTheme = {
        ...themeConfig,
        ...theme,
    }

    return (
        <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
    )
}

export default Theme
