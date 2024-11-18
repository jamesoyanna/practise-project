import React, { useState, useEffect } from 'react'
import { Button, Dialog, Avatar } from '@/components/ui'
import { BsCheckLg } from 'react-icons/bs'
import reducer, {
    getStockDetails,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/stocks/details'
import { injectReducer } from '@/store'

injectReducer('stockDetails', reducer)

interface StockDetailsProps {
    isOpen: boolean
    onClose: () => void
    cylinderId?: string
}

const StockDetails: React.FC<StockDetailsProps> = ({
    isOpen,
    onClose,
    cylinderId,
}) => {
    const dispatch = useAppDispatch()

    const [showConfirmation, setShowConfirmation] = useState(false)
    const [isConfirmOpen, setConfirmIsOpen] = useState(false)
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
    console.log("Get Stock Details:", stockDetails);

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
                            <div className=" grid grid-cols-2 gap-4 mt-10">
                                <div>
                                    <span>Assigned Date</span>
                                    <p className="text-xs font-semibold">
                                        {stockDetails.deliveryDate}
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

                            <div className="mt-8 flex flex-row gap-4">
                                <Button
                                    variant="default"
                                    size="md"
                                    type="submit"
                                    className="px-[2rem] border-2 border-[#EB5757] text-red-600 ml-20  "
                                    onClick={onClose}
                                >
                                    Resolution
                                </Button>
                                <Button
                                    variant="solid"
                                    size="md"
                                    className="px-[2rem] ml-10"
                                    onClick={handleCreateExpense}
                                >
                                    Accept
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
                    <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                        <p className="text-lg text-center">
                            Are you sure you want to accept this cylinder from a
                            Logistic Officer?
                        </p>
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
                                onClick={handleSubmit}
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
                            Accepted from Logistic Officer Successfully
                        </p>
                        <span>
                            <i>Great! Cylinder is in your stock now.</i>
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

export default StockDetails;
