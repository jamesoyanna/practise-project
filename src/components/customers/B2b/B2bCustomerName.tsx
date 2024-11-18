import { Avatar, Button, Dialog, Dropdown, Select } from '@/components/ui'
import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { useEffect, useState } from 'react'
import { GiNotebook } from 'react-icons/gi'
import { MdDeviceHub, MdOutlinePayment, MdLocationOn } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import {
    Customer,
    getCustomersB2bDetails,
    putCustomerData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/b2bCustomerDetailsSlice'
import { BsCheckLg } from 'react-icons/bs'

type CustomerDetailsDropdown = {
    businessName?: any
    customerId?: string
    phoneNumber?: string
    address?: string
    invoicePeriod?: number
    currentSellingPrice?: number
    customerTier?: string
    dateOnboarded?: string
    hub?: string
}

const customerTierOptions = [
    { value: 'Tier 1', label: 'Tier 1' },
    { value: 'Tier 2', label: 'Tier 2' },
    { value: 'Tier 3', label: 'Tier 3' },
]

const B2bCustomerName = ({ customerId }: CustomerDetailsDropdown) => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [customerTier, setCustomerTier] = useState<string | any>()
    const [newInvoicePeriod, setNewInvoicePeriod] = useState<number | any>()
    const [confirmationMessage, setConfirmationMessage] = useState(false)
    const testData = useAppSelector((state) => state)
    const userDetails = testData.b2bCustomerDetails.data.setCustomerB2bDetails

    const authority = testData.auth.user.authority
    console.log('auth :', authority)

    const [edittedCustomerData, setEdittedCustomerData] =
        useState<Customer>(userDetails)
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                console.log('customerId :', customerId)

                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2bDetails(customerId))
                    setEdittedCustomerData(userDetails)
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])

    const handleOpenDialog = () => {
        setIsOpen(true)
    }
    const handleSubmitPutRequest = async (
        event: React.FormEvent<HTMLButtonElement | HTMLFormElement>
    ) => {
        event.preventDefault()
        try {
            if (
                customerTier !== undefined &&
                newInvoicePeriod !== undefined &&
                userDetails?.customerId
            ) {
                console.log('Attempting to call put request')
                const updatedCustomerData = {
                    ...userDetails,
                    customerTier,
                    invoicePeriod: newInvoicePeriod,
                }
                const action = await dispatch(
                    putCustomerData({
                        customerId: userDetails.customerId,
                        updatedCustomerData,
                    })
                )
                const updatedData = action.payload as Customer
                console.log('Settings successfully updated')
                setIsOpen(false)
                setConfirmationMessage(true)
                setEdittedCustomerData(updatedData)
            } else {
                console.error('customerId or other required data is missing')
            }
        } catch (error) {
            console.error('Error updating settings:', error)
        }
    }

    return (
        <div>
            <div className="flex gap-3 md:gap-[2rem] items-center">
                <h4 className="text-sm md:text-base capitalize ">
                    {userDetails?.businessName}
                </h4>
                <small className="bg-[#f9f9f9] p-1">
                    {userDetails?.customerTier}
                </small>

                <Dropdown
                    menuStyle={{ minWidth: 300, alignItems: 'start' }}
                    placement="bottom-end"
                    trigger="click"
                >
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar icon={<FaUser />} size="sm" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    Customer ID
                                </div>
                                <div className="text-xs">
                                    {userDetails?.customerId}
                                </div>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar icon={<FaPhoneAlt />} size="sm" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    Phone Number
                                </div>
                                <div className="text-xs">
                                    {userDetails.phoneNumber}
                                </div>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar icon={<MdLocationOn />} size="sm" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    Address
                                </div>
                                <div className="text-xs">
                                    {userDetails.address}
                                </div>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar icon={<IoIosCheckmarkCircle />} size="sm" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    Date Onboarded
                                </div>
                                <div className="text-xs">
                                    {userDetails?.dateOnboarded}
                                </div>
                            </div>
                        </div>
                    </Dropdown.Item>
                    {authority?.includes('is_super_admin') && (
                        <Dropdown.Item variant="header">
                            <div className="py-2 px-3 flex items-center gap-2">
                                <Avatar icon={<MdDeviceHub />} size="sm" />
                                <div>
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                        Hub
                                    </div>
                                    <div className="text-xs">
                                        {userDetails.hub}
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar icon={<MdOutlinePayment />} size="sm" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    Today’s Selling Price
                                </div>
                                <div className="text-xs">
                                    N {userDetails.currentSellingPrice} /kg
                                </div>
                            </div>
                            <div className="ml-[3rem] items-end cursor-pointer">
                                {authority?.includes('account_officer') && (
                                    <>
                                        <Avatar
                                            icon={<CiEdit />}
                                            size="sm"
                                            className="bg-[#194DA3] hover:bg-[#5996f9]"
                                            shape="circle"
                                            onClick={handleOpenDialog}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item variant="header">
                        <div className="py-2 px-3 flex items-center gap-2">
                            <Avatar icon={<GiNotebook />} size="sm" />
                            <div>
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                    Invoice Period Days
                                </div>
                                <div className="text-xs">
                                    {' '}
                                    Every {userDetails.invoicePeriod} days
                                </div>
                            </div>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            {isOpen && (
                <>
                    <Dialog
                        preventScroll={false}
                        className="justify-center "
                        contentClassName="custom-content-class"
                        height={400}
                        width={400}
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                    >
                        <span className="text-[#194DA3] bg-[#d8e4f7] text-[12px] p-2 rounded-2xl font-semibold">
                            Edit Tier & Invoice Period Days
                        </span>
                        <form className="flex flex-col gap-[8rem] mt-8">
                            <div className="flex flex-col gap-6">
                                <Select
                                    value={edittedCustomerData.customerTier}
                                    options={customerTierOptions}
                                    defaultOptions={true}
                                    placeholder={userDetails?.customerTier}
                                    onChange={(
                                        selectedOption: string | any
                                    ) => {
                                        if (selectedOption) {
                                            setCustomerTier(
                                                selectedOption.value
                                            )
                                            console.log(
                                                'Selected customer tier:',
                                                selectedOption.value
                                            )
                                        }
                                    }}
                                />
                                <Select
                                    value={edittedCustomerData.invoicePeriod}
                                    options={[1, 2, 3, 4, 5, 6, 7].map(
                                        (value) => ({
                                            value: value,
                                            label:
                                                value === 1
                                                    ? `Every ${value} day`
                                                    : `Every ${value} days`,
                                        })
                                    )}
                                    defaultOptions={true}
                                    placeholder={`Every ${userDetails?.invoicePeriod} days`}
                                    onChange={(
                                        selectedOption: number | any
                                    ) => {
                                        setNewInvoicePeriod(
                                            selectedOption.value
                                        )
                                        console.log(
                                            'Selected invoice period:',
                                            selectedOption.value
                                        )
                                    }}
                                />
                            </div>

                            <div className="">
                                <Button
                                    loading={false}
                                    variant="solid"
                                    className=" align-baseline bg-[#194DA3] w-full "
                                    onClick={handleSubmitPutRequest}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </form>
                    </Dialog>
                </>
            )}
            {confirmationMessage && (
                <>
                    <div className="border bg-[#fff] absolute  top-[10%]  right-[40%] pt-8 pb-4 px-2 w-[300px] z-30 shadow-2xl rounded-xl">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center justify-center">
                                <Avatar
                                    icon={<BsCheckLg />}
                                    shape="circle"
                                    className="bg-[#194DA3] text-center"
                                />
                            </div>

                            <p className=" text-xs text-center">
                                Tier & Invoice Period Days Updated.
                            </p>

                            <Button
                                variant="solid"
                                className="bg-[#FFC124] hover:bg-[#FFC124] w-full"
                                size="sm"
                                onClick={() => setConfirmationMessage(false)}
                            >
                                Okay
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default B2bCustomerName
