/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { Avatar, Button, Select } from '../ui'
import { BsCheckLg } from 'react-icons/bs'
import reducer, {
    getOnboardingCustomerDetails,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/onboarding/details'
import { injectReducer } from '@/store'
import { useNavigate } from 'react-router-dom'

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    onboarded: {
        label: 'onboarded',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    assigned: {
        label: 'assigned',
        dotClass: 'bg-yellow-500',
        textClass: 'text-yellow-500',
    },
    unassigned: {
        label: 'unassigned',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },
}

const getStatusClass = (status: string): string => {
    const statusColor = orderStatusColor[status.toLowerCase()]
    return statusColor ? statusColor.textClass : ''
}

type OnboardingDetailsProps = {
    isOpen: boolean
    onClose?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
    customerCode?: string
}

const assignOptions = [
    { value: 'Seun Oni', label: 'Seun Oni' },
    { value: 'Emmanuel Popoola', label: 'Emmanuel Popoola' },
    { value: 'Obioma John', label: 'Obioma John' },
    { value: 'Etim Bassey', label: 'Etim Bassey' },
]
injectReducer('onboardingCustomerDetails', reducer)

const Onboardingdetails = ({
    isOpen,
    onClose,
    customerCode,
}: OnboardingDetailsProps) => {
    if (!isOpen) return null
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [details, setDetails] = useState(true)
    const [openAssignInput, setOpenAssignInput] = useState(false)
    const [assignValue, setAssignValue] = useState()
    const [onboardModal, setOnboardModal] = useState<boolean>(true)
    const [confirmationMessage, setConfirmationMessage] =
        useState<boolean>(false)
    const [assignmentStatus, setAssignmentStatus] = useState<string>('pending')

    const openassignModal = () => {
        setDetails(false)
        setOpenAssignInput(true)
    }
    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                if (typeof customerCode === 'string') {
                    dispatch(getOnboardingCustomerDetails(customerCode))
                }
            } catch (error) {
                console.error('Error fetching customer details:', error)
            }
        }

        fetchCustomerDetails()
    }, [customerCode, dispatch])

    const testdata = useAppSelector((state) => state)
    const isCustomerDetailsLoading =
        testdata.onboardingCustomerDetails.data.loading

    const customerDetails =
        testdata.onboardingCustomerDetails.data.onBoardingDataList
    console.log('mydata :', customerDetails)

    const authority = testdata.auth.user.authority ?? []

    const openConfirmationMessage = () => {
        if (assignValue !== '') {
            onClose
            setOpenAssignInput(false)
            setOnboardModal(false)
            setConfirmationMessage(true)
        }
    }
    const handleOkayButtonClick = () => {
        setConfirmationMessage(false)
        setOnboardModal(true)
        setDetails(true)
        setAssignmentStatus('in-progress')
    }
    const handleGetCustomerRequest = () => {
        if (customerCode) {
            navigate(`/account-officer/onboarding/assign/${customerCode}`);
        }
    };
    

    return (
        <>
            {onboardModal && (
                <div className="border fixed  z-1000 top-[10%] right-[15%] bg-[#fff] p-4 w-[350px]">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between ">
                            <span className="text-[#194DA3] bg-[#d8e4f7] text-[10px] p-1 rounded-2xl font-semibold">
                                Onboarding Details
                            </span>
                            <span
                                className="close border border-[#f9f9f9] p-1 rounded-[50%] bg-[#f9f9f9] cursor-pointer"
                                onClick={onClose}
                            >
                                &times;
                            </span>
                        </div>
                        <div>
                            {details &&
                                (isCustomerDetailsLoading ? (
                                    <>
                                        <p>loading...</p>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-col gap-3 ">
                                            <div className="flex  justify-between">
                                                <span>
                                                    <small className="text-xs">
                                                        Scheduled Onboarding
                                                        Date
                                                    </small>
                                                    <p className="text-xs font-semibold">
                                                        {
                                                            customerDetails?.scheduledOnboardingDate
                                                        }
                                                    </p>
                                                </span>
                                                <span className="text-right">
                                                    <small className="text-xs">
                                                        Status
                                                    </small>
                                                    <p className={`text-xs font-semibold capitalize ${getStatusClass(customerDetails.status)}`}>
                                                        {
                                                            customerDetails?.status
                                                        }
                                                    </p>
                                                </span>
                                            </div>
                                            <hr />
                                            <div className="flex  justify-between">
                                                <div className="flex flex-col gap-3">
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Name
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.customerName
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Email Address
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.email
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Local Government
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.localGovernment
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            Home Address
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.address
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-3 text-right">
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Phone No.
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.phoneNumber
                                                            }
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <small className="text-xs">
                                                            State
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.state
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="flex  justify-between">
                                                <div className="flex flex-col gap-3">
                                                    <span>
                                                        <small className="text-xs">
                                                            Customer Type
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.customerType
                                                            }
                                                        </p>
                                                    </span>
                                                    {customerDetails?.customerRequest ? (
                                                        <span>
                                                            <small className="text-xs">
                                                                Customer Request
                                                            </small>
                                                            <p className="text-xs font-semibold">
                                                                {
                                                                    customerDetails?.customerRequest
                                                                }
                                                            </p>
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div className="flex flex-col gap-3 text-right">
                                                    <span>
                                                        <small className="text-xs">
                                                            Access Code
                                                        </small>
                                                        <p className="text-xs font-semibold">
                                                            {
                                                                customerDetails?.customerCode
                                                            }
                                                        </p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            {authority.includes(
                                                'HUB_MANAGER'
                                            ) && customerDetails?.customerBusinessType === 'B2C' ? (
                                                <button
                                                    className={`w-full bg-[#FFC124] py-2 text-[#000] hover:bg-[#FFA700] ${
                                                        assignmentStatus ===
                                                        'in-progress'
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                    }`}
                                                    disabled={
                                                        assignmentStatus ===
                                                        'in-progress'
                                                    }
                                                    onClick={() => {
                                                        if (
                                                            assignmentStatus !==
                                                            'in-progress'
                                                        ) {
                                                            openassignModal()
                                                        }
                                                    }}
                                                >
                                                    {assignmentStatus ===
                                                    'pending'
                                                        ? 'Assign to Delivery Officer'
                                                        : 'In-Progress'}
                                                </button>
                                            ) :
                                             authority.includes('ACCOUNT_OFFICER') ?(
                                                <button
                                                    className={`w-full bg-[#194DA3] py-2 text-[#fff] hover:bg-[#5998fc] ${
                                                        assignmentStatus ===
                                                        'in-progress'
                                                            ? 'opacity-50 cursor-not-allowed'
                                                            : ''
                                                    }`}
                                                    disabled={
                                                        assignmentStatus ===
                                                        'in-progress'
                                                    }
                                                    onClick={
                                                        handleGetCustomerRequest
                                                    
                                                }
                                                >
                                                    Get Customer Request
                                                   
                                                </button>
                                            ): null
                                        }
                                        </div>
                                    </div>
                                ))}

                            {openAssignInput && (
                                <div>
                                    <form className="flex flex-col gap-6">
                                        <div className="h-auto">
                                            <Select
                                                value={assignValue}
                                                options={assignOptions}
                                                defaultOptions={true}
                                                placeholder="Select Delivery Officer"
                                                onChange={() =>
                                                    setAssignValue(assignValue)
                                                }
                                            />
                                        </div>

                                        <div className="w-full">
                                            <button
                                                className="bg-[#FFC124] hover:bg-[#FFA700] w-full py-2 text-[#000]"
                                                onClick={
                                                    openConfirmationMessage
                                                }
                                            >
                                                Assign
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {confirmationMessage && (
                <div className="border bg-[#fff] absolute  top-[10%]  right-[30%] pt-8 pb-2 px-2 w-[280px]">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-center">
                            <Avatar
                                icon={<BsCheckLg />}
                                shape="circle"
                                className="bg-[#194DA3] text-center"
                            />
                        </div>

                        <p className="font-extralight text-xs text-center">
                            Wow! You’ve successfully assigned an onboarding to a
                            delivery officer
                        </p>

                        <Button
                            variant="solid"
                            className="bg-[#FFC124] hover:bg-[#FFC124] w-full"
                            size="sm"
                            onClick={handleOkayButtonClick}
                        >
                            Okay
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Onboardingdetails
