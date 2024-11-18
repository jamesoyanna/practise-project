import React from 'react'
import Card from '@/components/ui/Card'
import { HiChip } from 'react-icons/hi'
import { GiGasStove } from 'react-icons/gi'

type CylinderOnboardedDashboardAnalytics = {
    key: string
    value: number
    label: string
    additionalInfo?: { label: string; value: number }[]
}

type StatisticCardProps = {
    data: Partial<CylinderOnboardedDashboardAnalytics>
}

const AdditionalInfo = ({
    info,
}: {
    info?: { label: string; value: number }[]
    buttonColor: string
    onClick: () => void
}) => {
    if (!info) return null
}

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'genericcylinder':
            return (
                <GiGasStove
                    size={40}
                    className="text-blue-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                />
            )
        case 'totalsmartdevice':
            return (
                <HiChip
                    size={40}
                    className="text-red-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                />
            )
        default:
            return null
    }
}

const StatisticCard: React.FC<StatisticCardProps> = ({ data }) => {
    const getBackgroundColor = () => {
        switch (data.key) {
            case 'genericcylinder':
                return 'bg-blue-600 bg-opacity-10 rounded-2xl'
            case 'totalsmartdevice':
                return 'bg-red-600 bg-opacity-10 rounded-2xl'
            default:
                return ''
        }
    }

    const getChevronColor = () => {
        switch (data.key) {
            case 'genericcylinder':
                return 'teal'
            case 'totalsmartdevice':
                return 'red'
            default:
                return ''
        }
    }

    const bgColor = getBackgroundColor()
    const chevronColor = getChevronColor()
    return (
        <Card bgColor={bgColor}>
            <div className="relative flex flex-col items-start gap-4 p-4">
                <StatisticIcon type={data.key} />
                <div className="text-2xl font-extrabold">{data.value}</div>
            </div>
            <div className="flex flex-row items-end gap-4 p-4">
                <p className="text-sm font-semibold mb-2">{data.label}</p>
            </div>
        </Card>
    )
}

const GenericCylinderCard: React.FC<{
    data?: Partial<CylinderOnboardedDashboardAnalytics>[]
}> = ({ data = [] }) => {
    // Filter the data to get only the onboarded cylinder card
    const genericCylinderData = data.find(
        (card) => card.key === 'genericcylinder'
    )

    if (!genericCylinderData) {
        return null
    }

    return (
        <div className="grid grid-cols-2">
            <StatisticCard data={genericCylinderData} />
        </div>
    )
}

export default GenericCylinderCard
