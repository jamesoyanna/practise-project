import React, { useEffect } from 'react'
import { Button, Dialog } from '@/components/ui'
import { useNavigate } from 'react-router-dom'
import reducer, {
    getStockDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/stocks/details'

import { injectReducer } from '@/store'

injectReducer('stockDetails', reducer)

interface CylinderTrackingDetailsProps {
    isOpen: boolean
    onClose: () => void
    cylinderId?: string
}

const CylinderTrackingDetails: React.FC<CylinderTrackingDetailsProps> = ({
    isOpen,
    onClose,
    cylinderId,
}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    // Fetch order details effect
    useEffect(() => {
        const fetchHubAssistanceDetails = async () => {
            try {
                if (typeof cylinderId === 'string') {
                    dispatch(getStockDetails(cylinderId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchHubAssistanceDetails()
    }, [cylinderId, dispatch])

    // Selectors for order details and loading state
    const loading = useAppSelector((state) => state.stockDetails.data.loading)
    const stockDetails = useAppSelector(
        (state) => state.stockDetails.data.stockDetailsList
    )

    return (
        <>
            <Dialog isOpen={isOpen} onClose={onClose}>
                <h6 className="text-blue-800">
                    <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                        View Generic Cylinder
                    </span>
                </h6>
                {stockDetails &&
                    (loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Date Onboarded</span>

                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.deliveryDate}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Owner</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.owner}
                                    </p>
                                    
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Onboarded By</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.customer}
                                    </p>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.deliveryOfficer}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Cylinder ID</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.cylinderId}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Cylinder Type</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.cylinderType}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Cylinder Size</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.cylinderSize}
                                    </p>
                                </div>
                                <div className="ml-20">
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
                                <div className="ml-20">
                                    <span>Manufacturer Name</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.manufacturerName}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Current Holder</span>
                                    <p className="text-black">Emmauel Akpan</p>
                                    <br />
                                    <span>Designation</span>
                                    <p className="text-black">Logistics Officer</p>
                                    <div>
                                 
                                   
                                </div>
                                </div>
                               
                                <div className="ml-auto mt-12">
                                <Button
                                    variant="solid"
                                    size="md"
                                    className=" p-15"
                                    onClick={() => navigate('/cylinder-movement')}
                                >
                                View Cylinder Movement
                                </Button>
                                </div>
                            </div>

                        </>
                    ))}
            </Dialog>
        </>
    )
}

export default CylinderTrackingDetails
