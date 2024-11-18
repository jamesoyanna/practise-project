import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@/components/ui';
import reducer, { getStockDetails, useAppDispatch,
    useAppSelector, } from '../../../store/slices/stocks/details';
import { injectReducer } from '@/store';

injectReducer('stockDetails', reducer);

interface StockDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    cylinderId?: string;
}

const StockDetails: React.FC<StockDetailsProps> = ({
    cylinderId,
    isOpen,
    onClose,
}) => {
    const dispatch = useAppDispatch();

    // Fetch stock details effect
    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                if (typeof cylinderId === 'string') {
                    dispatch(getStockDetails(cylinderId));
                }
            } catch (error) {
                console.error('Error fetching stock details:', error);
            }
        };

        fetchStockDetails();
    }, [cylinderId, dispatch]);

    // Selectors for stock details and loading state
    const loading = useAppSelector((state) => state.stockDetails.data.loading);
    const stockDetails = useAppSelector(
        (state) => state.stockDetails.data.stockDetailsList
    );

    console.log("Stock Details", stockDetails)
    
    const getStatusLabel = (status: string): JSX.Element => {
        let textClass = '';
        let label = '';

        switch (status) {
            case '0':
                textClass = 'text-blue-500';
                label = 'Assigned';
                break;
            case '1':
                textClass = 'text-green-500';
                label = 'Accepted';
                break;
            case '2':
                textClass = 'text-emerald-500';
                label = 'Rescheduled';
                break;
            case '3':
                textClass = 'text-red-500';
                label = 'Delivered';
                break;
            case '4':
                textClass = 'text-gray-500';
                label = 'Approved';
                break;
            default:
                textClass = 'text-red-500';
                label = 'Unknown';
                break;
        }

        return <span className={textClass}>{label}</span>;
    };

    return (
        <>
            <Dialog isOpen={isOpen} onClose={onClose}>
                <h6 className="text-blue-800">
                    <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                        View
                    </span>
                </h6>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    stockDetails && (
                        <>
                            <div className="grid grid-cols-2 gap-4 mt-10">
                                <div>
                                    <span>Assigned Date</span>
                                   
                                    <p className="text-xs font-semibold">
                                        {stockDetails.deliveryDate}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Stock Status</span>
                                    <p className="text-xs font-semibold">{stockDetails ? getStatusLabel(stockDetails.status) : 'Unknown'}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Cylinder Size</span>
                                   
                                    <p className="text-xs font-semibold">
                                        {stockDetails.cylinderSize}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Cylinder Tag Number</span>
                                 
                                    <p className="text-xs font-semibold">
                                        {stockDetails.id}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div>
                                <span>Assigned By</span>
                                <p className="text-xs font-semibold">
                                {stockDetails.customer}
                                    </p>
                              
                                <p className="text-xs font-semibold">
                                    {stockDetails.deliveryOfficer}
                                </p>
                            </div>
                        </>
                    )
                )}
            </Dialog>
        </>
    );
};

export default StockDetails;
