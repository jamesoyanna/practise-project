import React, { useState, useEffect } from 'react'
import { Button, Dialog, Avatar } from '@/components/ui'
import { BsCheckLg } from 'react-icons/bs'
import DeliveryOfficerForm from '../Form/DeliveryOfficer'
import reducer, {
    getStockDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/stocks/details'
import { injectReducer } from '@/store'

injectReducer('stockDetails', reducer)

interface StockDetailsProps {
    isOpen: boolean
    onClose: () => void
    cylinderId?: string
}

const HubAssistanceDetails: React.FC<StockDetailsProps> = ({
    isOpen,
    onClose,
    cylinderId,
}) => {
    const dispatch = useAppDispatch()

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [isConfirmOpen, setConfirmIsOpen] = useState(false)
    const [isAssignConfirmationOpen, setIsAssignConfirmationOpen] =
        useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleCreateExpense = () => {
        setShowConfirmation(true)
        setConfirmIsOpen(true)
    }

    const handleConfirmModalClose = () => {
        setShowConfirmation(false)
        setConfirmIsOpen(false)
    }

    const handleSubmit = () => {
        setConfirmIsOpen(false)
        setIsSubmitted(true)
        console.log('submitted')
    }

    const handleAssignConfirmationClose = () => {
        setShowConfirmation(false)
        setIsAssignConfirmationOpen(false)
    }

    const handleAssignConfirm = () => {
        setIsAssignConfirmationOpen(false)
        // setConfirmIsOpen(true);
        setIsSubmitted(true)
    }

    const handleDialogClose = () => {
        setShowConfirmation(false)
        setConfirmIsOpen(false)
        setIsSubmitted(false)
        onClose()
    }

    // Fetch stock details effect
    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                if (typeof cylinderId === 'string') {
                    dispatch(getStockDetails(cylinderId))
                }
            } catch (error) {
                console.error('Error fetching stock details:', error)
            }
        }

        fetchStockDetails()
    }, [cylinderId, dispatch])

    // Selectors for stock details and loading state
    const loading = useAppSelector((state) => state.stockDetails.data.loading)
    const stockDetails = useAppSelector(
        (state) => state.stockDetails.data.stockDetailsList
    )

    const getStatusLabel = (status: string): JSX.Element => {
        let textClass = ''
        let label = ''

        switch (status) {
            case '0':
                textClass = 'text-blue-500'
                label = 'Assigned'
                break
            case '1':
                textClass = 'text-green-500'
                label = 'Accepted'
                break
            case '2':
                textClass = 'text-emerald-500'
                label = 'Rescheduled'
                break
            case '3':
                textClass = 'text-red-500'
                label = 'Delivered'
                break
            case '4':
                textClass = 'text-gray-500'
                label = 'Approved'
                break
            default:
                textClass = 'text-red-500'
                label = 'Unknown'
                break
        }

        return <span className={textClass}>{label}</span>
    }

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
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Assigned Date</span>
                                   
                                    <p className="text-xs font-semibold">
                                        {stockDetails.deliveryDate}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Stock Status</span>
                                    
                                    <p className="text-xs font-semibold">
                                        {stockDetails
                                            ? getStatusLabel(
                                                  stockDetails.status
                                              )
                                            : 'Unknown'}
                                    </p>
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

                            <div className="mt-8 flex flex-col gap-4">
                                <Button
                                    variant="solid"
                                    size="md"
                                    className="px-[2rem]"
                                    onClick={handleCreateExpense}
                                >
                                    Assign to Delivery Officer
                                </Button>
                            </div>
                        </>
                    )
                )}
            </Dialog>

            {showConfirmation && (
                <Dialog
                    preventScroll={false}
                    className="justify-center flex flex-col"
                    height={300}
                    width={450}
                    isOpen={isConfirmOpen}
                    onClose={handleConfirmModalClose}
                >
                    <h6 className="text-blue-800">
                        <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                            Assign
                        </span>
                    </h6>
                    <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                        <DeliveryOfficerForm />

                        <div className="flex justify-center gap-4">
                            <Button
                                variant="default"
                                size="md"
                                className="px-[2rem] border-2 border-[#194DA3]"
                                onClick={handleConfirmModalClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                size="md"
                                className="px-[2rem]"
                                onClick={() =>
                                    setIsAssignConfirmationOpen(true)
                                }
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </Dialog>
            )}

            {isAssignConfirmationOpen && (
                <Dialog
                    preventScroll={false}
                    className="justify-center flex flex-col"
                    height={300}
                    width={450}
                    isOpen={isAssignConfirmationOpen}
                    onClose={handleAssignConfirmationClose}
                >
                    <h6 className="text-blue-800">
                        <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                            Assign
                        </span>
                    </h6>
                    <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                        <p className="text-lg text-center">
                            Are you sure you want to Assign the smart device to
                            a Delivery Officer
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="default"
                                size="md"
                                className="px-[2rem] border-2 border-[#194DA3]"
                                onClick={handleAssignConfirmationClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="solid"
                                size="md"
                                className="px-[2rem]"
                                onClick={handleAssignConfirm}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </Dialog>
            )}

            {isSubmitted && (
                <Dialog
                    preventScroll={false}
                    className="justify-center flex flex-col"
                    contentClassName="custom-content-class flex-grow"
                    height={300}
                    width={400}
                    isOpen={isSubmitted}
                    onClose={handleDialogClose}
                >
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-center">
                            <Avatar
                                icon={<BsCheckLg />}
                                shape="circle"
                                size="lg"
                                className="bg-[#194DA3] text-center"
                            />
                        </span>
                        <p className="text-[15px]">
                            Assigned to Delivery Officer Successfully
                        </p>
                        <span className="text-sm text-center">
                            <i>
                                Great! Awaiting Delivery Officer to accept the
                                smart device.
                            </i>
                        </span>
                        <Button
                            variant="solid"
                            size="md"
                            className="w-full"
                            onClick={handleDialogClose}
                        >
                            Okay
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    )
}

export default HubAssistanceDetails
