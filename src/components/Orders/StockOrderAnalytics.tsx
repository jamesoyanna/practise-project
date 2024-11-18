import React from 'react'
import Card from '@/components/ui/Card'
import { BsCart3 } from 'react-icons/bs'

type OrderStats = {
    key: string
    value: number
    label: string
    additionalInfo?: { label: string; value: number }[]
}

type StatisticCardProps = {
    data: Partial<OrderStats>
    index: number
}


const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'orders-created':
            return (
                <BsCart3
                    size={40}
                    className="text-blue-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                />
            )
        case 'orders-delivered':
            return (
                <BsCart3
                    size={40}
                    className="text-teal-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                />
            )
        default:
            return null
    }
}

const StatisticCard: React.FC<StatisticCardProps> = ({ data }) => {

    const getBackgroundColor = () => {
        switch (data.key) {
            case 'orders-created':
                return 'bg-blue-900 bg-opacity-10 rounded-2xl'
            case 'orders-delivered':
                return 'bg-teal-300 bg-opacity-10 rounded-2xl'
            default:
                return ''
        }
    }


    const bgColor = getBackgroundColor()

   

    return (
        <Card bgColor={bgColor}>
            <div className="relative flex flex-col items-start gap-4 p-4">
                <StatisticIcon type={data.key} />
                <div className="text-2xl font-extrabold">{data.value}</div>
            </div>
            <div className=" flex flex-row items-end gap-4 p-4">
                <p className="text-sm font-semibold mb-2">{data.label}</p>
            </div>
        </Card>
    )
}

const StockOrderAnalytics: React.FC<{
    data?: Partial<OrderStats>[]
}> = ({ data = [] }) => {
    const limitedData = data.slice(2, 4)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-5">
            {limitedData.map((card, index) => (
                <StatisticCard key={index} data={card} index={index} />
            ))}
        </div>
    )
}

export default StockOrderAnalytics
