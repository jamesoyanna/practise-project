import { DatePicker, Input, Select } from '@/components/ui'
import { ChangeEvent, useEffect, useState } from 'react'
import { NewChecked, OldChecked } from './AddOnAssetRadioDropDown'


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
    const [isOldChecked, setIsOldChecked] = useState(false)
    const [isNewChecked, setIsNewChecked] = useState(false)
    const [error, setError] = useState('')

    const handleDateOnChange = (date: Date | null) => {
        setDate(date)
    }

    useEffect(() => {
        // Function to fetch options from the API
        const fetchOptions = async () => {
            try {
                const response = await fetch(
                    'https://homefort-be-staging-41ad105d39de.herokuapp.com/v1/auth/states'
                ) 
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

    const handleOldCylinder = () => {
        setIsOldChecked(true)
        setIsNewChecked(false)
    }

    const handleNewCylinder = () => {
        setIsNewChecked(true)
        setIsOldChecked(false)
    }

    const onFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (
            date &&
            state &&
            localGovernment &&
            homeAddress &&
            (isNewChecked || isOldChecked)
        ) {
            onClick(event)
        } else {
            setError('all fields are required')
        }
    }

    return (
        <div className="no-scrollbar h-full overflow-y-auto my-6 py-[2rem]">
            <form className="flex flex-col gap-4 text-sm">
                <DatePicker
                    inputFormat="MMM, DD YYYY"
                  placeholder='Select Onboarding Date'
                    className='text-sm'
                    style={{fontSize:"14px"}}
                    value={date}
                    onChange={handleDateOnChange}
                />
                <Select
                    value={stateOptions.find(option => option.value === state)}
                    options={stateOptions}
                    placeholder="Select State"
                    onChange={handleState}
                />
                <Select
                    value={localGovernmentOptions.find(option => option.value === state)}
                    options={localGovernmentOptions}
                    defaultOptions={true}
                    placeholder="Select Local Government"
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
                <div className="bg-[#f5f5f5] p-[10px]">
                    <label className="flex bg-[#f5f5f5] text-[10px] gap-4 mr-[5px]">
                        <input
                            type="radio"
                            checked={isNewChecked}
                            onChange={handleNewCylinder}
                        />
                        Customer wants a new 12Kg cylinder
                    </label>
                </div>
                <p className="text-[#ff0000] font-semibold text-sm">{error}</p>
                {isNewChecked && <NewChecked chargeCustomer={onFormSubmit} />}
                <div className="bg-[#f5f5f5] p-[10px]">
                    <label className="flex bg-[#f5f5f5] text-[10px] gap-4 mr-[5px]">
                        <input
                            type="radio"
                            checked={isOldChecked}
                            onChange={handleOldCylinder}
                        />
                        Customer has a 12Kg cylinder
                    </label>
                </div>
                {isOldChecked && <OldChecked chargeCustomer={onFormSubmit} />}
            </form>
        </div>
    )
}

export default AddOnAssetTable
