import { Avatar, Card, Dropdown } from '@/components/ui'
import {
    gethubDetails,
    useAppDispatch,
    useAppSelector,
} from '@/store/slices/hubs/details'
import { useEffect } from 'react'
import { BsBuildings } from 'react-icons/bs'
import { MdLocationPin, MdEmail } from 'react-icons/md'
import { FaPhoneAlt, FaUser } from 'react-icons/fa'

type hubType = {
    hubId?: string
}

const formatDate = (dateString: string | number | Date) => {
    const dateObj = new Date(dateString)
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const HubName = ({ hubId }: hubType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (typeof hubId === 'string') {
                    dispatch(gethubDetails(hubId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [hubId, dispatch])

    const testdata = useAppSelector((state) => state)
    const isHubDetailsLoading = testdata.hubDetails.data.loading

    const hubDetailsData = testdata.hubDetails.data.hubDetailDataList
    console.log('hubDetailsData :', hubDetailsData)

    return (
        <div>
            <div className="grid lg:grid-cols-2  gap-5">
                <Card
                    className="bg-[#f9f9f9] "
                    clickable={true}
                    onClick={(e) => console.log('Card clicked!', e)}
                >
                    <div className="flex">
                        <div className="flex items-center justify-between  gap-8">
                            <div className=" flex flex-col gap-4">
                                <div className="w-[8rem] h-[8rem] rounded-full bg-[#f9f9f9] shadow-md p-2">
                                    <img
                                        src={hubDetailsData.hubImg}
                                        alt={hubDetailsData.hubName}
                                        className="w-[100%] h-[100%] rounded-full"
                                    />
                                </div>
                                <div className="flex items-center gap-5">
                                    <Avatar icon={<BsBuildings />} size="sm" />
                                    <span>
                                        <small>Hub ID</small>
                                        <p>{hubDetailsData.hubId}</p>
                                    </span>
                                </div>
                            </div>

                            <div className=" flex flex-col gap-6">
                                <div>
                                    <h4 className="">{hubDetailsData.hubName}</h4>
                                    <p>
                                        Date Registered:{' '}
                                        {formatDate(
                                            hubDetailsData.dateRegistered
                                        )}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 border p-2">
                                    <small>Servicing Local Governments</small>
                                    <Dropdown
                                        menuStyle={{
                                            minWidth: 230,
                                            alignItems: 'start',
                                        }}
                                        placement="bottom-end"
                                        trigger="click"
                                    >
                                        <Dropdown.Item variant="header">
                                            <div className="py-2 px-3 flex items-center gap-2">
                                                <div>
                                                    <div className="flex flex-col gap-4 text-xs">
                                                        {hubDetailsData.servicingLocalGovernment.map(
                                                            (
                                                                localGovernment,
                                                                index
                                                            ) => (
                                                                <span
                                                                    key={index}
                                                                >
                                                                    {
                                                                        localGovernment
                                                                    }
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>

                                <div className="flex items-center gap-5">
                                    <Avatar
                                        icon={<MdLocationPin />}
                                        size="sm"
                                    />
                                    <span>
                                        <small>Hub Address</small>
                                        <p>{hubDetailsData.hubLocation}</p>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4"></div>
                    </div>
                </Card>

                <Card
                    className="bg-[#f9f9f9] "
                    clickable={true}
                    onClick={(e) => console.log('Card clicked!', e)}
                >
                    <div className="">
                        <span>
                            <h4>{hubDetailsData.hubManagerFirstName} {hubDetailsData.hubManagerLastName}</h4>
                            <p>Hub Manager</p>
                        </span>
                        <div className="flex items-center justify-between  gap-8">
                            <div className=" flex flex-col gap-4">
                                <div className="flex items-center gap-5">
                                    <Avatar icon={<FaUser />} size="sm" />
                                    <span>
                                        <small>Manager ID</small>
                                        <p>{hubDetailsData.hubManagerId}</p>
                                    </span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <Avatar icon={<MdEmail />} size="sm" />
                                    <span>
                                        <small>Email Address</small>
                                        <p>{hubDetailsData.hubManagerEmail}</p>
                                    </span>
                                </div>
                            </div>

                            <div className=" flex flex-col gap-6">
                                <div className="flex items-center gap-5">
                                    <Avatar
                                        icon={<FaPhoneAlt  />}
                                        size="sm"
                                    />
                                    <span>
                                        <small>Phone Number</small>
                                        <p>{hubDetailsData.hubManagerPhoneNo}</p>
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 border p-2">
                                    <p>View More</p>
                                    <Dropdown
                                        menuStyle={{
                                            minWidth: 230,
                                            alignItems: 'start',
                                        }}
                                        placement="bottom-end"
                                        trigger="click"
                                    >
                                        <Dropdown.Item variant="header">
                                            <div className="py-2 px-3 flex items-center gap-2">
                                                <div>
                                                    <p className=' font-semibold pb-4'>Next of Kin Information</p>
                                                    <div className="flex flex-col gap-4 text-xs">
                                                        <span className='flex items-center gap-3'>
                                                          <small className='font-semibold'>Name:</small>  
                                                            {
                                                                hubDetailsData
                                                                    .nextOfKin
                                                                    .nextOfKinFirstName
                                                            }  {
                                                                hubDetailsData
                                                                    .nextOfKin
                                                                    .nextOfKinLastName
                                                            }
                                                        </span>
                                                        <span className='flex items-center gap-3'>
                                                            <small className='font-semibold'>Phone Number:</small>
                                                            {
                                                                hubDetailsData
                                                                    .nextOfKin
                                                                    .nextOfKinPhoneNumber
                                                            }
                                                        </span>
                                                        <span className='flex items-center gap-3'>
                                                            <small className='font-semibold'>Address:</small>
                                                            {
                                                                hubDetailsData
                                                                    .nextOfKin
                                                                    .nextOfKinAddress
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4"></div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default HubName
