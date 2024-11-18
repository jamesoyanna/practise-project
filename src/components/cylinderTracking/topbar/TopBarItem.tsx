import { ReactNode } from 'react';

type TopBarItemProps = {
    title: ReactNode | string;
    value: ReactNode | string;
    className?: string;
};

const TopBarItem = ({ title, value, className }: TopBarItemProps) => {
    return (
        <div className={`flex items-center  ${className}`}>
            <div className='bg-gray-100 rounded-full py-5'>
            <span className="bg-blue-800 p-3 rounded-full xs:rounded-lg font-bold text-base text-white">
                {title}</span>
            
            <span className="bg-gray-100 p-3 rounded-full xs:rounded-lg font-bold text-base text-black">
                {value}
            </span>
         </div>
         </div>
       
    );
};

export default TopBarItem;
