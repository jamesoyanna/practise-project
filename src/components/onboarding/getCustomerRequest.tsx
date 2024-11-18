import React, { useEffect, useState } from 'react'
import { Input, Select, Button, Dialog, Avatar } from '../ui'
import { IoMdClose } from 'react-icons/io'
import { BsCheckLg } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { SingleValue } from 'react-select'

interface AssetOption {
    value: string
    label: string
}

interface AssetTypes {
    gasType: string
    gasBotType: string
}

const selectAssetsOptions: AssetOption[] = [
    { value: '12kg', label: '12kg' },
    { value: '25kg', label: '25kg' },
    { value: '50kg', label: '50kg' },
]
const assignOptions = [
    { value: 'Seun Oni', label: 'Seun Oni' },
    { value: 'Emmanuel Popoola', label: 'Emmanuel Popoola' },
    { value: 'Obioma John', label: 'Obioma John' },
    { value: 'Etim Bassey', label: 'Etim Bassey' },
]

const GetCustomerRequest: React.FC<object> = () => {
    const navigate = useNavigate()
    const [completeAssetInputVal, setCompleteAssetInputVal] = useState<
        AssetOption[]
    >([])
    const [completeAssets, setCompleteAssets] = useState<AssetTypes[]>([
        { gasType: '', gasBotType: 'B2B GasBot' },
    ])
    const [inCompleteAssetInputVal, setInCompleteAssetInputVal] = useState<
        AssetOption[]
    >([])

    const [incompleteAssets, setIncompleteAssets] = useState<
        { gasType: string }[]
    >([{ gasType: '' }])

    const [displayCompleteAssets, setDisplayCompleteAsssets] = useState(false)
    const [displayInCompleteAssets, setDisplayInCompleteAsssets] =
        useState(false)
    const [assignValue, setAssignValue] = useState()
    const [openAssignInput, setOpenAssignInput] = useState(false)
    const [confirmationMessage, setConfirmationMessage] =
        useState<boolean>(false)
    const [error, setError] = useState('')

    const handleDisplayCompleteAsset = () => {
        setDisplayCompleteAsssets(true)
    }

    const handleDisplayInCompleteAsset = () => {
        setDisplayInCompleteAsssets(true)
    }
    const handleCompleteAssetChange = (
        index: number,
        testVal: SingleValue<AssetOption>
    ) => {
        if (!testVal) {
            return
        }
        setCompleteAssets((prevAssets) => {
            const updatedAssets = [...prevAssets]
            updatedAssets[index] = {
                ...updatedAssets[index],
                gasType: testVal?.value || '',
            }
            return updatedAssets
        })
        setCompleteAssetInputVal((prevAssets) => {
            const updatedAssets = [...prevAssets]
            updatedAssets[index] = testVal

            return updatedAssets
        })
    }

    useEffect(() => {
        console.log('After Change - completeAssets:', completeAssets)
    }, [completeAssets])

    const handleInCompleteAssetChange = (
        index: number,
        testVal: SingleValue<AssetOption>
    ) => {
        console.log('incomplete Asset Change:', index, testVal)
        if (!testVal) {
            return
        }
        setIncompleteAssets((prevAssets) => {
            const updatedAssets = [...prevAssets]
            updatedAssets[index] = {
                ...updatedAssets[index],
                gasType: testVal?.value || '',
            }
            return updatedAssets
        })
        setInCompleteAssetInputVal((prevAssets) => {
            const updatedAssets = [...prevAssets]
            updatedAssets[index] = testVal
            return updatedAssets
        })
        console.log('Updated completeAssets:', incompleteAssets)
    }
    useEffect(() => {
        console.log('After Change - incompleteAssets:', incompleteAssets)
    }, [incompleteAssets])

    const handleAddCompleteAsset = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        setCompleteAssets((prevAssets) => [
            ...prevAssets,
            { gasType: '', gasBotType: 'B2B GasBot' },
        ])
    }

    const handleAddIncompleteAsset = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        setIncompleteAssets([...incompleteAssets, { gasType: '' }])
    }

    const handleRemoveCompleteAsset = () => {
        setCompleteAssets([
            ...completeAssets.slice(0, completeAssets.length - 1),
        ])
    }

    const handleRemoveSingleAsset = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        setIncompleteAssets([
            ...incompleteAssets.slice(0, incompleteAssets.length - 1),
        ])
    }

    const handleOpenAssignModal = () => {
        if (completeAssets !== null || incompleteAssets !== null) {
            setOpenAssignInput(true)
        } else {
            setError('input fields cannot be empty!')
        }
    }
    const assignBtnDisabled =
        completeAssets.some(
            (asset) =>
                asset.gasType?.trim() === '' ||
                asset.gasBotType?.trim() !== 'B2B GasBot'
        ) && incompleteAssets.some((asset) => asset.gasType.trim() === '')

    const openConfirmationMessage = () => {
        if (assignValue !== '' && completeAssets !== null) {
            setOpenAssignInput(false)
            setConfirmationMessage(true)
        }
    }

    const handleOkayButtonClick = () => {
        setConfirmationMessage(false)
        navigate('/account-officer/onboarding')
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h4>Get Customer Request</h4>
                <div>
                    <button
                        disabled={assignBtnDisabled}
                        className="bg-[#FFC124] hover:bg-[#f8cc5c] disabled:opacity-50 disabled:cursor-not-allowed text-[#000] font-bold px-12 py-3 rounded-lg"
                        onClick={handleOpenAssignModal}
                    >
                        Assign
                    </button>
                    <p className="text-[#ff0000] font-bold">{error}</p>
                </div>
                {openAssignInput && (
                    <>
                        <Dialog
                            preventScroll={false}
                            className="justify-center flex flex-col"
                            contentClassName="custom-content-class flex-grow"
                            height={500}
                            width={400}
                            isOpen={openAssignInput}
                            onClose={() => setOpenAssignInput(false)}
                        >
                            <span className="text-[#194DA3] bg-[#d8e4f7] text-[12px] px-4 py-2 rounded-2xl font-semibold">
                                Assign
                            </span>
                            <div className="h-auto space-y-10 mt-10 ">
                                <Select
                                    value={assignValue}
                                    options={assignOptions}
                                    defaultOptions={true}
                                    placeholder="Select Delivery Officer"
                                    onChange={() => setAssignValue(assignValue)}
                                />
                                <div className="w-[88%] fixed bottom-4">
                                    <button
                                        className="bg-[#FFC124] hover:bg-[#FFA700] w-full py-3 rounded-lg text-[#000] font-bold"
                                        onClick={openConfirmationMessage}
                                    >
                                        Assign to a delivery officer
                                    </button>
                                </div>
                            </div>
                        </Dialog>
                    </>
                )}
            </div>
            {confirmationMessage && (
                <div className="border bg-[#fff] absolute z-50 drop-shadow-2xl top-[10%]  right-[40%] pt-8 pb-4 px-2 w-[280px]">
                    <div className="flex flex-col gap-5">
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

            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-8">
                    <label className="flex bg-[#f5f5f5] text-[10px] gap-4 mr-[5px] h-[3rem]  items-center px-4 border border-[#FFC124]">
                        <input
                            type="radio"
                            onClick={handleDisplayCompleteAsset}
                        />
                        Complete Asset
                    </label>
                    {displayCompleteAssets && (
                        <>
                            {completeAssets.map((asset, index) => (
                                <div key={index} className="space-y-6">
                                    <div className="flex gap-3 items-center">
                                        <p className="font-semibold">
                                            Complete asset {index + 1}
                                        </p>
                                        {index > 0 && (
                                            <button
                                                type="reset"
                                                className="bg-[#ff0000] text-[#fff] rounded-full p-1 text-sm font-semibold"
                                                onClick={
                                                    handleRemoveCompleteAsset
                                                }
                                            >
                                                <IoMdClose />
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <Select
                                            value={completeAssetInputVal[index]}
                                            options={selectAssetsOptions}
                                            defaultOptions={true}
                                            placeholder="Cylinder Size"
                                            onChange={(selectedOption) => {
                                                handleCompleteAssetChange(
                                                    index,
                                                    selectedOption
                                                )
                                            }}
                                        />

                                        <Input
                                            readOnly
                                            value={'B2B GasBot'}
                                            className="border-none bg-[#e8e8e8]"
                                            defaultValue={'B2B GasBot'}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="text-right">
                                <Button
                                    variant="solid"
                                    className="mt-auto align-baseline bg-[#194DA3] rounded-md"
                                    onClick={handleAddCompleteAsset}
                                >
                                    Add
                                </Button>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col gap-8">
                    <label className="flex bg-[#f5f5f5] text-[10px] gap-4 mr-[5px] h-[3rem]  items-center px-4 border border-[#FFC124]">
                        <input
                            type="radio"
                            onClick={handleDisplayInCompleteAsset}
                        />
                        Incomplete Asset
                    </label>
                    {displayInCompleteAssets && (
                        <>
                            {incompleteAssets.map((asset, index) => (
                                <div key={index} className="space-y-6">
                                    <div className="flex gap-3 items-center">
                                        <p className="font-semibold">
                                            Incomplete asset {index + 1}
                                        </p>
                                        {index > 0 && (
                                            <button
                                                type="reset"
                                                className="bg-[#ff0000] text-[#fff] rounded-full p-1 text-sm font-semibold"
                                                onClick={
                                                    handleRemoveSingleAsset
                                                }
                                            >
                                                <IoMdClose />
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <Select
                                            value={
                                                inCompleteAssetInputVal[index]
                                            }
                                            options={selectAssetsOptions}
                                            defaultOptions={true}
                                            placeholder="Cylinder Size"
                                            onChange={(selectedOption) => {
                                                handleInCompleteAssetChange(
                                                    index,
                                                    selectedOption
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="text-right">
                                <Button
                                    variant="solid"
                                    className="mt-auto align-baseline bg-[#194DA3] rounded-md"
                                    onClick={handleAddIncompleteAsset}
                                >
                                    Add
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default GetCustomerRequest