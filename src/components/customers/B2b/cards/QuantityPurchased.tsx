// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Button, Card } from "@/components/ui"
import {
    getCustomersB2bDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../../store/slices/customers/b2bCustomerDetailsSlice'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

type CustomerDetailsDropdown = {
    businessName?: string
    customerId?: string
    phoneNumber?: string
    address?: string
    dateOfOnboarding?: string
}

const QuantityPurchased = ({  customerId }:CustomerDetailsDropdown) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                console.log('customerId :', customerId)

                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2bDetails(customerId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])

    const testData = useAppSelector((state) => state)

    const userDetails =  testData.b2bCustomerDetails.data.setCustomerB2bDetails
    
   
  return (
    <div className="flex flex-col gap-5">
                <div className="flex items-center w-full justify-between">
                    <div
                        color="#000"
                        className=" bg-[#d8e4f7] rounded-l border px-4 py-2 w-[90%]"
                    >
                        <p className="text-[#000] text-[10px]
                        md:text-xs font-semibold ">
                            Virtual Wallet Balance: {userDetails?.virtualWalletBalance}
                        </p>
                    </div>
                    <Button
                        color="#fff"
                        variant="solid"
                        size="sm"
                        // disabled={true}
                        loading={false}
                        className="bg-[#194DA3] ml-[-5px]"
                        
                        onClick={() => {
                            navigate(`/customers/b2b/${userDetails?.customerId}/wallet-history`);
                        }}
                    >
                        Wallet History
                    </Button>
                </div>
                <Card
                    className="bg-[#f9f9f9] h-[10.9rem]"
                    clickable={true}
                    onClick={(e) => console.log('Card clicked!', e)}
                >
                     <div className="flex items-center justify-between pb-4">
                        <div className="">
                        <h6 className="">{userDetails?.totalGasQuantityPurchased}</h6>
                        <small>Total Gas Quantity Purchased</small>
                        </div>
                      
                        <div className="">
                                <h6>NGN{userDetails?.totalGasAmount}</h6>
                                <small>Total Gas Amount</small>

                        </div>
                    </div>
                    <hr className='' />
                    <div className="flex items-center justify-between pt-4">
                        <div className="">
                        <h6 className="">NGN{userDetails?.totalTransactionAmount}</h6>
                        <small>Total Transactional Amount</small>
                        </div>
                      
                        <div className="">
                                <h6 className='text-[#ff0000]'>{userDetails?.debt}</h6>
                                <small>Debt</small>
                           
                        </div>
                    </div>
                </Card>
            </div>
  )
}

export default QuantityPurchased