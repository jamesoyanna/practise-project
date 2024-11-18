import React from 'react'
import Card from '@/components/ui/Card'
import Dropdown from '@/components/ui/Dropdown'
import { HiChip } from 'react-icons/hi'
import { GiGasStove } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

type MaintenanceDashboardAnalytics = {
    key: string
    value: number
    label: string
    additionalInfo?: { label: string; value: number }[]
}

type StatisticCardProps = {
    data: Partial<MaintenanceDashboardAnalytics>
    index: number
}

const AdditionalInfo = ({
    info,
    buttonColor,
    onClick,
}: {
    info?: { label: string; value: number }[]
    buttonColor: string
    onClick: () => void
}) => {
    if (!info) return null

    const buttonPaddingClass = buttonColor === 'red' ? 'px-10' : 'px-20'

    return (
        <button
            className={`text-white bg-${buttonColor}-500 underline mt-2 py-1 ${buttonPaddingClass} ml-5 rounded no-underline`}
            onClick={onClick}
        >
            View more
        </button>
    )
}

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'onboardedcylinder':
            return (
                <GiGasStove
                    size={40}
                    className="text-teal-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
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

const StatisticCard: React.FC<StatisticCardProps> = ({ data, index }) => {
    const navigate = useNavigate()

    const getBackgroundColor = () => {
        switch (data?.key) {
            case 'onboardedcylinder':
                return 'bg-teal-300 bg-opacity-10 rounded-2xl'
            case 'totalsmartdevice':
                return 'bg-red-600 bg-opacity-10 rounded-2xl'
            default:
                return ''
        }
    }

    const getChevronColor = () => {
        switch (data?.key) {
            case 'onboardedcylinder':
                return 'teal'
            case 'totalsmartdevice':
                return 'red'
            default:
                return ''
        }
    }

    const getButtonColor = () => {
        switch (data?.key) {
            case 'onboardedcylinder':
                return 'teal'
            case 'totalsmartdevice':
                return 'red'
            default:
                return 'blue'
        }
    }

    const getButtonClick = () => {
        switch (data?.key) {
            case 'onboardedcylinder':
                return () => navigate('/cylinders-onboarded-detail')
            case 'totalsmartdevice':
                return () => navigate('/smart-devices-onboarded-detail')
            default:
                return () => {}
        }
    }

    const bgColor = getBackgroundColor()
    const chevronColor = getChevronColor()
    const buttonColor = getButtonColor()
    const buttonClick = getButtonClick()

    return (
        <Card bgColor={bgColor}>
            <div className="relative flex flex-col items-start gap-4 p-4">
                <StatisticIcon type={data?.key} />
                <div className="text-2xl font-extrabold">{data?.value}</div>
            </div>
            <div className=" flex flex-row items-end gap-4 p-4">
                <p className="text-sm font-semibold mb-2">{data?.label}</p>
                {index !== 2 && data?.additionalInfo && (
                    <div
                        className={`bg-${chevronColor}-500 w-8 h-8 rounded-full flex justify-center items-center text-white font-bold text-2xl`}
                    >
                        <Dropdown>
                            {data.additionalInfo.map((item, index) => (
                                <Dropdown.Item
                                    key={index}
                                    eventKey="b"
                                    className="text-sm mb-2 pl-2 flex items-center"
                                >
                                    <StatisticIcon type={data.key} />
                                    <div className="flex flex-col mt-2">
                                        <span className="text-2xl font-extrabold">
                                            {item.value}
                                        </span>
                                        <span className="">{item.label}</span>
                                    </div>
                                </Dropdown.Item>
                            ))}
                            <Dropdown.Item
                                eventKey="viewMore"
                                className="text-lg mb-2 pl-4"
                            >
                                <AdditionalInfo
                                    info={data.additionalInfo}
                                    buttonColor={buttonColor}
                                    onClick={buttonClick}
                                />
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                )}
            </div>
        </Card>
    )
}

const Statistic: React.FC<{
    data?: Partial<MaintenanceDashboardAnalytics>[]
}> = ({ data = [] }) => {
    // Limit to at most 2 cards
    const limitedData = [data[0], data[2]].filter(item => item !== undefined);
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mx-20">
            {limitedData.map((card, index) => (
                <StatisticCard key={index} data={card} index={index} />
            ))}
        </div>
    )
}

export default Statistic
