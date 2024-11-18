import { Button, Dialog, Notification } from '@/components/ui'
import reducer, {
    useAppSelector,
    useAppDispatch,
    getSettingsData,
    putSettingsData,
    SettingsData,
} from '@/store/slices/settings'

import { injectReducer } from '@/store'
import { useEffect, useState } from 'react'
import InputGrid from './InputGrid'

injectReducer('settingsFormData', reducer)

interface CustomParagraphProps {
    children: string
}

const CustomParagraph: React.FC<CustomParagraphProps> = ({ children }) => {
    return <p className="font-semibold text-sm text-[#010101]">{children}</p>
}

const Settings: React.FC = () => {
    const dispatch = useAppDispatch()
    const [confirmationMessage, setConfirmationMessage] = useState(false)
    const [openLabel, setOpenLabel] = useState(false)
    const test = useAppSelector((state) => state)

    const settingsData: SettingsData =
        test.settingsFormData.data.settingsDataList

    const [newSettingsData, setNewSettingsData] =
        useState<SettingsData>(settingsData)

    useEffect(() => {
        // console.log(
        //     'new settings data :',
        //     test.settingsFormData.data.settingsDataList
        // )
    }, [test.settingsFormData.data.settingsDataList])

    useEffect(() => {
        const result = getSettingsData()
        dispatch(result)
    }, [])

    const handleChange = (
        category: keyof SettingsData,
        type: string,
        value: string
    ) => {
        setNewSettingsData((prevSettings) => {
            const updatedSettings = {
                ...prevSettings,
                [category]: {
                    ...prevSettings[category],
                    [type]: value,
                },
            }
         
            return updatedSettings
        })
    }

    const handleSaveChanges = async (
        event: React.FormEvent<HTMLButtonElement | HTMLFormElement>
    ) => {
        event.preventDefault()
        try {
            const transformedData = {
                cylinderPrice: newSettingsData.cylinderPrice,
                SellingPriceOfGas: newSettingsData.SellingPriceOfGas,
                AnnualSubscription: newSettingsData.AnnualSubscription,
                PriceofRegulator: newSettingsData.PriceofRegulator,
                HosePrice: newSettingsData.HosePrice,
                ReferralBonusPrice: newSettingsData.ReferralBonusPrice,
                deliveryFee: newSettingsData.deliveryFee,
                cylinderGasReadingTriggerLevel:
                    newSettingsData.cylinderGasReadingTriggerLevel,
            }

          

            const action = await dispatch(putSettingsData(transformedData))

            const updatedData = action.payload as SettingsData
            setConfirmationMessage(false)
            setOpenLabel(true)
            setNewSettingsData(updatedData)
        } catch (error) {
            console.error('Error updating settings:', error)
        }
    }

    const handleCancel = (
        event: React.FormEvent<HTMLButtonElement | HTMLFormElement>
    ) => {
        event.preventDefault()

        setNewSettingsData(settingsData)
    }

    return (
        <>
            <span className="pb-6">
                {' '}
                <h4>Settings</h4>
            </span>
            <form className="flex flex-col gap-8">
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph>Price of Cylinder</CustomParagraph>
                    </div>

                    <div>
                        <InputGrid
                            setData={{
                                cylinderPrice: settingsData.cylinderPrice,
                            }}
                            handleChange={(type, value) =>
                                handleChange('cylinderPrice', type, value)
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph>Selling Price Of Gas</CustomParagraph>
                    </div>
                    <div>
                        <InputGrid
                            setData={{
                                SellingPriceOfGas:
                                    settingsData.SellingPriceOfGas,
                            }}
                            handleChange={(type, value) =>
                                handleChange('SellingPriceOfGas', type, value)
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph>Annual Subscription</CustomParagraph>
                    </div>
                    <div>
                        <InputGrid
                            setData={{
                                AnnualSubscription:
                                    settingsData.AnnualSubscription,
                            }}
                            handleChange={(type, value) =>
                                handleChange('AnnualSubscription', type, value)
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph>
                            Cylinder Gas Reading Trigger Level
                        </CustomParagraph>
                    </div>
                    <div>
                        <InputGrid
                            setData={{
                                cylinderPrice:
                                    settingsData.cylinderGasReadingTriggerLevel,
                            }}
                            handleChange={(type, value) =>
                                handleChange(
                                    'cylinderGasReadingTriggerLevel',
                                    type,
                                    value
                                )
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph>Price of Regulator</CustomParagraph>
                    </div>
                    <div className="grid grid-cols-2">
                        <InputGrid
                            setData={{
                                PriceofRegulator: settingsData.PriceofRegulator,
                            }}
                            handleChange={(type, value) =>
                                handleChange('PriceofRegulator', type, value)
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph>Price of Hose</CustomParagraph>
                    </div>
                    <div>
                        <InputGrid
                            setData={{
                                HosePrice: settingsData.HosePrice,
                            }}
                            handleChange={(type, value) =>
                                handleChange('HosePrice', type, value)
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph> Referral Bonus Price</CustomParagraph>
                    </div>
                    <div>
                        <InputGrid
                            setData={{
                                ReferralBonusPrice:
                                    settingsData.ReferralBonusPrice,
                            }}
                            handleChange={(type, value) =>
                                handleChange('ReferralBonusPrice', type, value)
                            }
                        />
                    </div>
                </div>
                <hr />
                <div className=" flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <CustomParagraph> Delivery Fees</CustomParagraph>
                    </div>
                    <div>
                        <InputGrid
                            setData={{
                                deliveryFee: settingsData.deliveryFee,
                            }}
                            handleChange={(type, value) =>
                                handleChange('deliveryFee', type, value)
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-6">
                    <Button
                        variant="solid"
                        size="sm"
                        className="bg-red-500 hover:bg-red-300"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        size="sm"
                        onClick={(
                            event: React.FormEvent<
                                HTMLButtonElement | HTMLFormElement
                            >
                        ) => {
                            event.preventDefault()
                            setConfirmationMessage(true)
                        }}
                    >
                        Save Changes
                    </Button>
                </div>
            </form>

            {confirmationMessage && (
                <>
                  
                    <Dialog
                        isOpen
                        width={350}
                        onClose={() => setConfirmationMessage(false)}
                    >
                        <p className="mt-4">
                            Are you sure you want to make this changes?
                        </p>
                        <div className="flex items-center justify-center gap-6 mt-8">
                            <Button
                                variant="solid"
                                size="md"
                                className="bg-red-500 hover:bg-red-300"
                                onClick={() => setConfirmationMessage(false)}
                            >
                                No
                            </Button>
                            <Button
                                size="md"
                                variant="solid"
                                onClick={handleSaveChanges}
                            >
                                yes
                            </Button>
                        </div>
                    </Dialog>
                </>
            )}

            {openLabel && (
                <Notification
                    closable={true}
                    duration={3000}
                    type="success"
                    title="Sucess"
                    style={{
                        position: 'fixed',
                        left: '50%',
                        zIndex: '1000',
                        transform: 'translateX(-50%)',
                        animation: 'slideInRight 4s ease',
                    }}
                >
                    Successfully Updated!
                </Notification>
            )}
        </>
    )
}

export default Settings
