import classNames from 'classnames';
import Card from '@/components/ui/Card';
import  CButton  from '../ui/Button/Cirlular-Button';
import reducer, { StockStats } from '@/store/slices/stocks';
import { useNavigate } from 'react-router-dom';
import { injectReducer } from '@/store'

injectReducer('StockList', reducer)

const StatisticIcon = ({ type }: { type?: string }) => {
    const navigate = useNavigate();

    switch (type) {
        case '12kg':
            return <CButton
            color='#194DA3'
            variant="solid"
            size="sm"
            disabled={false}
            loading={false}
            className={"bg-[#07EFB8]"}
            onClick={() => {
                navigate(`/12kg-cylinder`);
            }}
        >
            View More
        </CButton>;
        case '25kg':
            return <CButton
            color="#07EFB8"
            variant="solid"
            size="sm"
            disabled={false}
            loading={false}
            className="bg-[#194DA3]"
            // style={buttonStyle}
            onClick={() => {
                navigate(`/25kg-cylinder`)
            }}
        >
            View More
        </CButton>;
        case '50kg':
            return <CButton
            color="#194DA3"
            variant="solid"
            size="sm"
            disabled={false}
            loading={false}
            className="bg-[#FFC124]"
            onClick={() => {
                navigate(`/50kg-cylinder`)
            }}
        >
            View More
        </CButton>;
        case 'smart':
            return <CButton
            color="#194DA3"
            variant="solid"
            size="sm"
            disabled={false}
            loading={false}
            className="bg-[#EB5757]"
            onClick={() => {
                navigate(`/smartcylinder`)
            }}
        >
            View More
        </CButton>;

        default:
             return null;
     }
};

const StatisticCard = ({ data = {} }: { data: Partial<StockStats> }) => {
    const cardClass = classNames('bg- rounded-md shadow-md p-4', {
        'bg-blue-500 bg-opacity-10': data.color === '#194DA3',
        'bg-teal-400 bg-opacity-10': data.color === '#07EFB8',
        'bg-yellow-400 bg-opacity-10': data.color === '#FFC124',
        'bg-red-400 bg-opacity-10': data.color === '#EB5757', 
    });

    const lineStyle = {
        backgroundColor: data.color,
        height: '2px',
        width: '100%',
        marginBottom: '5px',
    };

    return (
        <Card className={cardClass}>
            <div className="flex items-center gap-8">
                <div>
                    <div className="flex flex-col gap-1.5 items-start">
                    <div className='flex'>
                        <h3 className="font-medium leading-none text-lg mr-5">{data.title}</h3>
                        <StatisticIcon type={data.key} />
                    </div>
                        
                        <div style={lineStyle}></div>
                        <h3 className="font-bold leading-none">{data.value}</h3>
                        <p className="font-semibold">{data.label}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const StockAnalytics = ({ data = [] }: { data?: Partial<StockStats>[] }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
            {data.map((card) => (
                <StatisticCard key={card.key} data={{ ...card }} />
            ))}
        </div>
    );
};

export default StockAnalytics;
