// import Necessary components
import { useState } from 'react'
import { Button, Dialog, Avatar } from '@/components/ui'
import { HiPlusCircle } from 'react-icons/hi'
import { BsCheckLg } from 'react-icons/bs'
import Input from '@/components/ui/Input'

// Component for the expense form
const ExpenseDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [isConfirmOpen, setConfirmIsOpen] = useState(false)
    const [isSubmitted, setIsSubmited] = useState(false)

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')

    const handleCreateExpense = () => {
        setShowConfirmation(true)
        setIsOpen(false)
        setConfirmIsOpen(true)
    }

    const handleConfirmModalClose = () => {
        setShowConfirmation(false)
        setConfirmIsOpen(false)
        setIsOpen(true)
    }
    const handleSubmit = () => {
        setConfirmIsOpen(false)
        setIsSubmited(true)
        console.log('submitted')
    }

    const handleDescriptionChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDescription(event.target.value)
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value)
    }

    return (
        <>
            <Button
                block
                variant="solid"
                size="md"
                icon={<HiPlusCircle />}
                onClick={() => setIsOpen(true)}
            >
                Create Expense
            </Button>
            <form>
                <Dialog
                    preventScroll={false}
                    className="justify-center flex flex-col"
                    contentClassName="custom-content-class flex-grow"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <div>
                        <div>
                            <h6 className="text-blue-800">
                                {' '}
                                <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                                    Create Expense
                                </span>
                            </h6>
                            <div className="mt-4 flex flex-col gap-4">
                                <label>Description</label>
                                <div className="flex">
                                    <Input
                                        type="text"
                                        placeholder="Description"
                                        className="w-[100%]"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    />
                                </div>
                                <label>Amount</label>
                                <div className="flex">
                                    <Input
                                        type="text"
                                        placeholder="Amount"
                                        className="w-[100%]"
                                        value={amount}
                                        onChange={handleAmountChange}
                                    />
                                </div>
                            </div>
                            {/* Button to submit expense form */}
                            <Button
                                block
                                variant="solid"
                                type="submit"
                                className="mt-[10%]"
                                onClick={handleCreateExpense}
                            >
                                Create Expense
                            </Button>
                        </div>
                    </div>
                </Dialog>
                {showConfirmation && (
                    <Dialog
                        preventScroll={false}
                        className="justify-center flex flex-col"
                        height={300}
                        width={450}
                        isOpen={isConfirmOpen}
                        onClose={() => setConfirmIsOpen(false)}
                    >
                        <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                            <p className="text-lg text-center">
                                You are about to create an expense
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button
                                    variant="default"
                                    size="md"
                                    className="px-[2rem] border-2 border-[#194DA3]"
                                    onClick={handleConfirmModalClose}
                                >
                                    No
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
            </form>
            {isSubmitted && (
                <div>
                    <Dialog
                        preventScroll={false}
                        className="justify-center flex flex-col"
                        contentClassName="custom-content-class flex-grow"
                        height={300}
                        width={400}
                        isOpen={isSubmitted}
                        onClose={() => setIsSubmited(false)}
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
                                Wow! You’ve successfully created an expense.
                            </p>
                            <Button
                                variant="solid"
                                size="md"
                                className="w-full"
                                onClick={() => setIsSubmited(false)}
                            >
                                Okay
                            </Button>
                        </div>
                    </Dialog>
                </div>
            )}
        </>
    )
}

export default ExpenseDialog;
