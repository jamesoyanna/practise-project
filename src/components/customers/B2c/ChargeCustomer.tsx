import {
    Avatar,
    Button,
    Dialog,
    Dropdown,
    Input,
    Notification,
} from '@/components/ui'
import DropdownItem from '@/components/ui/Dropdown/DropdownItem'
import { useState } from 'react'
import { BsCheckLg } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa'

const ChargeCustomer = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmOpen, setConfirmIsOpen] = useState(false)
    const [invoiceId, setInvoiceId] = useState<string>('')
    const [invoiceCharge, setInvoiceCharge] = useState<number | null>(null)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [isSubmitted, setIsSubmited] = useState(false)
    const [generateStatementModal, setGenerateStatementModal] = useState(false)
    const [chargeCustomerModal, setChargeCustomerModal] = useState(false)
    const [fromDate, setFromDate] = useState<string>('')
    const [successLabel, setSuccessLabel] = useState(false)
    const toDate = new Date().toISOString().substr(0, 10)

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const fromDateDefault = sevenDaysAgo.toISOString().substr(0, 10)

    const handleFromDateChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFromDate(event.target.value)
    }

    const handleOpenChargeCustomer = () => {
        setIsOpen(true)
        setChargeCustomerModal(true)
    }
    const handleOpenGenerateStatement = () => {
        setIsOpen(true)
        setGenerateStatementModal(true)
        setChargeCustomerModal(false)
    }

    const handleInvoiceIdChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setInvoiceId(event.target.value)

        setInvoiceCharge(9000)
    }
    const handleChargeCustomerBtn = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault() // Call preventDefault as a function
        if (invoiceId !== '' && invoiceCharge !== null) {
            setShowConfirmation(true)
            setIsOpen(false)
            setConfirmIsOpen(true)
        }
    }
    const handleConfirmModalClose = () => {
        setShowConfirmation(false)
        setConfirmIsOpen(false)
        setIsOpen(true)
    }
    const handleSubmit = () => {
        setConfirmIsOpen(false)
        setInvoiceCharge(null)
        setInvoiceId('')
        setIsSubmited(true)
        console.log('submitted')
    }
    const handleDownLoad = (
        event: React.FormEvent<HTMLButtonElement | HTMLFormElement>
    ) => {
        event.preventDefault()
        setSuccessLabel(true)
        setIsOpen(false)
    }

    return (
        <div>
            <Button
                variant="solid"
                size="md"
                className="flex gap-5 items-center "
            >
                Transaction
                <div className="w-full  mr-[-1rem]">
                    <Dropdown placement="bottom-end">
                        <DropdownItem>
                            <span onClick={handleOpenChargeCustomer}>
                                <p className="text-sm">Charge Customer</p>
                            </span>
                        </DropdownItem>
                        <DropdownItem>
                            <span onClick={handleOpenGenerateStatement}>
                                <p className="text-sm">Generate Statement</p>
                            </span>
                        </DropdownItem>
                    </Dropdown>
                </div>
            </Button>

            <form className="">
                <Dialog
                    preventScroll={false}
                    isOpen={isOpen}
                    className="justify-center flex flex-col"
                    contentClassName="custom-content-class flex-grow"
                    height={400}
                    width={350}
                    onClose={() => setIsOpen(false)}
                >
                    {chargeCustomerModal && (
                        <div className="">
                            <span className="text-[#194DA3] bg-[#d8e4f7] text-[12px] p-2 rounded-2xl font-semibold">
                                Charge Customer
                            </span>
                            <div>
                                <div className="mt-4 flex flex-col gap-4">
                                    <label className="capitalize">
                                        invoice id
                                    </label>
                                    <label className="flex ">
                                        <Input
                                            type="text"
                                            placeholder="0000"
                                            className="w-[90%]"
                                            value={invoiceId}
                                            onChange={handleInvoiceIdChange}
                                        />
                                        <button className="px-3 bg-[#194DA3] rounded-r-md text-[#fff]">
                                            GO
                                        </button>
                                    </label>
                                    {invoiceCharge !== null && (
                                        <div className="div">
                                            <label className="capitalize">
                                                Amount
                                            </label>
                                            <Input
                                                readOnly
                                                type="text"
                                                value={invoiceCharge}
                                                placeholder="Invoice Charge"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex align-bottom mt-[30%]">
                                    <Button
                                        block
                                        variant="twoTone"
                                        className="mt-auto align-baseline"
                                        onClick={handleChargeCustomerBtn}
                                    >
                                        Charge Customer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {generateStatementModal && (
                        <div>
                            <span className="text-[#194DA3] bg-[#d8e4f7] text-[12px] p-2 rounded-2xl font-semibold">
                                Generate Statement
                            </span>
                            <form className="space-y-5 pt-8 text-sm">
                                <div>
                                    <label htmlFor="fromDate">From:</label>
                                    <Input
                                        type="date"
                                        id="fromDate"
                                        value={fromDate || fromDateDefault}
                                        onChange={handleFromDateChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="toDate">To:</label>
                                    <Input
                                        disabled
                                        type="date"
                                        id="toDate"
                                        value={toDate}
                                    />
                                </div>
                                <Button
                                    variant="solid"
                                    size="md"
                                    className="w-full"
                                    onClick={handleDownLoad}
                                >
                                    Download
                                </Button>
                            </form>
                        </div>
                    )}
                </Dialog>
                {successLabel && (
                    <Notification
                        closable={true}
                        duration={3000}
                        style={{
                            position: 'fixed',
                            left: '50%',

                            zIndex: '1000',
                            color: '#fff',
                            transform: 'translateX(-50%)',
                            animation: 'slideInRight 4s ease',
                            backgroundColor: '#194da3',
                        }}
                    >
                        <div className="flex gap-3 items-center">
                            <Avatar
                                shape="circle"
                                size="sm"
                                className="bg-[#fff]"
                            >
                                <FaCheck
                                    style={{
                                        color: '#194da3',
                                    }}
                                />
                            </Avatar>
                            <p> Statement Downloaded Successfully!</p>
                        </div>
                    </Notification>
                )}

                {showConfirmation && (
                    <Dialog
                        preventScroll={false}
                        isOpen={isConfirmOpen}
                        className="justify-center flex flex-col"
                        contentClassName="custom-content-class flex-grow"
                        height={300}
                        width={300}
                        onClose={() => setConfirmIsOpen(false)}
                    >
                        <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                            <p>
                                Are you sure you want to charge this customer?
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="px-[2rem] border-2 border-[#194DA3]"
                                    onClick={handleConfirmModalClose}
                                >
                                    No
                                </Button>
                                <Button
                                    variant="solid"
                                    size="sm"
                                    className="px-[2rem]"
                                    onClick={handleSubmit}
                                >
                                    Yes
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                )}
            </form>
            {isSubmitted && (
                <div>
                    <Dialog
                        preventScroll={false}
                        isOpen={isSubmitted}
                        className="justify-center flex flex-col"
                        contentClassName="custom-content-class flex-grow"
                        height={200}
                        width={300}
                        onClose={() => setIsSubmited(false)}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-center">
                                <Avatar
                                    icon={<BsCheckLg />}
                                    shape="circle"
                                    className="bg-[#194DA3] text-center"
                                />
                            </span>
                            <p className="text-[11px]">
                                Wow! You’ve successfully debited this customer.
                            </p>
                            <Button
                                variant="solid"
                                size="sm"
                                className="w-full"
                                onClick={() => setIsSubmited(false)}
                            >
                                Okay
                            </Button>
                        </div>
                    </Dialog>
                </div>
            )}
        </div>
    )
}

export default ChargeCustomer
