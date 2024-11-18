import { Button } from '@/components/ui'
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import { GiMasonJar } from 'react-icons/gi'
import { TbTruckDelivery } from 'react-icons/tb'

const NewCheckCrumbs = [
    {
        icon: <FaMoneyBillWaveAlt />,
        text: 'N8,000 (Annual Subscription for smart device)',
    },
    {
        icon: <GiMasonJar />,
        text: 'N18,000 (Homefort Cylinder)',
    },
    {
        icon: <GiMasonJar />,
        text: ' N9,600 (12Kg Filled Gas)',
    },
    {
        icon: <TbTruckDelivery />,
        text: 'N2,000 (Delivery fee)',
    },
]
const OldCheckCrumbs = [
    {
        icon: <FaMoneyBillWaveAlt />,
        text: 'N8,000 (Annual Subscription )',
        subtext: 'N8,000 covers annual service charge for smart device.',
    },
    {
        icon: <GiMasonJar />,
        text: 'Gas Quantity Delivered',
        subtext:
            'This amount is dependent on gas quantity left in your cylinder.Take for instance, if you have 4Kg gas, you will be paying for8Kg. i.e. (12Kg - 4Kg)',
    },
]
const subtext2 =
    'Expiry date of a cylinder is 10 years post production. So cylinders that are: Above 10 years, you pay N10,200 to get a brand new cylinder. 2. Cylinders below 10 years are exchanged at zero cost (N0) for a brand new cylinder. Terms and conditions are applicable to existing cylinders. Our personnel will verify cylinder age structural integrity onsite.'

export const NewChecked = ({ chargeCustomer }: any) => {
    return (
        <div className="">
            <p className="text-center text-xs pb-3">you will be paying</p>
            <div className="border border-[#FFC124] flex flex-col items-center">
                <div className=" flex flex-col gap-3 items-start p-4">
                    {NewCheckCrumbs.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 text-xs"
                        >
                            <span>{item.icon}</span>
                            <span className="text-[10px] ">{item.text}</span>
                        </div>
                    ))}
                </div>
                <span className="text-xs  text-[#000] font-bold">
                    TOTAL = N37,600.00
                </span>
                <Button block variant="solid" onClick={chargeCustomer}>
                    Charge Customer
                </Button>
            </div>
        </div>
    )
}

export const OldChecked = ({ chargeCustomer }: any) => {
    return (
        <div className="">
            <p className="text-center text-xs pb-3">you will be paying</p>
            <div className="border border-[#FFC124] flex flex-col items-center">
                <div className=" flex flex-col gap-3 items-start p-4">
                    {OldCheckCrumbs.map((item, index) => (
                        <div
                            key={index}
                            className=" text-xs flex flex-col gap-3"
                        >
                            <div className="flex items-center gap-3">
                                <span>{item.icon}</span>
                                <span className="text-[10px] ">
                                    {item.text}
                                </span>
                            </div>

                            <div className="text-[10px] bg-[#f9f9f9] border p-2 rounded-sm">
                                <p>{item.subtext}</p>
                            </div>
                           
                        </div>
                    ))}
                     <div className="flex items-center gap-3">
                                <span>
                                    <TbTruckDelivery />
                                </span>
                                <span className="text-[10px] ">
                                 N2,000 (Delivery fee)
                                </span>
                            </div>
                    <div className="bg-[#f9f9f9] border rounded-sm p-2 text-[10px]">
                        <p>{subtext2}</p>
                    </div>
                </div>
                <span className="text-xs  text-[#000] font-bold">
                    SUB TOTAL = N37,600.00
                </span>
                <Button block variant="solid" onClick={chargeCustomer}>
                    Charge Customer
                </Button>
            </div>
        </div>
    )
}
