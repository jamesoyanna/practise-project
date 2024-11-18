import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
// Import necessary components and icons
import {
    HiBuildingOffice2,
    HiBuildingStorefront,
    HiOutlineBuildingStorefront,
} from 'react-icons/hi2'
import { CiMoneyBill } from 'react-icons/ci'
import {
    HiUserGroup,
    HiOutlineArchive,
    HiChat,
    HiShoppingBag,
    HiShoppingCart,
    HiOutlineShoppingCart,
} from 'react-icons/hi'
import type { OfficerDashboardAnalytics } from '../../store/slices/Officerdashboard'

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
                    icon={<HiOutlineArchive />}
                />
            )
        case 'totalhubs':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 rounded-full text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={<HiBuildingOffice2 />}
                />
            )
        case 'totalhubscustomers':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'ordersdelivered':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-green-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiOutlineShoppingCart />}
                />
            )
        case 'orderscreated':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-blue-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiOutlineShoppingCart />}
                />
            )
        case 'totalb2c':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-200 text-amber-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiUserGroup />}
                />
            )
        case 'customersonboarded':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-red-600 rounded-full dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiBuildingStorefront />}
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
    data: Partial<OfficerDashboardAnalytics>
}) => {
    let bgColor = ''
    let chevronColor = ''
    // Determine background color and chevron color based on data key
    switch (data.key) {
        case 'totalgassold':
            bgColor = 'bg-teal-300 bg-opacity-10 rounded-2xl'
            chevronColor = 'teal'
            break
        case 'totalgasqty':
            bgColor = 'bg-indigo-800 bg-opacity-10 rounded-2xl'
            chevronColor = 'indigo'
            break
        case 'totalhubs':
            bgColor = 'bg-yellow-400 bg-opacity-10 rounded-2xl'
            chevronColor = 'yellow'
            break
        case 'totalhubscustomers':
            bgColor = 'bg-red-600 bg-opacity-10 rounded-2xl'
            chevronColor = 'red'
            break
        case 'ordersdelivered':
            bgColor = 'bg-teal-300 bg-opacity-10 rounded-2xl'
            chevronColor = 'teal'
            break
        case 'orderscreated':
            bgColor = 'bg-indigo-800 bg-opacity-10 rounded-2xl'
            chevronColor = 'indigo'
            break
        case 'customersonboarded':
            bgColor = 'bg-red-600 bg-opacity-10 rounded-2xl'
            chevronColor = 'red'
            break
        case 'totalb2c':
            bgColor = 'bg-yellow-400 bg-opacity-10 rounded-2xl'
            chevronColor = 'yellow'
            break
        default:
            bgColor = ''
    }

    return (
        <Card bgColor={bgColor}>
            <div className="relative flex flex-col items-start gap-4 ml-8">
                <StatisticIcon type={data.key} />
                <div className="text-2xl font-extrabold">
                    {data.id && (data.id === 5 || data.id === 6)
                        ? `NGN ${data.value}`
                        : data.value}
                </div>
                <p className="text-sm font-semibold mb-6">{data.label}</p>
                {/* <div className={`bg-${chevronColor}-500 w-8 h-8 rounded-full flex justify-center items-center text-white font-bold text-2xl`}>
                <Dropdown>
                    <Dropdown.Item eventKey="b" className='text-lg mb-8'>
                        NGN 350,000
                        <br />(Sales made B2C)
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="c" className='text-lg'>
                        NGN 70,000
                        <br />(Sales made B2B)
                    </Dropdown.Item>
                </Dropdown>
            </div> */}
            </div>
        </Card>
    )
}

// Function to render multiple statistic cards
const Statistic = ({
    data = [],
}: {
    data?: Partial<OfficerDashboardAnalytics>[]
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map((card) => (
                <StatisticCard key={card.key} data={card} />
            ))}
        </div>
    )
}

export default Statistic
