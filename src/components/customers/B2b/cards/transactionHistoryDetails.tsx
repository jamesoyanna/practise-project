type transactionHistoryDetailsProps = {
    isOpen: boolean
    onClose?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    invoiceId?: string
    transactionHistoryData: any
}

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    paid: {
        label: 'paid',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    failed: {
        label: 'failed',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    unpaid: {
        label: 'unpaid',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const getStatusClass = (status: string): string => {
    const statusColor = orderStatusColor[status.toLowerCase()]
    return statusColor ? statusColor.textClass : ''
}




const TransactionHistoryDetails = ({
    isOpen,
    onClose,

    transactionHistoryData,
}: transactionHistoryDetailsProps) => {
    if (!isOpen || !transactionHistoryData) return null

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
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between">
                                    <span>
                                        <small className="text-xs">
                                            Date Created
                                        </small>
                                        <p className="text-xs font-semibold">
                                            {transactionHistoryData.date}
                                        </p>
                                    </span>

                                    <span className="text-right">
                                        <small className="text-xs">
                                            Status
                                        </small>
                                        <p className={`text-xs font-semibold capitalize ${getStatusClass(transactionHistoryData.status)}`}>
                                    {transactionHistoryData.status}
                                </p>
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    {transactionHistoryData.customerName && (
                                        <span>
                                            <hr />
                                            <small className="text-xs">
                                                Customer Name
                                            </small>
                                            <p className="text-xs font-semibold">
                                                {
                                                    transactionHistoryData.customerName
                                                }
                                            </p>
                                        </span>
                                    )}
                                    {transactionHistoryData.customerPhoneNo && (
                                        <span>
                                            <small className="text-xs">
                                                Customer Phone No
                                            </small>
                                            <p className="text-xs font-semibold text-right">
                                                {
                                                    transactionHistoryData.customerPhoneNo
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
                                        {transactionHistoryData.totalGasQuantityDelivered && (
                                            <span>
                                                <small className="text-xs">
                                                    Total Gas Quantity Delivered
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    {
                                                        transactionHistoryData.totalGasQuantityDelivered
                                                    }
                                                </p>
                                            </span>
                                        )}
                                        {transactionHistoryData.totalGasRemnant && (
                                            <span className="text-right mt-[-5px]">
                                                <small className="text-xs">
                                                    Total Gas Remnant
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    {
                                                        transactionHistoryData.totalGasRemnant
                                                    }
                                                </p>
                                            </span>
                                        )}
                                        {transactionHistoryData.gasQuantityBillable && (
                                            <span>
                                                <small className="text-xs">
                                                    Gas Quantity Billable
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    {
                                                        transactionHistoryData.gasQuantityBillable
                                                    }
                                                </p>
                                            </span>
                                        )}
                                        {transactionHistoryData.sellingPrice && (
                                            <span className="text-right">
                                                <small className="text-xs">
                                                    Selling Price
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    {
                                                        transactionHistoryData.sellingPrice
                                                    }
                                                </p>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <hr />

                                <div className="grid grid-cols-2">
                                    <div className="space-y-3">
                                        {transactionHistoryData.gasFee && (
                                            <div>
                                                <small className="text-xs">
                                                    Gas Fee
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    N{' '}
                                                    {
                                                        transactionHistoryData.gasFee
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {transactionHistoryData.hosePrice && (
                                            <div>
                                                <small className="text-xs">
                                                    Hose Units (
                                                    {
                                                        transactionHistoryData.hoseUnits
                                                    }{' '}
                                                    yards)
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    {
                                                        transactionHistoryData.hosePrice
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3 text-right">
                                        {transactionHistoryData.regulatorPrice && (
                                            <div>
                                                <small className="text-xs">
                                                    Regulator (
                                                    {
                                                        transactionHistoryData.regulatorUnits
                                                    }{' '}
                                                    units)
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    N{' '}
                                                    {
                                                        transactionHistoryData.regulatorPrice
                                                    }
                                                </p>
                                            </div>
                                        )}

                                        {transactionHistoryData.deliveryFee && (
                                            <div>
                                                <small className="text-xs">
                                                    Delivery Fee
                                                </small>
                                                <p className="text-xs font-semibold">
                                                    N{' '}
                                                    {
                                                        transactionHistoryData.deliveryFee
                                                    }
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    {transactionHistoryData.totalAmount && (
                                        <span>
                                            <small className="text-xs">
                                                Total Amount
                                            </small>
                                            <p className="text-xs font-semibold">
                                                N{' '}
                                                {
                                                    transactionHistoryData.totalAmount
                                                }
                                            </p>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionHistoryDetails
