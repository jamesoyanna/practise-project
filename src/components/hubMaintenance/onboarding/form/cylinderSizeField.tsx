import React from 'react';
import { Field, FieldProps } from 'formik';
import { Select } from '@/components/ui';

interface CylinderSizeFieldProps {
  value?: string;
  onChange: (value: string) => void;
}

const CylinderSizeField: React.FC<CylinderSizeFieldProps> = ({ value, onChange }) => {
  const cylinderSizeOptions = [
    { label: '12kg', value: '12kg' },
    { label: '25kg', value: '25kg' },
    { label: '50kg', value: '50kg' },
  ];

  const selectedOption = cylinderSizeOptions.find(option => option.value === value);

  const handleChange = (option: any) => {
    const selectedValue = option?.value || ''; // Ensure selected value is always a string
    onChange(selectedValue);
  };

  return (
    <Field name="cylinderSize">
      {({ field, form }: FieldProps) => (
        <Select
          field={field}
          form={form}
          placeholder="Cylinder Size"
          value={selectedOption}
          options={cylinderSizeOptions}
          isMulti={false}
          onChange={handleChange}
        />
      )}
    </Field>
  );
};

export default CylinderSizeField;
