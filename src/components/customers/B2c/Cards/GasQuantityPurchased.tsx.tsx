// @ts-nocheck
import { Button, Card } from "@/components/ui"
import {
    getCustomersB2cDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../../store/slices/customers/customerDetails'
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

type CustomerDetailsDropdown = {
    customerName?: string
    customerId?: string
    phoneNumber?: string
    address?: string
    dateOfOnboarding?: string
}

const GasQuantityPurchased = ({  customerId }:CustomerDetailsDropdown) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const param = useParams(customerId)

    useEffect(() => {
    const fetchCustomerDetails = async () => {
        try {
            console.log("customerId :", customerId);
            
            if (typeof customerId === 'string') { 
                dispatch(getCustomersB2cDetails(customerId));
                console.log("jaybee");
                
            }
        } catch (error) {
            console.error('Error fetching customer details:', error);
        }
    };

    fetchCustomerDetails();
}, [customerId, dispatch]);

    const testData = useAppSelector((state) => state)
    console.log("testData :", testData);
    
    const userDetails = useAppSelector ((state)=> state.b2cCustomerDetails.data.setCustomerDetails)
    console.log("userDetails :", userDetails);
    console.log("userDetails type:", typeof userDetails); // Log the type
    console.log("userDetails structure:", userDetails);

    const loading = useAppSelector((state)=>state.b2cCustomerDetails.data.setCustomerDetails)
    console.log("loading :", loading);
  return (
    <div className="flex flex-col gap-5">
                <div className="flex items-center w-full justify-between">
                    <div
                        color="#000"
                        className=" bg-[#d8e4f7] rounded-l border px-4 py-2 w-[90%]"
                    >
                        <p className="text-[#000] text-[10px]
                        md:text-xs font-semibold ">
                            {/* @ts-ignore */}
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
                            navigate(`/customers/b2c/${userDetails?.customerId}/wallet-history`);
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
                            {/* @ts-ignore */}
                        <h6 className="">{userDetails?.totalGasQuantityPurchased}</h6>
                        <small>Total Gas Quantity Purchased</small>
                        </div>
                      
                        <div className="">
                            {/* @ts-ignore */}
                                <h6>NGN{userDetails?.totalGasAmount}</h6>
                                <small>Total Gas Amount</small>

                        </div>
                    </div>
                    <hr className='' />
                    <div className="flex items-center justify-between pt-4">
                        <div className="">
                            {/* @ts-ignore */}
                        <h6 className="">NGN{userDetails?.totalTransactionAmount}</h6>
                        <small>Total Transactional Amount</small>
                        </div>
                      
                        <div className="">
                            {/* @ts-ignore */}
                                <h6 className='text-[#ff0000]'>{userDetails?.debt}</h6>
                                <small>Debt</small>
                           
                        </div>
                    </div>
                </Card>
            </div>
  )
}

export default GasQuantityPurchased