/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import reducer, {
    getRejectedOrderDetails,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders/rejectedOrderDetails'
import { injectReducer } from '@/store'

type RejectedOrderDetailsProps = {
    isOpen: boolean
    onClose?: () => void
    orderCode?: string
}

injectReducer('rejectedOrderDetails', reducer)

const RejectedStockOrderDetails = ({
    orderCode,
    isOpen,
    onClose,
}: RejectedOrderDetailsProps) => {
    if (!isOpen) return null
    const dispatch = useAppDispatch()
    const orderModal = true

    useEffect(() => {
        const fetchRejectedOrderDetails = async () => {
            try {
                if (typeof orderCode === 'string') {
                    dispatch(getRejectedOrderDetails(orderCode))
                }
            } catch (error) {
                console.error('Error fetching rejected order details:', error)
            }
        }

        fetchRejectedOrderDetails()
    }, [orderCode, dispatch])

    const loading = useAppSelector(
        (state) => state.rejectedOrderDetails.data.loading
    )
    const rejectedOrderDetails = useAppSelector(
        (state) => state.rejectedOrderDetails.data.rejectedOrderDetails
    )

    return (
        <>
            {orderModal && (
                <div className="border fixed  z-1000 top-[10%] right-[15%] bg-[#fff] p-4 w-[300px]">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between ">
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
                            {rejectedOrderDetails &&
                                (loading ? (
                                    <>
                                        <p>loading...</p>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-4">
                                            <div className="flex  justify-between">
                                                <span>
                                                    <small className="text-xs">
                                                        Order Date
                                                    </small>
                                                    <p className="text-xs font-semibold">
                                                        July 5, 2024
                                                    </p>
                                                </span>
                                                <span className="text-right">
                                                    <small className="text-xs">
                                                        Order Status
                                                    </small>
                                                    <p className="text-xs font-semibold">
                                                        {
                                                            rejectedOrderDetails?.status
                                                        }
                                                    </p>
                                                </span>
                                            </div>
                                            <hr />
                                            <div className="flex  justify-between">
                                                <div className="flex flex-col gap-4">
                                                    <span>
                                                        <small className="text-xs">
                                                            Smart Device ID
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.smartDeviceId
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Name
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.customer
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Auxiliary
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.auxiliary
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-3 text-right">
                                                    <span>
                                                        <small className="text-xs">
                                                            Cylinder Size
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.cylinderSize
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Phone No.
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.phoneNumber
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Auxiliary Phone No.
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.phoneNumber
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="flex  justify-between">
                                                <div className="flex flex-col gap-3">
                                                    <span>
                                                        <small className="text-xs">
                                                            Order ID
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.id
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Delivery Officer
                                                            Name
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.deliveryOfficer
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Type
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.customerType
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-3 text-right">
                                                    <span>
                                                        <small className="text-xs">
                                                            Address
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.address
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Officer Phone Number
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.phoneNumber
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Delivery Date
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                rejectedOrderDetails?.deliveryDate
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default RejectedStockOrderDetails
