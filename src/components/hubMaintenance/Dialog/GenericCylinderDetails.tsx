import React, { useState, useEffect } from 'react'
import { Button, Dialog, Avatar } from '@/components/ui'
import { BsCheckLg } from 'react-icons/bs'
import { Formik, Form, Field } from 'formik'
import Input from '@/components/ui/Input'
import ManufacturerNameField from '../../hubMaintenance/onboarding/form/manufacturerName'
import ManufacturedDateFilter from '../../hubMaintenance/onboarding/form/manufacturedDate'
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
                                    <span>Date Retrieved</span>

                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.deliveryDate}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Retrieved By</span>
                                    <p className="text-black">Seun Oni</p>
                                    <p className="text-black">
                                        Delivery Officer
                                    </p>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.owner}
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
                                    <span>Generic Cylinderr</span>
                                    <span>Serial Number</span>
                                    <p className="text-black">SN001A</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Tare Weight</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.tareWeight}
                                    </p>
                                </div>
                                <div className="ml-20">
                                    <span>Cylinder Status</span>
                                    <p className="text-black">Good</p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Retrieved From</span>
                                    <p className="text-black">Purple Bistro</p>
                                </div>
                                <div className="ml-20">
                                    <span>Customer Type</span>
                                    <p className="text-xs font-semibold text-black">
                                        {stockDetails?.customerType}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-5" />
                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <div>
                                    <span>Total Weight</span>
                                    <p className="text-black">29.5 Kg</p>
                                </div>
                                <div className="ml-20">
                                    <span>Gas Remnant</span>
                                    <p className="text-black"></p>5.00 Kg
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col gap-4">
                                <Button
                                    variant="solid"
                                    size="md"
                                    className="px-[2rem]"
                                    onClick={handleCreateExpense}
                                >
                                    Onboard
                                </Button>
                            </div>
                        </>
                    ))}
            </Dialog>

            {showConfirmation && (
                <Dialog
                    preventScroll={false}
                    className="justify-center flex flex-col mt-20"
                    height={300}
                    width={450}
                    isOpen={isConfirmOpen}
                    onClose={handleConfirmModalClose}
                >
                    <h6 className="text-blue-800">
                        <span className="bg-blue-100 bg-opacity-50 px-4 py-1 rounded-2xl">
                            Onboard
                        </span>
                    </h6>
                    <div className="flex flex-col gap-4 justify-center mt-[1rem]">
                        <Formik
                            initialValues={{
                                owner: '',
                                smartDeviceType: '',
                                networkType: '',
                                tarWeight: '',
                                manufacturedDate: '',
                                manufacturerName: '',
                            }}
                            onSubmit={(values, actions) => {
                                console.log('Form submitted:', values)
                                actions.resetForm()
                            }}
                        >
                            {(formikProps) => (
                                <Form>
                                    <div className="px-4 lg:px-0">
                                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
                                            <div className="flex flex-col gap-2">
                                                <Field
                                                    type="text"
                                                    placeholder="Owner"
                                                    name="owner"
                                                    className="my-2 w-full text-sm"
                                                    component={Input}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <ManufacturedDateFilter />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <ManufacturerNameField
                                                    value={
                                                        formikProps.values
                                                            .manufacturerName
                                                    }
                                                    onChange={(value) =>
                                                        formikProps.setFieldValue(
                                                            'manufacturerName',
                                                            value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <div className="flex flex-col gap-4">
                            <Button
                                variant="solid"
                                size="md"
                                className="px-[2rem]"
                                onClick={() =>
                                    setIsAssignConfirmationOpen(true)
                                }
                            >
                                Onboard Generic Cylinder
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
                    <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                        <p className="text-lg text-center">
                            You are about to onboard a generic cylinder
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                variant="default"
                                size="md"
                                className="px-[2rem] border-2 border-[#194DA3]"
                                onClick={handleAssignConfirmationClose}
                            >
                                No
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
                        <span className="text-[15px] text-center">
                            Wow! You've successfully onboarded a generic
                            cylinder.
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
