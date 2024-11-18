import React from 'react'
import { Field, FieldProps } from 'formik'
import { Select } from '@/components/ui'

interface ManufacturerNameFieldProps {
    value?: string
    onChange: (value: string) => void
}

const ManufacturerNameField: React.FC<ManufacturerNameFieldProps> = ({
    value,
    onChange,
}) => {
    const manufacturerNameOptions = [
        { label: 'homefort', value: 'homefort' },
        { label: 'amazon', value: 'amazon' },
        { label: 'amor', value: 'amor' },
    ]

    const selectedOption = manufacturerNameOptions.find(
        (option) => option.value === value
    )

    const handleChange = (option: any) => {
        const selectedValue = option?.value || '' // Ensure selected value is always a string
        onChange(selectedValue)
    }

    return (
        <Field name="manufacturerName">
            {({ field, form }: FieldProps) => (
                <Select
                    field={field}
                    form={form}
                    placeholder="Manufacturer Name"
                    value={selectedOption}
                    options={manufacturerNameOptions}
                    isMulti={false}
                    onChange={handleChange}
                />
            )}
        </Field>
    )
}

export default ManufacturerNameField
