/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import reducer, {
    getOrderDetails,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders/details';
import { Button, Dialog, Avatar } from '@/components/ui';
import DeliveryOfficerForm from '../accountOfficer/form/DeliveryOfficer';
import { BsCheckLg } from 'react-icons/bs';

import { injectReducer } from '@/store';

type OrderDetailsProps = {
    isOpen: boolean;
    onClose?: () => void;
    orderCode?: string;
};

injectReducer('orderDetails', reducer);

const StockOrderDetails = ({ orderCode, isOpen, onClose }: OrderDetailsProps) => {
    if (!isOpen) return null;
    const dispatch = useAppDispatch();

    // State management
    const [dialogState, setDialogState] = useState({
        showApproveConfirmation: false,
        showRescheduleConfirmation: false,
        showApproveSubmitted: false,
        showRescheduleSubmitted: false,
        isConfirmOpen: false,
        isSubmitted: false,
    });

    // Handlers for dialog states
    const handleApprove = () => {
        setDialogState({
            ...dialogState,
            showApproveConfirmation: true,
            isConfirmOpen: true,
        });
    };

    const handleReschedule = () => {
        setDialogState({
            ...dialogState,
            showRescheduleConfirmation: true,
            isConfirmOpen: true,
        });
    };

    const handleConfirmModalClose = () => {
        setDialogState({
            ...dialogState,
            showApproveConfirmation: false,
            showRescheduleConfirmation: false,
            isConfirmOpen: false,
        });
    };

    const handleSubmit = () => {
        setDialogState({
            ...dialogState,
            isConfirmOpen: false,
            isSubmitted: true,
            showApproveSubmitted: dialogState.showApproveConfirmation,
            showRescheduleSubmitted: dialogState.showRescheduleConfirmation,
        });
    };

    const handleDialogClose = () => {
        setDialogState({
            ...dialogState,
            showApproveConfirmation: false,
            showRescheduleConfirmation: false,
            isSubmitted: false,
            showApproveSubmitted: false,
            showRescheduleSubmitted: false,
        });
        if (onClose) onClose();
    };

    // Fetch order details effect
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                if (typeof orderCode === 'string') {
                    dispatch(getOrderDetails(orderCode));
                }
            } catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderCode, dispatch]);

    // Selectors for order details and loading state
    const loading = useAppSelector((state) => state.orderDetails.data.loading);
    const orderDetails = useAppSelector(
        (state) => state.orderDetails.data.orderDetailsList
    );

    const getStatusLabel = (status: string): JSX.Element => {
        let textClass = '';
        let label = '';

        switch (status) {
            case '0':
                textClass = 'text-emerald-500';
                label = 'Approved';
                break;
            case '1':
                textClass = 'text-red-500';
                label = 'Pending';
                break;
            case '2':
                textClass = 'text-blue-500';
                label = 'Rescheduled';
                break;
            case '3':
                textClass = 'text-green-500';
                label = 'Delivered';
                break;
            case '4':
                textClass = 'text-gray-500';
                label = 'Assigned';
                break;
            default:
                textClass = 'text-red-500';
                label = 'Unknown';
                break;
        }

        return <span className={textClass}>{label}</span>;
    };

    const renderButtons = (status: string | undefined) => {
        switch (status) {
            case '1': // Pending
                return (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="default"
                            size="md"
                            className="px-[2rem] border-2 border-[#194DA3]"
                            onClick={handleReschedule}
                        >
                            Reschedule
                        </Button>
                        
                        <Button
                            variant="solid"
                            size="md"
                            className="px-[2rem]"
                            onClick={handleApprove}
                        >
                            Approve
                        </Button>

                        {dialogState.showApproveConfirmation && (
                            <ConfirmDialog
                                isOpen={dialogState.isConfirmOpen}
                                onClose={handleConfirmModalClose}
                                onSubmit={handleSubmit}
                                message="Are you sure you want to Approve this order Now?"
                            />
                        )}

                        {dialogState.showRescheduleConfirmation && (
                            <ConfirmDialog
                                isOpen={dialogState.isConfirmOpen}
                                onClose={handleConfirmModalClose}
                                onSubmit={handleSubmit}
                                message="Are you sure you want to Reschedule this order for tomorrow?"
                            />
                        )}

                        {dialogState.showApproveSubmitted && (
                            <SubmitDialog
                                isOpen={dialogState.isSubmitted}
                                onClose={handleDialogClose}
                                message="Order Successfully Approved Now."
                            />
                        )}

                        {dialogState.showRescheduleSubmitted && (
                            <SubmitDialog
                                isOpen={dialogState.isSubmitted}
                                onClose={handleDialogClose}
                                message="Order Successfully Rescheduled Now."
                            />
                        )}
                    </div>
                );
            case '0': // Approved
                return (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="default"
                            size="md"
                            className="px-[2rem] border-2 border-[#194DA3] bg-yellow-500"
                            onClick={handleApprove}
                        >
                            Assign
                        </Button>
                        {dialogState.showApproveConfirmation && (
                            
                      
                            <ConfirmDialog
                                isOpen={dialogState.isConfirmOpen}
                                onClose={handleConfirmModalClose}
                                onSubmit={handleSubmit}
                                message={<DeliveryOfficerForm />}
                            />
                          
                        )}

                        {dialogState.showRescheduleConfirmation && (
                            <>
                            
                            <ConfirmDialog
                                isOpen={dialogState.isConfirmOpen}
                                onClose={handleConfirmModalClose}
                                onSubmit={handleSubmit}
                                message="Are you sure you want to Assign to this Delivery Officer?"
                            />

                            </>
                        )}

                        {dialogState.showApproveSubmitted && (
                            <SubmitDialog
                                isOpen={dialogState.isSubmitted}
                                onClose={handleDialogClose}
                                message="Successfully Assigned to a Delivery Officer."
                            />
                        )}
                    </div>
                );
            case '2': // Rescheduled
                return (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="default"
                            size="md"
                            className="px-[2rem] border-2 border-[#194DA3]"
                            onClick={handleReschedule}
                        >
                            Reschedule
                        </Button>
                        <Button
                            variant="solid"
                            size="md"
                            className="px-[2rem]"
                            onClick={handleApprove}
                        >
                            Approve
                        </Button>

                        {dialogState.showApproveConfirmation && (
                            <ConfirmDialog
                                isOpen={dialogState.isConfirmOpen}
                                onClose={handleConfirmModalClose}
                                onSubmit={handleSubmit}
                                message="Are you sure you want to Approve this order Now?"
                            />
                        )}

                        {dialogState.showRescheduleConfirmation && (
                            <ConfirmDialog
                                isOpen={dialogState.isConfirmOpen}
                                onClose={handleConfirmModalClose}
                                onSubmit={handleSubmit}
                                message="Are you sure you want to Reschedule this order for tomorrow?"
                            />
                        )}

                        {dialogState.showApproveSubmitted && (
                            <SubmitDialog
                                isOpen={dialogState.isSubmitted}
                                onClose={handleDialogClose}
                                message="Order Successfully Approved Now."
                            />
                        )}

                        {dialogState.showRescheduleSubmitted && (
                            <SubmitDialog
                                isOpen={dialogState.isSubmitted}
                                onClose={handleDialogClose}
                                message="Order Successfully Rescheduled Now."
                            />
                        )}
                    </div>
                );
            case '3': // Delivered
                return (
                    <>
                        <div className="flex justify-between">
                            <span>
                                <small className="text-xs">Delivery officer Name</small>
                                <p className="text-xs font-semibold">{orderDetails?.deliveryOfficer}</p>
                            </span>
                            <span>
                                <small className="text-xs">Officer Phone Number</small>
                                <p className="text-xs font-semibold">{orderDetails?.phoneNumber}</p>
                            </span>
                        </div>
                        <div>
                            <span>
                                <small className="text-xs">Delivery Date</small>
                                <p className="text-xs font-semibold">{orderDetails?.deliveryDate}</p>
                            </span>
                        </div>
                    </>
                );
            case '4': // Assigned
                return (
                    <div className="flex justify-center gap-2">
                        <Button
                            variant="default"
                            size="md"
                            className="px-[2rem] border-2 border-[#194DA3]"
                            onClick={onClose}
                        >
                            In Progress
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="border fixed z-1000 top-[10%] right-[15%] bg-[#fff] p-4 w-[300px]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[#194DA3] bg-[#d8e4f7] text-[10px] p-2 rounded-2xl font-semibold">
                            Refill Order Details
                        </span>
                        <span
                            className="close border border-[#f9f9f9] p-1 rounded-[50%] bg-[#f9f9f9] cursor-pointer"
                            onClick={onClose}
                        >
                            &times;
                        </span>
                    </div>

                    <div>
                        {orderDetails && (
                            loading ? (
                                <p>Loading...</p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between">
                                            <span>
                                                <small className="text-xs">Order Date</small>
                                                <p className="text-xs font-semibold">{orderDetails?.deliveryDate}</p>
                                            </span>
                                            <span className="text-right">
                                                <small className="text-xs">Order Status</small>
                                                <p className="text-xs font-semibold">{orderDetails ? getStatusLabel(orderDetails.status) : 'Unknown'}</p>
                                            </span>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-4">
                                                <span>
                                                    <small className="text-xs">Smart Device ID</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.smartDeviceId}</p>
                                                </span>
                                                <span>
                                                    <small className="text-xs">Customer Name</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.customer}</p>
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-3 text-right">
                                                <span>
                                                    <small className="text-xs">Cylinder Size</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.cylinderSize}</p>
                                                </span>
                                                <span>
                                                    <small className="text-xs">Customer Phone No.</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.phoneNumber}</p>
                                                </span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-3">
                                                <span>
                                                    <small className="text-xs">Order ID</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.id}</p>
                                                </span>
                                                <span>
                                                    <small className="text-xs">Customer Type</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.customerType}</p>
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-3 text-right">
                                                <span>
                                                    <small className="text-xs">Address</small>
                                                    <p className="text-xs font-semibold">{orderDetails?.address}</p>
                                                </span>
                                                {orderDetails?.status !== '3' && ( // Display Access Code and Approved Date if status is not Delivered
                                                    <>
                                                        <span>
                                                            <small className="text-xs">Access Code</small>
                                                            <p className="text-xs font-semibold">{orderDetails?.orderCode}</p>
                                                        </span>
                                                        <span>
                                                            <small className="text-xs">Approved Date</small>
                                                            <p className="text-xs font-semibold">{orderDetails?.approvedDate}</p>
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <hr />
                                        {renderButtons(orderDetails?.status)}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

type ConfirmDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    message: string | JSX.Element;
};

const ConfirmDialog = ({ isOpen, onClose, onSubmit, message }: ConfirmDialogProps) => (
    
    <Dialog
        preventScroll={false}
        className="justify-center flex flex-col"
        height={300}
        width={450}
        isOpen={isOpen}
        onClose={onClose}
    >
        <div className="flex flex-col gap-4 justify-center mt-[2rem]">
            <p className="text-lg text-center">{message}</p>
            <div className="flex justify-center gap-4">
                <Button
                    variant="default"
                    size="md"
                    className="px-[2rem] border-2 border-[#194DA3]"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="solid"
                    size="md"
                    className="px-[2rem]"
                    onClick={onSubmit}
                >
                    Yes
                </Button>
            </div>
        </div>
    </Dialog>
);

type SubmitDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    message: string;
};

const SubmitDialog = ({ isOpen, onClose, message }: SubmitDialogProps) => (
    <Dialog
        preventScroll={false}
        className="justify-center flex flex-col"
        contentClassName="custom-content-class flex-grow"
        height={300}
        width={400}
        isOpen={isOpen}
        onClose={onClose}
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
            <p className="text-[15px]">{message}</p>
            <Button
                variant="solid"
                size="md"
                className="w-full"
                onClick={onClose}
            >
                Okay
            </Button>
        </div>
    </Dialog>
);

export default StockOrderDetails;
