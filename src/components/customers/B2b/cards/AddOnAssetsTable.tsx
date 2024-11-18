import {
    AssetOption,
    AssetTypes,
} from '@/components/onboarding/getCustomerRequest'
import { Button, DatePicker, Input, Select } from '@/components/ui'
import { ChangeEvent, useEffect, useState } from 'react'
import { GrLinkPrevious } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'
import { SingleValue } from 'react-select'



const selectAssetsOptions = [
    { value: '12kg', label: '12kg' },
    { value: '25kg', label: '25kg' },
    { value: '50kg', label: '50kg' },
]
export type SelectOptions = {
    value: number
    label: string
}

const AddOnAssetTable: React.FC<{ onClick: React.MouseEventHandler }> = ({
    onClick,
}) => {
    const [date, setDate] = useState<Date | null>(null)
    const [stateOptions, setStateOptions] = useState<SelectOptions[]>([])
    const [state, setState] = useState<number | null>(null)
    const [localGovernment, setLocalGovernment] = useState<number | null>(null)
    const [localGovernmentOptions, setLocalGovernmentOptions] = useState<
        SelectOptions[]
    >([])

    const [homeAddress, setHomeAddress] = useState('')
    const [isCompleteAsset, setIsCompleteAsset] = useState(false)
    const [isCylinder, setIsCylinder] = useState(false)
    const [pageOne, setPageOne] = useState(true)
    const [pageTwo, setPageTwo] = useState(false)
    const [error, setError] = useState('')
    const [completeAssetPageTwo, setCompleteAssetPageTwo] = useState(false)
    const [cylinderPageTwo, setCylinderPageTwo] = useState(false)
    const [completeAssetInputVal, setCompleteAssetInputVal] = useState<
        AssetOption[]
    >([])

    const [completeAssets, setCompleteAssets] = useState<AssetTypes[]>([
        { gasType: '', gasBotType: 'B2B GasBot' },
    ])

    //fetch State select options
    useEffect(() => {
        // Function to fetch options from the API
        const fetchOptions = async () => {
            try {
                const response = await fetch(
                    'https://homefort-be-staging-41ad105d39de.herokuapp.com/v1/auth/states'
                ) // Replace with your API endpoint
                const result = await response.json()

                // Log the received data
                console.log('Received data from API:', result)

                if (result.status) {
                    const options = result.data.map(
                        (item: { id: number; name: string }) => ({
                            value: item.id,
                            label: item.name,
                        })
                    )
                    setStateOptions(options)
                } else {
                    console.error('Error in response:', result.message)
                }
            } catch (error) {
                console.error('Error fetching state options:', error)
            }
        }

        fetchOptions()
    }, [])

    // fetch localGovernment select options
    useEffect(() => {
        const fetchLocalGovernmentOptions = async (stateId: number) => {
            try {
                const response = await fetch(
                    `https://homefort-be-staging-41ad105d39de.herokuapp.com/v1/auth/local-government?state_id=${stateId}`
                )
                const result = await response.json()

                console.log('Received local government data from API:', result)

                if (result.status) {
                    const options = result.data.map(
                        (item: { id: number; name: string }) => ({
                            value: item.id,
                            label: item.name,
                        })
                    )
                    setLocalGovernmentOptions(options)
                } else {
                    console.error(
                        'Error in local government response:',
                        result.message
                    )
                }
            } catch (error) {
                console.error('Error fetching local government options:', error)
            }
        }

        if (state !== null) {
            fetchLocalGovernmentOptions(state)
        }
    }, [state])

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
        // console.log('After Change - completeAssets:', completeAssets)
    }, [completeAssets])

    const [inCompleteAssetInputVal, setInCompleteAssetInputVal] = useState<
        AssetOption[]
    >([])
    const [cylinderAssets, setCylinderAssets] = useState<
        { cylinder: string }[]
    >([{ cylinder: '' }])
    const handleInCompleteAssetChange = (
        index: number,
        testVal: SingleValue<AssetOption>
    ) => {
        if (!testVal) {
            return
        }
        setCylinderAssets((prevAssets) => {
            const updatedAssets = [...prevAssets]
            updatedAssets[index] = {
                ...updatedAssets[index],
                cylinder: testVal?.value || '',
            }
            return updatedAssets
        })
        setInCompleteAssetInputVal((prevAssets) => {
            const updatedAssets = [...prevAssets]
            updatedAssets[index] = testVal
            return updatedAssets
        })
    }
    useEffect(() => {
        // console.log('After Change - incompleteAssets:', incompleteAssets)
    }, [cylinderAssets])

    const handleAddCompleteAsset = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        setCompleteAssets([
            ...completeAssets,
            { gasType: '', gasBotType: 'B2B GasBot' },
        ])
    }

    const handleAddCylinderAsset = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
        setCylinderAssets([...cylinderAssets, { cylinder: '' }])
    }

    const handleDateOnChange = (date: Date | null) => {
        setDate(date)
    }

    const handleState = (selectedOption: SelectOptions | null) => {
        setState(selectedOption ? selectedOption.value : null);
        setLocalGovernment(null ); 
        setLocalGovernmentOptions([]); 
    };

    const handleLocalGovernment = (selectedOption: SelectOptions | null) => {
        setLocalGovernment(selectedOption ? selectedOption.value : null);
    };

    const handleHomeAddress = (event: ChangeEvent<HTMLInputElement>) => {
        setHomeAddress(event.target.value.trim())
    }

    const handleCompleteAsset = () => {
        setIsCompleteAsset(true)
        setIsCylinder(false)
    }

    const handleIsCylinder = () => {
        setIsCylinder(true)
        setIsCompleteAsset(false)
    }

    const returnToPageOne = () => {
        setPageTwo(false)
        setPageOne(true)
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
        setCylinderAssets([
            ...cylinderAssets.slice(0, cylinderAssets.length - 1),
        ])
    }

    const handleOnboardBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (completeAssets !== null || cylinderAssets !== null) {
            console.log('you can submit')
            onClick(event)
        } else {
            setError('all fields are required')
        }
    }

    const handleNextBtn = () => {
        if (
            date &&
            state &&
            localGovernment &&
            homeAddress &&
            (isCylinder || isCompleteAsset)
        ) {
            setPageTwo(true)
            setPageOne(false)

            if (isCompleteAsset) {
                setCompleteAssetPageTwo(true)
                setCylinderPageTwo(false)
            } else if (isCylinder) {
                setCompleteAssetPageTwo(false)
                setCylinderPageTwo(true)
            }
        } else {
            setError('all fields are required')
        }
    }
    const onBoardBtnDiabled =
        completeAssets.some(
            (asset) =>
                asset.gasType?.trim() === '' ||
                asset.gasBotType?.trim() !== 'B2B GasBot'
        ) && cylinderAssets.some((asset) => asset.cylinder.trim() === '')

    return (
        <div className="no-scrollbar h-full overflow-y-auto my-6 mb-8 ">
            <form className="flex flex-col gap-4 text-sm">
                {pageOne && (
                    <div className="flex flex-col gap-4">
                        <DatePicker
                            inputFormat="MMM, DD YYYY"
                            value={date}
                            className="text-sm"
                            placeholder="Select Onboarding Date"
                            onChange={handleDateOnChange}
                        />
                        <Select
                            value={stateOptions.find(
                                (option) => option.value === state
                            )}
                            options={stateOptions}
                            defaultOptions={true}
                            placeholder="Select State"
                            onChange={handleState}
                        />
                        <Select
                            value={localGovernmentOptions.find(
                                (option) => option.value === localGovernment
                            )}
                            options={localGovernmentOptions}
                            defaultOptions={true}
                            placeholder="Select Local Government"
                            isDisabled={!state} 
                            onChange={handleLocalGovernment}
                        />
                        <Input
                            type="text"
                            placeholder="Home Address"
                            name="homeAddress"
                            value={homeAddress}
                            className="text-sm"
                            onChange={handleHomeAddress}
                        />
                        <p className="font-semibold">Choose Asset Type</p>

                        <div className="bg-[#f5f5f5] p-[10px]">
                            <label className="flex bg-[#f5f5f5] text-[10px] gap-4 mr-[5px]">
                                <input
                                    type="radio"
                                    checked={isCompleteAsset}
                                    onChange={handleCompleteAsset}
                                />
                                Complete Asset
                            </label>
                        </div>
                        <div className="bg-[#f5f5f5] p-[10px]">
                            <label className="flex bg-[#f5f5f5] text-[10px] gap-4 mr-[5px]">
                                <input
                                    type="radio"
                                    checked={isCylinder}
                                    onChange={handleIsCylinder}
                                />
                                Cylinder
                            </label>
                        </div>
                        <p className="text-[#ff0000] font-semibold text-sm">
                            {error}
                        </p>

                        <div className="flex align-bottom mt-8">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={
                                    !date ||
                                    !state ||
                                    !localGovernment ||
                                    !homeAddress ||
                                    !(isCompleteAsset || isCylinder)
                                }
                                loading={false}
                                className="mt-auto align-baseline bg-[#194DA3] w-full"
                                onClick={handleNextBtn}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
                {pageTwo && (
                    <div className="flex flex-col gap-[4rem]">
                        {completeAssetPageTwo && (
                            <div className="flex flex-col gap-4">
                                <span
                                    className="flex items-center gap-1 cursor-pointer absolute top-5 left-[9rem] border text-[#194DA3] bg-[#d8e4f7] rounded-2xl py-2 px-4 font-bold"
                                    onClick={returnToPageOne}
                                >
                                    <GrLinkPrevious style={{ color: '#fff' }} />
                                </span>

                                {completeAssets.map((asset, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <small className="font-semibold">
                                                Complete Asset {index + 1}
                                            </small>
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

                                        <Select
                                            value={completeAssetInputVal[index]}
                                            options={selectAssetsOptions}
                                            placeholder="Gas Type"
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
                                ))}
                                <div className="flex flex-col items-end">
                                    <Button
                                        color="#fff"
                                        variant="solid"
                                        size="sm"
                                        disabled={false}
                                        loading={false}
                                        className="mt-auto align-baseline bg-[#194DA3] rounded-md"
                                        onClick={handleAddCompleteAsset}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        )}

                        {cylinderPageTwo && (
                            <div>
                                <span
                                    className="flex items-center gap-1 cursor-pointer absolute top-5 left-[9rem] border text-[#194DA3] bg-[#d8e4f7] rounded-2xl py-2 px-4 font-bold"
                                    onClick={returnToPageOne}
                                >
                                    <GrLinkPrevious style={{ color: '#fff' }} />
                                </span>
                                {cylinderAssets.map((asset, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col gap-4 mb-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <small className="font-semibold">
                                                Cylinder {index + 1}
                                            </small>
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

                                        <Select
                                            value={
                                                inCompleteAssetInputVal[index]
                                            }
                                            options={selectAssetsOptions}
                                            placeholder="Gas Type"
                                            onChange={(selectedOption) => {
                                                handleInCompleteAssetChange(
                                                    index,
                                                    selectedOption
                                                )
                                            }}
                                        />
                                    </div>
                                ))}
                                <div className="flex flex-col items-end">
                                    <Button
                                        color="#fff"
                                        variant="solid"
                                        size="sm"
                                        disabled={false}
                                        loading={false}
                                        className="mt-auto align-baseline bg-[#194DA3] rounded-md"
                                        onClick={handleAddCylinderAsset}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className="flex align-baseline pb-6">
                            <Button
                                block
                                variant="solid"
                                disabled={onBoardBtnDiabled}
                                className="bg-[#194DA3] hover:bg-[#194da6] disabled:opacity-50 disabled:cursor-not-allowed text-[#000] font-bold px-12 py-3 rounded-lg"
                                onClick={handleOnboardBtn}
                            >
                                Onboard
                            </Button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default AddOnAssetTable
