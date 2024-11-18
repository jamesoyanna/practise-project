import React from 'react';
import { Formik, Field, FieldProps, Form } from 'formik';
import * as Yup from 'yup';
import { Select } from '@/components/ui';
import { FormItem, FormContainer } from '@/components/ui/Form';

// Define the shape of the form model
interface FormModel {
    id: string;
    deliveryOfficer: string;
}

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
    deliveryOfficer: Yup.string().required('Select a Delivery Officer'),
});

const deliveryOfficerOptions = [
    { label: 'Seun Oni', value: 'seun' },
    { label: 'Emmanuel Popoola', value: 'emmanuel' },
    { label: 'Obioma John', value: 'john' },
    { label: 'Etim Bassey', value: 'etim' },
    { label: 'Daniel Osimien', value: 'daniel' },
];

const DeliveryOfficerForm = () => {
    const onSubmit = (formValue: FormModel, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log('Submitting form with values:', formValue);
        setSubmitting(false); // Set submitting to false after form submission
    };

    return (
        <Formik
            initialValues={{
                id: '',
                deliveryOfficer: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ touched, errors, values, setFieldValue }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            className="mb-0"
                            invalid={!!(errors.deliveryOfficer && touched.deliveryOfficer)}
                            errorMessage={errors.deliveryOfficer}
                        >
                            <Field name="deliveryOfficer">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        {...field}
                                        placeholder="Select Delivery Officer"
                                        value={deliveryOfficerOptions.find(option => option.value === values.deliveryOfficer)}
                                        options={deliveryOfficerOptions}
                                        isMulti={false}
                                        onChange={option => setFieldValue('deliveryOfficer', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default DeliveryOfficerForm;
