import { Avatar, Card, Progress } from '@/components/ui'
import { FiCpu } from 'react-icons/fi'
import {
    getCustomersB2bDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/b2bCustomerDetailsSlice'
import { useEffect, useMemo, useRef } from 'react'
import Swiper from '@/components/ui/Swiper/Swiper'
import { MdOutlinePropaneTank } from 'react-icons/md'

type CustomerDetailsDropdown = {
    customerName?: string
    customerId?: string
    smartDeviceId?: string
    totalGas: number
    gasCurrentReading: number
}

type ProgressionBarProps = {
    gasCurrentReading: number
}

const GasProgress = ({ gasCurrentReading }: ProgressionBarProps) => {
    const progressExtraProps = useMemo(() => {
        if (gasCurrentReading < 3) {
            return { color: 'red-500' }
        } else if (gasCurrentReading < 6) {
            return { color: 'yellow-500' }
        } else {
            return { color: 'green-500' }
        }
    }, [gasCurrentReading])

    return (
        <Progress
            size="md"
            showInfo={false}
            percent={gasCurrentReading}
            {...progressExtraProps}
        />
    )
}
const QuantityReadingSlider = ({ customerId }: CustomerDetailsDropdown) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                console.log('customerId :', customerId)

                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2bDetails(customerId))
                    console.log('jaybee')
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])

    const testData = useAppSelector((state) => state)

    const userDetails = testData.b2bCustomerDetails.data.setCustomerB2bDetails

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const assets = userDetails?.assets || []

    return (
        <>
            <Card className="bg-[#f9f9f9] h-[11rem] ">
                <Swiper
                    items={assets.map((item: any, index: number) => (
                        <div key={index} className="">
                            {item.smartDeviceId ? (
                                <div className='w-[65%]'>
                                    <div className="w-full flex items-center justify-between">
                                        <h6 className="w-[40%]">
                                            Gas Quantity Reading
                                        </h6>
                                        <div className="flex items-center gap-3">
                                            <Avatar icon={<FiCpu />} />
                                            <span className="">
                                                <h6 className="uppercase">
                                                    {item.smartDeviceId}
                                                </h6>
                                                <small>Smart Device ID</small>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pt-10">
                                        <GasProgress
                                            gasCurrentReading={
                                                item.gasCurrentReading
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center justify-between pt-2 pr-4">
                                        <small>
                                            Remaining: {item.gasCurrentReading}{' '}
                                            kg
                                        </small>
                                        <small>{item.totalGas} kg</small>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <h6 className="w-[40%]">
                                        Gas Quantity Reading
                                    </h6>

                                    <div className="flex flex-col gap-3 items-center">
                                        <Avatar
                                            icon={<MdOutlinePropaneTank />}
                                            size="lg"
                                        />
                                        <span className="flex items-center gap-2 ml-3">
                                         <p>Cylinder Id: </p> 
                                          <p className='font-semibold'> {item.cylinderId}</p>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                />
            </Card>
        </>
    )
}

export default QuantityReadingSlider
