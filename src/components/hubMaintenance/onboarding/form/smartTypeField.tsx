import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select } from '@/components/ui';

interface SmartDeviceFieldProps {
  value?: string;
  onChange: (value: string) => void;
}

const SmartDeviceField: React.FC<SmartDeviceFieldProps> = ({ value, onChange }) => {
  const smartDeviceOptions = [
    { label: 'Volumetric GasBot', value: 'volumetricgasbot' },
    { label: 'Weigh GasBot (B2C)', value: 'weighgasbot(b2c)' },
    { label: 'Weigh GasBot (B2B)', value: 'weighgasbot(b2b)' },
  ];

  const selectedOption = smartDeviceOptions.find(option => option.value === value);

  const handleChange = (option: any) => {
    const selectedValue = option?.value || ''; // Ensure selected value is always a string
    onChange(selectedValue);
  };

  return (
    <Field name="smartDevice">
      {({ field, form }: FieldProps) => (
        <Select
          field={field}
          form={form}
          placeholder="Smart Device Type"
          value={selectedOption}
          options={smartDeviceOptions}
          isMulti={false}
          onChange={handleChange}
        />
      )}
    </Field>
  );
};

export default SmartDeviceField;
