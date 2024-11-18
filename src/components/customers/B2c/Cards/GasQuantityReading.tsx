/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Avatar, Card, Progress } from '@/components/ui'
import { FiCpu } from 'react-icons/fi'
import {
    getCustomersB2cDetails,
    useAppDispatch,
    useAppSelector,
} from '../../../../store/slices/customers/customerDetails'
import { useEffect, useMemo } from 'react'
import Swiper from '@/components/ui/Swiper/Swiper'
import { MdOutlinePropaneTank } from 'react-icons/md'

type CustomerDetailsDropdown = {
    customerName?: string
    customerId?: string
    phoneNumber?: string
    address?: string
    dateOfOnboarding?: string
    cylinderid: string
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
const GasQuantityReading = ({ customerId }: CustomerDetailsDropdown) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {

                if (typeof customerId === 'string') {
                    dispatch(getCustomersB2cDetails(customerId))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerId, dispatch])


    const userDetails = useAppSelector(
        (state) => state.b2cCustomerDetails.data.setCustomerDetails
    )
   
    const assets = userDetails?.assets || []

   
    return (
        <div>
            <Card className="bg-[#f9f9f9] h-[11rem] ">
                <Swiper
                    items={assets
                        .reduce((slides: any[], item: any, index: number) => {
                            if (index % 2 === 0) {
                                const nextItem = assets[index + 1]
                                if (nextItem && !nextItem.smartDeviceId) {
                                    slides.push([item, nextItem])
                                    return slides
                                }
                            }
                            if (!item.smartDeviceId) {
                                return slides
                            }
                            slides.push([item])
                            return slides
                        }, [])
                        .map((slideItems: any[], slideIndex: number) => (
                            <div key={slideIndex} className="">
                                {slideItems.map(
                                    (item: any, itemIndex: number) => (
                                        <div key={itemIndex}>
                                            {item.smartDeviceId ? (
                                                <div>
                                                    <div className="w-full flex items-center justify-between">
                                                        <h6 className="w-[40%]">
                                                            Gas Quantity Reading
                                                        </h6>
                                                        <div className="flex items-center gap-3">
                                                            <Avatar
                                                                icon={<FiCpu />}
                                                            />
                                                            <span className="">
                                                                <h6 className="uppercase">
                                                                    {
                                                                        item.smartDeviceId
                                                                    }
                                                                </h6>
                                                                <small>
                                                                    Smart Device
                                                                    ID
                                                                </small>
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
                                                            Remaining:{' '}
                                                            {
                                                                item.gasCurrentReading
                                                            }
                                                            kg
                                                        </small>
                                                        <small>
                                                            {item.totalGas}kg
                                                        </small>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="">
                                                    <div className="flex flex-col gap-3 items-center">
                                                        <Avatar
                                                            icon={
                                                                <MdOutlinePropaneTank />
                                                            }
                                                        />
                                                        <span className="ml-3">
                                                            {item.cylinderId}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                />
            </Card>
        </div>
    )
}

export default GasQuantityReading
