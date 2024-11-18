import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Input, Select } from '../ui'
import { FaTimes } from 'react-icons/fa'

interface OptionType {
    value: string
    label: string
}

const kinRelationshipOptions: OptionType[] = [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Child', label: 'Child' },
    { value: 'Other', label: 'Other' },
]

interface HubFormPageTwoProps {
    hubFormData: {
        id: string
        hubImg: string
        // hubPhoneNumber: number
        hubId: string
        hubName: string
        hubState: number
        hubLocation: string
        dateRegistered: string
        // status: number
        servicingLocalGovernment: LocalGovernment[]
        nextOfKin: {
            nextOfKinFirstName: string
            nextOfKinLastName: string
            nextOfKinPhoneNumber: string
            nextOfKinAddress: string
            nextOfKinRelationship: string
        }
        hubManagerFirstName: string
        hubManagerLastName: string
        hubManagerEmail: string
        hubManagerPhoneNo: string
        hubManagerId: string
        hubManagerAdress: string
    }
    setHubFormData: React.Dispatch<
        React.SetStateAction<{
            id: string
            hubImg: string
            // hubPhoneNumber: number
            hubId: string
            hubName: string
            hubState: number
            hubLocation: string
            dateRegistered: string
            // status: number
            servicingLocalGovernment: LocalGovernment[]
            nextOfKin: {
                nextOfKinFirstName: string
                nextOfKinLastName: string
                nextOfKinPhoneNumber: string
                nextOfKinAddress: string
                nextOfKinRelationship: string
            }
            hubManagerFirstName: string
            hubManagerLastName: string
            hubManagerEmail: string
            hubManagerPhoneNo: string
            hubManagerId: string
            hubManagerAdress: string
        }>
    >
}

export const HubFormPageTwo: React.FC<HubFormPageTwoProps> = ({
    hubFormData,
    setHubFormData,
}) => {
    const handleChange = (name: string, value: string) => {
        setHubFormData({ ...hubFormData, [name]: value })
    }

    const handleNextOfKinChange = (name: string, value: string) => {
        setHubFormData((prevState) => ({
            ...prevState,
            nextOfKin: {
                ...prevState.nextOfKin,
                [name]: value,
            },
        }))
    }

    return (
        <div className="no-scrollbar  overflow-y-auto pb-[2rem] flex flex-col gap-5 ">
            <Input
                type="text"
                placeholder="First Name"
                name="hubManagerFirstName"
                value={hubFormData.hubManagerFirstName}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('hubManagerFirstName', e.target.value)
                }
            />
            <Input
                type="text"
                placeholder="Last Name"
                name="hubManagerLastName"
                value={hubFormData.hubManagerLastName}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('hubManagerLastName', e.target.value)
                }
            />
            <Input
                type="text"
                placeholder="Email"
                name="hubManagerEmail"
                value={hubFormData.hubManagerEmail}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('hubManagerEmail', e.target.value)
                }
            />
            <Input
                type="tel"
                placeholder="Phone Number"
                name="hubManagerPhoneNo"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={hubFormData.hubManagerPhoneNo}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('hubManagerPhoneNo', e.target.value)
                }
            />
            <Input
                type="text"
                placeholder="Address"
                name="hubManagerAdress"
                value={hubFormData.hubManagerAdress}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange('hubManagerAdress', e.target.value)
                }
            />
            <Input
                type="text"
                placeholder="Next of Kin First Name"
                name="nextOfKinFirstName"
                value={hubFormData.nextOfKin.nextOfKinFirstName}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNextOfKinChange('nextOfKinFirstName', e.target.value)
                }
            />
            <Input
                type="text"
                placeholder="Next of Kin Last Name"
                name="nextOfKinLastName"
                value={hubFormData.nextOfKin.nextOfKinLastName}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNextOfKinChange('nextOfKinLastName', e.target.value)
                }
            />
            <div>
                <Select
                    id="nextOfKinRelationship"
                    name="nextOfKinRelationship"
                    value={{
                        value: hubFormData.nextOfKin.nextOfKinRelationship,
                        label: hubFormData.nextOfKin.nextOfKinRelationship,
                    }}
                    options={kinRelationshipOptions}
                    defaultInputValue="Relationship"
                    placeholder="Relationship"
                    className="text-xs"
                    onChange={(selectedOption: OptionType | null) =>
                        selectedOption &&
                        handleNextOfKinChange(
                            'nextOfKinRelationship',
                            selectedOption.value as string
                        )
                    }
                />
            </div>
            <Input
                type="tel"
                placeholder="Next of Kin Phone Number"
                name="nextOfKinPhoneNumber"
                value={hubFormData.nextOfKin.nextOfKinPhoneNumber}
                className="text-xs"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNextOfKinChange(
                        'nextOfKinPhoneNumber',
                        e.target.value
                    )
                }
            />
        </div>
    )
}

export interface LocalGovernment {
    id: number
    state_id: number
    name: string
}
interface RegisterHubProps {
    hubName: string
    hubAddress: string
    hubState: number
    selectedLocalGovernments: LocalGovernment[]
    error: string
    onNext: (event: any) => void
    onHubNameChange: (value: string) => void
    onHubAddressChange: (value: string) => void
    onHubStateChange: (value: number) => void
    onLocalGovernmentsChange: (selectedLGs: LocalGovernment[]) => void // Adjusted type
}

const RegisterHub: React.FC<RegisterHubProps> = ({
    hubName,
    hubAddress,
    selectedLocalGovernments,
    hubState,
    onNext,
    error,
    onHubNameChange,
    onHubAddressChange,
    onHubStateChange,
    onLocalGovernmentsChange,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('')

    const [stateOptions, setStateOptions] = useState<
        { label: string; value: number }[]
    >([])
    const [localGovernmentOptions, setLocalGovernmentOptions] = useState<
        { label: string; value: number }[]
    >([])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {
        const fetchStateOptions = async () => {
            try {
                const response = await fetch(
                    'https://homefort-be-staging-41ad105d39de.herokuapp.com/v1/auth/states'
                )
                const result = await response.json()

                console.log('Received state data from API:', result)

                if (result.status) {
                    const options = result.data.map(
                        (item: { id: number; name: string }) => ({
                            value: item.id,
                            label: item.name,
                        })
                    )
                    setStateOptions(options)
                } else {
                    console.error('Error in state response:', result.message)
                }
            } catch (error) {
                console.error('Error fetching state options:', error)
            }
        }

        fetchStateOptions()
    }, [])

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

        if (hubState) {
            fetchLocalGovernmentOptions(hubState)
        } else {
            setLocalGovernmentOptions([])
        }
    }, [hubState])


    const handleSelect = (value: number) => {
        const selectedGov = localGovernmentOptions.find(gov => gov.value === value);
        if (selectedGov && selectedGov.label.trim() !== '') { // Check if selectedGov is not null and if its label is not empty
            if (!selectedLocalGovernments.some(gov => gov.id === value)) {
                const updatedLocalGovernments = [
                    ...selectedLocalGovernments,
                    { id: selectedGov.value, state_id: hubState, name: selectedGov.label },
                ];
                onLocalGovernmentsChange(updatedLocalGovernments);
            }
        }
    };
    
    
    
    
    console.log("Selected Local Governments:", selectedLocalGovernments);

    

    const handleRemove = (event: React.MouseEvent, localGov: LocalGovernment) => {
        event.preventDefault();
        const updatedLocalGovernments = selectedLocalGovernments.filter(
            (gov) => gov !== localGov
        );
        onLocalGovernmentsChange(updatedLocalGovernments);
    };
    


    
    

    return (
        <div className="no-scrollbar h-full overflow-y-auto pb-[2rem] flex flex-col gap-5 ">
            <div className="flex flex-col gap-5 flex-grow">
                <Input
                    type="text"
                    placeholder="Hub Name"
                    name="hubName"
                    value={hubName}
                    className="text-xs"
                    onChange={(e) => onHubNameChange(e.target.value)}
                />
                <Select
                    placeholder="State"
                    value={stateOptions.find(
                        (option) => option.value === hubState
                    )}
                    options={stateOptions.map((state) => ({
                        label: state.label,
                        value: state.value,
                    }))}
                    className="text-xs"
                    onChange={(selectedOption) =>
                        onHubStateChange(
                            selectedOption ? selectedOption.value : 0
                        )
                    }
                />

<div className="relative">
    <Input
        type="text"
        placeholder="Selected Local Governments"
        value={selectedLocalGovernments.length > 1 ? selectedLocalGovernments.map(gov => gov.name).join(', ') : selectedLocalGovernments.length === 1 ? selectedLocalGovernments[0].name : ''}
        className="text-xs px-3 py-1 w-full mb-1 border border-gray-300 rounded-md overflow-x-auto"
        readOnly={true}
        onClick={() => setDropdownOpen(!dropdownOpen)}
    />

    {dropdownOpen && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto rounded-md shadow-lg">
            {localGovernmentOptions
                .filter((gov) =>
                    gov.label
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                )
                .map((gov) => (
                    <li
                        key={gov.value}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect(gov.value)}
                    >
                        <input
                            type="checkbox"
                            name={gov.label}
                            value={gov.value}
                            checked={selectedLocalGovernments.some(
                                (selected) =>
                                    selected.id === gov.value
                            )}
                            className="mr-2"
                            onChange={() => handleSelect(gov.value)}

                            // onClick={(event) =>
                            //     handleRemove(event, selectedLocalGovernments[selectedLocalGovernments.length - 1])
                            // }                            
                            />
                        {gov.label}
                    </li>
                ))}
        </ul>
    )}

    <div className="flex flex-wrap">
        {selectedLocalGovernments.length > 0 && (
            <div
                className="inline-flex items-center bg-gray-200 rounded-md px-3 py-1 mr-1 mb-1"
            >
                <span className="mr-2">{selectedLocalGovernments[selectedLocalGovernments.length - 1].name}</span>
                <button
                    className="text-red-600 hover:text-red-800"
                     onClick={(event) => handleRemove(event, selectedLocalGovernments[selectedLocalGovernments.length - 1])}>
                    
                    <FaTimes />
                </button>
            </div>
        )}
    </div>
</div>


                <Input
                    type="text"
                    placeholder="Hub Address"
                    name="hubAddress"
                    value={hubAddress}
                    className="text-xs"
                    onChange={(e) => onHubAddressChange(e.target.value)}
                />
            </div>

            <p className="text-[#ff0000] text-sm font-medium">{error}</p>
            <div className="w-full flex mt-[20%] align-bottom pb-4 ">
                <Button
                    variant="solid"
                    className="w-[100%]  align-baseline text-base"
                    onClick={(event) => {
                        onNext(event); 
                    }}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

export default RegisterHub
