import { useEffect } from 'react'
import reducer,{
    getOrderDetails,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders/details'
import { Button } from '@/components/ui'
// import { Button, Dialog, Avatar } from '@/components/ui'
// import { BsCheckLg } from 'react-icons/bs'
import { injectReducer } from '@/store'

injectReducer('orderDetails', reducer)

type OrderDetailsProps = {
    isOpen: boolean
    onClose?: () => void
    orderCode?: string
}

const OrderDetails = ({ orderCode, isOpen, onClose }: OrderDetailsProps) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (typeof orderCode === 'string') {
            dispatch(getOrderDetails(orderCode)).catch((error) => {
                console.error('Error fetching customer details:', error)
            })
        }
    }, [orderCode, dispatch])

    const loading = useAppSelector((state) => state.orderDetails.data.loading)
    const orderDetails = useAppSelector(
        (state) => state.orderDetails.data.orderDetailsList
    )

    const getStatusLabel = (status2: string): JSX.Element => {
        const statusLabels: Record<
            string,
            { text: string; className: string }
        > = {
            0: { text: 'Approved', className: 'text-emerald-500' },
            1: { text: 'Pending', className: 'text-red-500' },
            2: { text: 'Rescheduled', className: 'text-blue-500' },
            3: { text: 'Delivered', className: 'text-green-500' },
            4: { text: 'Assigned', className: 'text-yellow-500' },
        }

        const { text, className } = statusLabels[status2] || {
            text: 'Unknown',
            className: 'text-red-500',
        }
        return <span className={className}>{text}</span>
    }

    const renderButtons = (status2: string | undefined) => {
        if (status2 === '3') {
            return (
                <div className="flex gap-2">
                    <span>
                        <small className="text-xs">Delivery Date</small>
                        <p className="text-xs font-semibold">
                            {orderDetails?.approvedDate}
                        </p>
                    </span>
                </div>
            )
        }
        if (status2 === '4') {
            return (
                <div className="flex justify-center gap-2">
                    <Button
                        variant="default"
                        size="md"
                        className="w-full border-[#194DA3]"
                        onClick={onClose}
                    >
                        In Progress
                    </Button>
                </div>
            )
        }
        return null
    }

    if (!isOpen) return null

    return (
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
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-4">
                                        <span>
                                            <small className="text-xs">
                                                Order Date
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.deliveryDate}
                                            </p>
                                        </span>
                                        <span>
                                            <small className="text-xs">
                                                Order ID
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.customer}
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3 text-right">
                                        <span>
                                            <small className="text-xs">
                                                Order Status
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails
                                                    ? getStatusLabel(
                                                          orderDetails.status2
                                                      )
                                                    : 'Unknown'}
                                            </p>
                                        </span>
                                        <span>
                                            <small className="text-xs">
                                                Hub ID
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.hubId}
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-4">
                                        <span>
                                            <small className="text-xs">
                                                Hub Name
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.hubName}
                                            </p>
                                        </span>
                                        <span>
                                            <small className="text-xs">
                                                Hub Manager
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.hubManager}
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3 text-right">
                                        <span>
                                            <small className="text-xs">
                                                Hub Address
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.hubAddress}
                                            </p>
                                        </span>
                                        <span>
                                            <small className="text-xs">
                                                Manager Phone No.
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.phoneNumber}
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-4">
                                        <span>
                                            <small className="text-xs">
                                                Filled 12kg Cylinders
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.cylinderSize}
                                            </p>
                                        </span>
                                        <span>
                                            <small className="text-xs">
                                                Filled 50kg Cylinders
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.cylinderSize}
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3 text-right">
                                        <span>
                                            <small className="text-xs">
                                                Filled 25kg Cylinders
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.cylinderSize}
                                            </p>
                                        </span>
                                        <span>
                                            <small className="text-xs">
                                                Smart Device
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.smartDeviceId}
                                            </p>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.smartDeviceId}
                                            </p>
                                        </span>
                                    </div>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <div className="flex flex-col gap-3">
                                        <span>
                                            <small className="text-xs">
                                                Logistic Officer Name
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.deliveryOfficer}
                                            </p>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-3 text-right">
                                        <span>
                                            <small className="text-xs">
                                                Officer Phone No.
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {orderDetails?.phoneNumber}
                                            </p>
                                        </span>
                                    </div>
                                </div>

                                {renderButtons(orderDetails?.status2)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

// type ConfirmDialogProps = {
//     isOpen: boolean
//     onClose: () => void
//     onSubmit: () => void
//     message: string | JSX.Element
// }

// const ConfirmDialog = ({
//     isOpen,
//     onClose,
//     onSubmit,
//     message,
// }: ConfirmDialogProps) => (
//     <Dialog
//         preventScroll={false}
//         className="justify-center flex flex-col"
//         height={300}
//         width={450}
//         isOpen={isOpen}
//         onClose={onClose}
//     >
//         <div className="flex flex-col gap-4 justify-center mt-[2rem]">
//             <p className="text-lg text-center">{message}</p>
//             <div className="flex justify-center gap-4">
//                 <Button
//                     variant="default"
//                     size="md"
//                     className="px-[2rem] border-2 border-[#194DA3]"
//                     onClick={onClose}
//                 >
//                     Cancel
//                 </Button>
//                 <Button
//                     variant="solid"
//                     size="md"
//                     className="px-[2rem]"
//                     onClick={onSubmit}
//                 >
//                     Yes
//                 </Button>
//             </div>
//         </div>
//     </Dialog>
// )

// type SubmitDialogProps = {
//     isOpen: boolean
//     onClose: () => void
//     message: string
// }

// const SubmitDialog = ({ isOpen, onClose, message }: SubmitDialogProps) => (
//     <Dialog
//         preventScroll={false}
//         className="justify-center flex flex-col"
//         contentClassName="custom-content-class flex-grow"
//         height={300}
//         width={400}
//         isOpen={isOpen}
//         onClose={onClose}
//     >
//         <div className="flex flex-col items-center gap-3">
//             <span className="text-center">
//                 <Avatar
//                     icon={<BsCheckLg />}
//                     shape="circle"
//                     size="lg"
//                     className="bg-[#194DA3] text-center"
//                 />
//             </span>
//             <p className="text-[15px]">{message}</p>
//             <Button
//                 variant="solid"
//                 size="md"
//                 className="w-full"
//                 onClick={onClose}
//             >
//                 Okay
//             </Button>
//         </div>
//     </Dialog>
// )

export default OrderDetails
