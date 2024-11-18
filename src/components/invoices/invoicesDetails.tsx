/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'

import { injectReducer } from '@/store'
import reducer, {
    getDueInvoicesDetails,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/dueInvoices/details'

type InvoiceDetailsProps = {
    isOpen: boolean
    onClose?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    invoiceId?: string
}

injectReducer('dueInvoicesDetailsList', reducer)

const DueInvoicedetails = ({
    isOpen,
    onClose,
    invoiceId,
}: InvoiceDetailsProps) => {
    if (!isOpen) return null
    const dispatch = useAppDispatch()
    const [details, setDetails] = useState(true)

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (typeof invoiceId === 'string') {
                    dispatch(getDueInvoicesDetails(invoiceId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [invoiceId, dispatch])

    const testdata = useAppSelector((state) => state)
    const isCustomerDetailsLoading =
        testdata.dueInvoicesDetailsList.data.loading

    const dueInvoiceDetails =
        testdata.dueInvoicesDetailsList.data.dueInvoicesList
    console.log('mydata :', dueInvoiceDetails)

    return (
        <>
          <div className="border fixed z-1000 top-[10%] right-[15%] bg-[#fff] p-4 w-[350px] shadow-2xl">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[#194DA3] bg-[#d8e4f7] text-[10px] p-1 rounded-2xl font-semibold">
                                Gas Delivery Invoice
                            </span>
                            <span
                                className="close border border-[#f9f9f9] p-1 rounded-[50%] bg-[#f9f9f9] cursor-pointer"
                                onClick={onClose}
                            >
                                &times;
                            </span>
                        </div>
                        <div>
                            {details &&
                                (isCustomerDetailsLoading ? (
                                    <p className='text-[#194DA3] font-semibold'>Loading...</p>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex justify-between">
                                                <span>
                                                    <small className="text-xs">
                                                        Scheduled Onboarding
                                                        Date
                                                    </small>
                                                    <p className="text-xs font-semibold">
                                                        {dueInvoiceDetails.date}
                                                    </p>
                                                </span>

                                                <span className="text-right">
                                                    <small className="text-xs">
                                                        Status
                                                    </small>
                                                    <p className="text-xs font-semibold text-[#ff0000]">
                                                        {
                                                            dueInvoiceDetails.status
                                                        }
                                                    </p>
                                                </span>
                                            </div>
                                            <hr />
                                            <div className="flex justify-between">
                                                {dueInvoiceDetails.customerName && (
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Name
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                dueInvoiceDetails.customerName
                                                            }
                                                        </p>
                                                    </span>
                                                )}
                                                {dueInvoiceDetails.customerPhoneNo && (
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Phone No
                                                        </small>
                                                        <p className="text-xs font-semibold text-right">
                                                            {
                                                                dueInvoiceDetails.customerPhoneNo
                                                            }
                                                        </p>
                                                    </span>
                                                )}
                                            </div>
                                            <hr />
                                            <div>
                                                <p className="font-semibold mb-2 text-[#252424]">
                                                    Transactions
                                                </p>
                                                <div className="grid grid-cols-2 space-y-3 items-start">
                                                    {dueInvoiceDetails.totalGasQuantityDelivered && (
                                                        <span>
                                                            <small className="text-xs">
                                                                Total Gas
                                                                Quantity
                                                                Delivered
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                {
                                                                    dueInvoiceDetails.totalGasQuantityDelivered
                                                                }
                                                            </p>
                                                        </span>
                                                    )}
                                                    {dueInvoiceDetails.totalGasRemnant && (
                                                        <span className="text-right mt-[-5px]">
                                                            <small className="text-xs">
                                                                Total Gas
                                                                Remnant
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                {
                                                                    dueInvoiceDetails.totalGasRemnant
                                                                }
                                                            </p>
                                                        </span>
                                                    )}
                                                    {dueInvoiceDetails.gasQuantityBillable && (
                                                        <span>
                                                            <small className="text-xs">
                                                                Gas Quantity
                                                                Billable
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                {
                                                                    dueInvoiceDetails.gasQuantityBillable
                                                                }
                                                            </p>
                                                        </span>
                                                    )}
                                                    {dueInvoiceDetails.sellingPrice && (
                                                        <span className="text-right">
                                                            <small className="text-xs">
                                                                Selling Price
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                {
                                                                    dueInvoiceDetails.sellingPrice
                                                                }
                                                            </p>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <hr />

                                            <div className="grid grid-cols-2">
                                                <div className='space-y-3'>
                                                    {dueInvoiceDetails.gasFee && (
                                                        <div>
                                                            <small className="text-xs">
                                                                Gas Fee
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                N{' '}
                                                                {
                                                                    dueInvoiceDetails.gasFee
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {dueInvoiceDetails.hosePrice && (
                                                        <div>
                                                            <small className="text-xs">
                                                                Hose Units (
                                                                {
                                                                    dueInvoiceDetails.hoseUnits
                                                                }{' '}
                                                                yards)
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                {
                                                                    dueInvoiceDetails.hosePrice
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                </div>

                                                <div className="space-y-3 text-right">
                                                    {dueInvoiceDetails.regulatorPrice && (
                                                        <div>
                                                            <small className="text-xs">
                                                                Regulator (
                                                                {
                                                                    dueInvoiceDetails.regulatorUnits
                                                                }{' '}
                                                                units)
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                N{' '}
                                                                {
                                                                    dueInvoiceDetails.regulatorPrice
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                    {dueInvoiceDetails.deliveryFee && (
                                                        <div>
                                                            <small className="text-xs">
                                                                Delivery Fee
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                N{' '}
                                                                {
                                                                    dueInvoiceDetails.deliveryFee
                                                                }
                                                            </p>
                                                        </div>
                                                    )}

                                                </div>
                                            </div>

                                            <div>
                                                {dueInvoiceDetails.totalAmount && (
                                                    <span>
                                                        <small className="text-xs">
                                                            Total Amount
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            N{' '}
                                                            {
                                                                dueInvoiceDetails.totalAmount
                                                            }
                                                        </p>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
         
        </>
    )
}

export default DueInvoicedetails
