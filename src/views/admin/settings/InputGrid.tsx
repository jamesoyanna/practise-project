import { Input } from '@/components/ui';
import React, { useEffect, useState } from 'react';

interface InputGridProps {
    setData: { [category: string]: { [type: string]: string } };
    handleChange: (type: string, value: string) => void;
}

const InputGrid: React.FC<InputGridProps> = ({ setData, handleChange }) => {
    const [prices, setPrices] = useState<{ [type: string]: string }>({});

    useEffect(() => {
        if (setData && Object.keys(prices).length === 0) {
            const initialPrices: { [type: string]: string } = {};
            for (const category in setData) {
                if (Object.prototype.hasOwnProperty.call(setData, category)) {
                    const categoryData = setData[category];
                    if (categoryData) {
                        for (const type in categoryData) {
                            if (Object.prototype.hasOwnProperty.call(categoryData, type)) {
                                initialPrices[type] = categoryData[type];
                            }
                        }
                    }
                }
            }
            console.log('Initial Prices:', initialPrices);
            setPrices(initialPrices);
        }
    }, [setData]); // Remove prices from the dependency array

    const handleInputChange = (type: string, value: string) => {
        try {
            console.log('Handling input change:', type, value);
            setPrices((prevPrices) => ({
                ...prevPrices,
                [type]: value,
            }));
            handleChange(type, value);
        } catch (error) {
            console.error('Error in handleInputChange:', error);
        }
    };

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        try {
            const { value, dataset } = e.currentTarget;
            const type = dataset.type || '';
            console.log('Type:', type, 'Value:', value);
            handleInputChange(type, value);
        } catch (error) {
            console.error('Error in onChangeHandler:', error);
        }
    };

    return (
        <div>
            {Object.entries(setData).map(([category, categoryData]) => (
                <div key={category}>
                    <div className="grid grid-cols-2 gap-4">
                        {categoryData &&
                            Object.entries(categoryData).map(([type, price]) => (
                                <div key={type} className="flex gap-3 items-center">
                                    <label className="bg-[#f9f9f9] p-3 rounded-md text-xs whitespace-nowrap">{type}</label>
                                    <Input
                                        type="text"
                                        value={prices[type] || ''}
                                        className="bg-[#f9f9f9] border-none focus:border text-xs focus:outline-none focus:border-yellow-400 focus:ring-yellow-400"
                                        data-type={type}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default InputGrid;
