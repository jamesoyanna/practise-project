import React, { useEffect } from 'react'
import { Dialog } from '@/components/ui'
import reducer, {
    getStockDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/stocks/details'

import { injectReducer } from '@/store'

injectReducer('stockDetails', reducer)

interface MaintenanceDetailsProps {
    isOpen: boolean
    onClose: () => void
    cylinderId?: string
}

const MaintenanceDetails: React.FC<MaintenanceDetailsProps> = ({
    isOpen,
    onClose,
    cylinderId,
}) => {
    const dispatch = useAppDispatch()

    // Fetch order details effect
    useEffect(() => {
        const fetchMaintenanceDetails = async () => {
            try {
                if (typeof cylinderId === 'string') {
                    dispatch(getStockDetails( cylinderId ))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchMaintenanceDetails()
    }, [getStockDetails, dispatch])

    // Selectors for maintenance details and loading state
    const loading = useAppSelector(
        (state) => state.stockDetails.data.loading
    )
    console.log("fetch Details data:", loading)
    const stockDetails = useAppSelector(
        (state) => state.stockDetails.data.stockDetailsList
    )


    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <h6 className="text-blue-800">
                <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                    View Brand New Cylinder
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
                                <span>Cylinder Id</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.cylinderId}
                                </p>
                            </div>
                            <div>
                                <span>Cylinder Type</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.cylinderType}
                                </p>
                            </div>
                            <div>
                                <span>Cylinder Size</span>
                                <p className="text-xs font-semibold text-black">
                                    {stockDetails?.cylinderSize}
                                </p>
                            </div>
                            <div>
                                <span>Tare Weight</span>
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
    )
}

export default MaintenanceDetails
