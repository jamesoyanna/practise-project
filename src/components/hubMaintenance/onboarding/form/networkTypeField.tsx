import React from 'react'
import { Field, FieldProps } from 'formik'
import { Select } from '@/components/ui'

interface NetworkTypeFieldProps {
    value?: string
    onChange: (value: string) => void
}

const NetworkTypeField: React.FC<NetworkTypeFieldProps> = ({
    value,
    onChange,
}) => {
    const networkTypeOptions = [
        { label: 'GSM', value: 'gsm' },
        { label: 'WIFI', value: 'wifi' },
    ]

    const selectedOption = networkTypeOptions.find(
        (option) => option.value === value
    )

    const handleChange = (option: any) => {
        const selectedValue = option?.value || '' // Ensure selected value is always a string
        onChange(selectedValue)
    }

    return (
        <Field name="networkType">
            {({ field, form }: FieldProps) => (
                <Select
                    field={field}
                    form={form}
                    placeholder="Network Type "
                    value={selectedOption}
                    options={networkTypeOptions}
                    isMulti={false}
                    onChange={handleChange}
                />
            )}
        </Field>
    )
}

export default NetworkTypeField
