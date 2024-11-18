import { useEffect } from 'react'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import reducer, {
    getDashboardData,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/accounting'
import { injectReducer } from '@/store/'
import type { AccountingAnalytics } from '@/store/slices/accounting'
import Card from '@/components/ui/Card'
import Dropdown from '@/components/ui/Dropdown'
import Avatar from '@/components/ui/Avatar'
import { HiOutlineArchive } from 'react-icons/hi'

injectReducer('accounting', reducer)

// Function to render different icons based on type
const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'totalgassold':
            return (
                <Avatar
                    size={50}
                    className="bg-indigo-100 rounded-full text-indigo-600 dark:text-indigo-200"
                    icon={<HiOutlineArchive />}
                />
            )
        case 'totalgasqty':
            return (
                <Avatar
                    size={50}
                    className="bg-cyan-100 rounded-full text-cyan-600 dark:text-cyan-100"
                    icon={<FaRegMoneyBillAlt />}
                />
            )
        case 'totalhubs':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 rounded-full text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={<HiOutlineArchive />}
                />
            )
        case 'totalhubscustomers':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<FaRegMoneyBillAlt />}
                />
            )
        case 'salesbyhubs':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<FaRegMoneyBillAlt />}
                />
            )
        case 'salesbyhubsmarch':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<FaRegMoneyBillAlt />}
                />
            )
        case 'totalb2c':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-200 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<FaRegMoneyBillAlt />}
                />
            )
        case 'totalb2b':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<FaRegMoneyBillAlt />}
                />
            )
        default:
            return <div></div>
    }
}
// Function to render statistic card
const StatisticCard = ({
    data = {},
}: {
    data: Partial<AccountingAnalytics>
}) => {
    let bgColor = ''
    let chevronColor = ''
    // Determine background color and chevron color based on data key
    switch (data.key) {
        case 'totalgassold':
            bgColor = 'bg-teal-400 bg-opacity-20 rounded-2xl' // Background color for 'totalgassold'
            chevronColor = 'teal' // Chevron color for 'totalgassold'
            break
        case 'totalgasqty':
            bgColor = 'bg-blue-500 bg-opacity-10 rounded-2xl' // Background color for 'totalgasqty'
            break
        case 'totalhubs':
            bgColor = 'bg-yellow-400 bg-opacity-10 rounded-2xl' // Background color for 'totalhubs'
            chevronColor = 'teal' // Chevron color for 'totalhubs'
            break
        case 'totalhubscustomers':
            bgColor = 'bg-blue-500 bg-opacity-10 rounded-2xl' // Background color for 'totalhubscustomers'
            break
        case 'salesbyhubs':
            bgColor = 'bg-teal-300 bg-opacity-20 rounded-2xl' // Background color for 'salesbyhubs'
            break
        case 'salesbyhubsmarch':
            bgColor = 'bg-indigo-800 bg-opacity-10 rounded-2xl' // Background color for 'salesbyhubsmarch'
            break
        case 'totalb2b':
            bgColor = 'bg-red-600 bg-opacity-10' // Background color for 'totalb2b'
            break
        case 'totalb2c':
            bgColor = 'bg-yellow-400 bg-opacity-10' // Background color for 'totalb2c'
            break
        default:
            bgColor = ''
    }

    return (
        // Rendering a Card component with background color determined dynamically
        <Card bgColor={bgColor}>
            <div className="relative flex flex-col items-start gap-4">
                <StatisticIcon type={data.key} />{' '}
                {/* Rendering the statistic icon based on type */}
                {/* Rendering NGN value */}
                <div className="text-2xl font-extrabold">
                    {data.id &&
                    (data.id === 2 || data.id === 4 || data.id === 6)
                        ? `NGN ${data.value}`
                        : data.value}
                </div>
                {/* Rendering label */}
                <p className="text-sm font-semibold mb-6">{data.label}</p>
                {/* Rendering chevron icon if the id is 1 or 3 */}
                {(data.id === 1 || data.id === 3) && (
                    <div className="absolute bottom-0 right-0 -mb-2">
                        {/* Rendering chevron icon with background color determined dynamically */}
                        <div
                            className={`bg-${chevronColor}-300 w-8 h-8 rounded-full flex justify-center items-center`}
                        >
                            {/* Chevron icon */}
                            {/* <HiChevronDown className="text-white font-bold text-2xl" /> */}
                            <div
                                className={`bg-${chevronColor}-500 w-8 h-8 rounded-full flex justify-center items-center text-white font-bold text-2xl`}
                            >
                                <Dropdown>
                                    <Dropdown.Item
                                        eventKey="b"
                                        className="text-md font-semibold mb-8"
                                    >
                                        50 Units
                                        <br />
                                        12Kg Cylinder
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="c"
                                        className="text-md font-semibold mb-8"
                                    >
                                        25 Units
                                        <br />
                                        25Kg Cylinder
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="c"
                                        className="text-md mb-8"
                                    >
                                        10 Units
                                        <br />
                                        50Kg Cylinder
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
}

const DashboardAnalyticsData = () => {
    const dispatch = useAppDispatch()

    const { statisticData } = useAppSelector(
        (state) => state.accounting.data.accountingData
    )

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getDashboardData())
    }
    return <AccountingAnalytics data={statisticData} />
}
export default DashboardAnalyticsData

// Function to render multiple statistic cards
const AccountingAnalytics = ({
    data = [],
}: {
    data?: Partial<AccountingAnalytics>[]
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {data.map((card) => (
                <StatisticCard key={card.key} data={card} />
            ))}
        </div>
    )
}
