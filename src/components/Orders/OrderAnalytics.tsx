import classNames from 'classnames';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import {
    HiUserGroup,
} from 'react-icons/hi';
import type { OrderStats } from '@/store/slices/orders';

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'b2b':
            return <Avatar className='bg-blue-500 border rounded-xl bg-opacity-50' size={90} icon={<HiOutlineBuildingStorefront />} />;
        case 'b2c':
            return <Avatar className='bg-teal-400 bg-opacity-50 rounded-xl' size={90} icon={<HiUserGroup />} />;

        default:
            return null;
    }
};

const StatisticCard = ({ data = {} }: { data: Partial<OrderStats> }) => {
    const cardClass = classNames('bg- rounded-md shadow-md p-4', {
        'bg-blue-500 bg-opacity-10': data.color === '#194DA3',
        'bg-teal-400 bg-opacity-10': data.color === '#07EFB8',
    });

    const lineStyle = {
        backgroundColor: data.color,
        height: '1px',
        width: '100%',
        marginBottom: '5px',
    };

    return (
        <Card className={cardClass}>
            <div className="flex items-center gap-8">
                <div style={{ flex: '0 0 60px' }}>
                    <StatisticIcon type={data.key} />
                </div>
                <div>
                    <div className="flex flex-col gap-1.5 items-start">
                        <h3 className="font-bold leading-none">{data.title}</h3>
                        <div style={lineStyle}></div>
                        <h3 className="font-bold leading-none">{data.value}</h3>
                        <p className="font-semibold">{data.label}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const OrderAnalytics = ({ data = [] }: { data?: Partial<OrderStats>[] }) => {
    // Limit to at most 2 cards
    const limitedData = data.slice(0, 2)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-8">
            {limitedData.map((card) => (
                <StatisticCard key={card.key} data={{ ...card }} />
            ))}
        </div>
    );
};

export default OrderAnalytics;
