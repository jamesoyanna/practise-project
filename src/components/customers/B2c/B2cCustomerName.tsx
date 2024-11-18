// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Avatar, Dropdown } from '@/components/ui'
import { FaPhoneAlt, FaUser } from 'react-icons/fa'
import { IoIosCheckmarkCircle } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { useEffect } from 'react'
import {
    getCustomersB2cDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/customerDetails'

type CustomerDetailsDropdown = {
    customerName?: string
    customerId?: string
    phoneNumber?: string
    address?: string
    dateOfOnboarding?: string
}

const B2cCustomerName = ({ customerId }: CustomerDetailsDropdown) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                console.log('customerId :', customerId)

                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2cDetails(customerId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])

    const testData = useAppSelector((state) => state)
    console.log('testData :', testData)

    const userDetails = useAppSelector(
        (state) => state.b2cCustomerDetails.data.setCustomerDetails
    )

    const loading = useAppSelector(
        (state) => state.b2cCustomerDetails.data.setCustomerDetails
    )
    console.log('loading :', loading)

    return (
        <div>
            <div className="flex gap-3 md:gap-[2rem] items-center">
                <h4 className="text-sm md:text-base capitalize ">
                    {userDetails?.customerName}
                </h4>

                <Dropdown
                    menuStyle={{ minWidth: 230, alignItems: 'start' }}
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
                                    {userDetails.customerId}
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
                                    Date of Onboarding
                                </div>
                                <div className="text-xs">
                                    {userDetails.dateOnboarded}
                                </div>
                            </div>
                        </div>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    )
}

export default B2cCustomerName
