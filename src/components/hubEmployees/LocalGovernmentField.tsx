import React from 'react';
import { Field, FieldProps } from 'formik';
import Select, { components } from 'react-select';

interface LocalGovernmentFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const localGovernmentOptions = [
  { label: 'Agege', value: 'agege' },
  { label: 'Ikeja', value: 'ikeja' },
  { label: 'Alimosho', value: 'alimosho' },
  { label: 'Ijaiye', value: 'ijaiye' },
  { label: 'Kosofe', value: 'kosofe' },
];

const LocalGovernmentField: React.FC<LocalGovernmentFieldProps> = ({ value, onChange }) => {
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    onChange(selectedValues);
  };

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  const MultiValueCheckbox = (props: any) => (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        className="form-checkbox"
      />
      <label className="ml-2">{props.label}</label>
    </components.Option>
  );

  return (
    <Field name="localGovernment">
      {({ field, form }: FieldProps) => {
        const selectedOptions = localGovernmentOptions.filter(option => value.includes(option.value));

        return (
          <Select
            {...field}
            value={selectedOptions}
            options={localGovernmentOptions}
            isMulti
            onChange={handleChange}
            components={{ Option: MultiValueCheckbox }}
            styles={customStyles}
            placeholder="Select Local Government"
          />
        );
      }}
    </Field>
  );
};

export default LocalGovernmentField;
