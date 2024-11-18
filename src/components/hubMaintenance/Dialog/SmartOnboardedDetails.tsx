import React, { useEffect } from 'react'
import { Dialog } from '@/components/ui'
import reducer, {
    getStockDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/stocks/details'

import { injectReducer } from '@/store'

injectReducer('stockDetails', reducer)


interface HubAssistanceDetailsProps {
    isOpen: boolean
    onClose: () => void
    cylinderId?: string
}

const HubAssistanceDetails: React.FC<HubAssistanceDetailsProps> = ({
    isOpen,
    onClose,
    cylinderId,
}) => {
    const dispatch = useAppDispatch()

     // Fetch order details effect
     useEffect(() => {
        const fetchHubAssistanceDetails = async () => {
            try {
                if (typeof cylinderId === 'string') {
                    dispatch(getStockDetails( cylinderId ))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchHubAssistanceDetails()
    }, [cylinderId, dispatch])

    // Selectors for order details and loading state
    const loading = useAppSelector((state) => state.stockDetails.data.loading);
    const stockDetails = useAppSelector(
        (state) => state.stockDetails.data.stockDetailsList
    );

   
    return (
        <>
             <Dialog isOpen={isOpen} onClose={onClose}>
            <h6 className="text-blue-800">
                <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                    View Volumetric GasBot
                </span>
            </h6>
            {stockDetails &&
                (loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4 mt-10">
                            <div>
                                <span>Date Onboarded</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.deliveryDate}
                                </p>
                            </div>
                            <div>
                                <span>Owner</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.owner}
                                </p>
                            </div>

                            <div>
                                <span>Onboarded By</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.customer}
                                </p>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.deliveryDate}
                                </p>
                            </div>
                            <div></div>
                        </div>
                        <hr className="my-5" />
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div>
                                <span>Smart Device Id</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.cylinderId}
                                </p>
                            </div>
                            <div>
                                <span>Smart Device Type</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.smartDeviceType}
                                </p>
                            </div>
                            <div>
                                <span>Smart Device Serial No.</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.cylinderSize}
                                </p>
                            </div>
                            <div>
                                <span>Network Type</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.tareWeight}
                                </p>
                            </div>
                        </div>
                        <hr className="my-5" />
                        <div className="grid grid-cols-2 gap-4 mt-5">
                            <div>
                                <span>Date Manufactured</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.deliveryDate}
                                </p>
                            </div>
                            <div>
                                <span>Manufacturer Name</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.manufacturerName}
                                </p>
                            </div>
                        </div>
                    </>
                ))}
        </Dialog>
        </>
    )
}

export default HubAssistanceDetails
