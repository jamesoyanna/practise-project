import {
    Avatar,
    Button,
    Dialog,
   
} from '@/components/ui'
import { useState } from 'react'
import AddOnAssetTable from './Cards/AddOnAssetTable'
import { BsCheckLg } from 'react-icons/bs'


const AddOnAsset = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(false)
    const [successModal, setSuccessModal] = useState(false) 

    const closeModal = ()=>{
        setIsOpen(false)
        setConfirmationModal(true)    }

        const handleConfirmModalClose=()=>{
            setConfirmationModal(false)
            setIsOpen(true)
        }

        const handlePostAddAsset = ()=>{
            //dispatch here
            setConfirmationModal(false)
            setSuccessModal(true)

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
                    className="justify-center overflow-hidden mb-6"
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
                        <AddOnAssetTable onClick={closeModal}/>
                    </div>
                    
                </Dialog>
            </div>
            {
                confirmationModal && (
                    <div className=" absolute z-50 right-[40%] top-[10%] flex flex-col items-center gap-3 border-2 border-[#fffcfc] shadow-2xl bg-[#fff] py-[2rem] px-4 rounded-lg">
                    <p>
                    Are you sure you want to debit this customer?
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
                            onClick={handlePostAddAsset}
                        >
                            Yes
                        </Button>
                    </div>
                </div>
                )
            }

            {
                successModal && (
                    <div className=" absolute z-50 right-[40%] top-[10%] flex flex-col items-center gap-3 border-[#fff] shadow-2xl bg-[#fff] py-[2rem] px-4 rounded-lg">
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
                        onClick={() => setSuccessModal(false)}
                    >
                        Okay
                    </Button>
                </div>
                )
            }
        </div>
    )
}

export default AddOnAsset
