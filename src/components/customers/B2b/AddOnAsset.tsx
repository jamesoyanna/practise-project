import { Avatar, Button, Dialog } from '@/components/ui'
import { useState } from 'react'
import AddOnAssetTable from './cards/AddOnAssetsTable'
import { BsCheckLg } from 'react-icons/bs'

const AddOnAsset = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [isConfirmOpen, setConfirmIsOpen] = useState(false)
    const [isSubmitted, setIsSubmited] = useState(false)

    const handleOnboardBtn = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault() 

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

    return (
        <div>
            <Button
                color="#fff"
                variant="solid"
                size="sm"
                disabled={false}
                loading={false}
                className="bg-[#194DA3]"
                onClick={() => setIsOpen(true)}
            >
                Add Asset
            </Button>
            <div className="">
                <Dialog
                    preventScroll={false}
                    className="justify-center overflow-hidden"
                    contentClassName="custom-content-class"
                    height={550}
                    width={400}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <span className="text-[#194DA3] bg-[#d8e4f7] text-[12px] p-2 rounded-2xl font-semibold">
                        Add Asset
                    </span>
                    <div className="no-scrollbar h-full overflow-y-auto pb-[2rem]">
                        <AddOnAssetTable onClick={handleOnboardBtn} />
                    </div>
                </Dialog>
                {showConfirmation && (
                    <Dialog
                        preventScroll={false}
                        className="justify-center flex flex-col"
                        contentClassName="custom-content-class flex-grow"
                        height={300}
                        width={300}
                        isOpen={isConfirmOpen}
                        onClose={() => setConfirmIsOpen(false)}
                    >
                        <span className="text-[#194DA3] bg-[#d8e4f7] text-[12px] p-2 rounded-2xl font-semibold">
                            Add-on Asset
                        </span>
                        <div className="flex flex-col gap-4 justify-center mt-[2rem]">
                            <p>
                                Are you sure you want to onboard asset(s) to
                                this customer?
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
            </div>
            {isSubmitted && (
                <div>
                    <Dialog
                        preventScroll={false}
                        className="justify-center flex flex-col"
                        contentClassName="custom-content-class flex-grow"
                        height={200}
                        width={300}
                        isOpen={isSubmitted}
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
                            <p className="text-sm">
                                Add-on Asset Process Completed!
                            </p>
                            <p className="text-[11px] text-center">
                                Go to “Onboarding” page to assign to a Delivery
                                Officer
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

export default AddOnAsset
