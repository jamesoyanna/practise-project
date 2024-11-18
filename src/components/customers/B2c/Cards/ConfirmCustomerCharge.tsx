import { Button, Dialog } from '@/components/ui'
import React, { useState } from 'react'

interface ConfirmCustomerChargeProps {
    onClose: () => void
}

const ConfirmCustomerCharge = (
    
) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog
        preventScroll={false}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="justify-center flex flex-col"
        contentClassName="custom-content-class flex-grow"
        height={400}
        width={300}
    >
         <div>
            <p>Are you sure you want to charge this customer?</p>
            <div className="flex justify-between">
                <Button variant="plain" size="sm">
                    No
                </Button>
                <Button variant="solid" size="sm">
                    Yes
                </Button>
            </div>
        </div>
    </Dialog>
       
    )
}

export default ConfirmCustomerCharge