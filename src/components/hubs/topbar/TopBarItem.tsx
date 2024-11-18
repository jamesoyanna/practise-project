import { ReactNode } from 'react';

type TopBarItemProps = {
    title: ReactNode | string;
    value: ReactNode | string;
    className?: string;
};

const TopBarItem = ({ title, value, className }: TopBarItemProps) => {
    return (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            <div className="bg-blue-800 p-3 rounded-full xs:rounded-lg">
                <span className="font-bold text-base text-white">{title}</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-full xs:rounded-lg">
                <span className="font-bold text-base text-black">{value}</span>
            </div>
        </div>
    );
};

export default TopBarItem;
