import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select } from '../ui';

interface DesignationFieldProps {
  value?: string;
  onChange: (value: string) => void;
}

const DesignationField: React.FC<DesignationFieldProps> = ({ value, onChange }) => {
  const designationOptions = [
    { label: 'Manager', value: 'manager' },
    { label: 'Assistant Manager', value: 'assistant manager' },
    { label: 'Delivery Officer', value: 'delivery officer' },
    { label: 'Assistant Delivery Officer', value: 'Assistant Delivery Officer' },
    { label: 'Hub Assistant', value: 'hub assistant' },
    { label: 'Sales Executive', value: 'sales executive' },
  ];

  const selectedOption = designationOptions.find(option => option.value === value);

  const handleChange = (option: any) => {
    const selectedValue = option?.value || ''; // Ensure selected value is always a string
    onChange(selectedValue);
  };

  return (
    <Field name="designation">
      {({ field, form }: FieldProps) => (
        <Select
          field={field}
          form={form}
          placeholder="Select Designation"
          value={selectedOption}
          options={designationOptions}
          isMulti={false}
          onChange={handleChange}
        />
      )}
    </Field>
  );
};

export default DesignationField;
