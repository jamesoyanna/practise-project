import { useState } from 'react';
import { Form, Formik, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Select } from '../../components/ui';
import Button from '@/components/ui/Button';
import { FormItem, FormContainer } from '@/components/ui/Form';
import Checkbox from '../ui/Checkbox/Checkbox';

// Define the shape of the form model
interface FormModel {
    id: string;
    hub: string;
    orderType: string;
    logisticOfficer: string;
}

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
    hub: Yup.string().required('Hub required'),
    orderType: Yup.string().required('Order type required'),
    logisticOfficer: Yup.string().required('Select a Logistic Officer'),
});

// Options for hub, order, logistic
const hubOptions = [
    { label: 'Ogba Hub', value: 'ogba-hub' },
    { label: 'Mainland Hub', value: 'mainland-hub' },
    { label: 'Island Hub', value: 'island-hub' },
];

const orderOptions = [
    { label: 'Onboarding Stock Order', value: 'onboarding-stock-order' },
    { label: 'Stock Order', value: 'stock-order' },
];

const logisticOfficerOptions = [
    { label: 'Dada Gabriel', value: 'dada-gabriel' },
    { label: 'Femi Olarewaju', value: 'femi-olarewaju' },
    { label: 'david mark', value: 'david-mark' },
    { label: 'Mordi Chinedu', value: 'chinedu-mordi' },
];

const StockOrderForm = () => {
    const onSubmit = (formValue: FormModel, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log('Submitting form with values:', formValue);
        setSubmitting(true);

        const newOrder = {
            id: crypto.randomUUID(),
            hub: formValue.hub,
            orderType: formValue.orderType,
            logisticOfficer: formValue.logisticOfficer,
        };

        // Mock submission logic
        console.log('New Order:', newOrder);
        setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                id: '',
                hub: '',
                logisticOfficer: '',
                orderType: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            className="mb-0"
                            invalid={errors.hub && touched.hub}
                            errorMessage={errors.hub}
                        >
                            <Field name="hub">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        placeholder="Select Hub"
                                        value={hubOptions.find(option => option.value === values.hub)}
                                        options={hubOptions}
                                        isMulti={false}
                                        onChange={option => form.setFieldValue('hub', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <FormItem
                            className="mb-2 mt-2"
                            invalid={errors.orderType && touched.orderType}
                            errorMessage={errors.orderType}
                        >
                            <Field name="orderType">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        placeholder="Order Type"
                                        value={orderOptions.find(option => option.value === values.orderType)}
                                        options={orderOptions}
                                        isMulti={false}
                                        onChange={option => form.setFieldValue('orderType', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <CylinderComponent label="Filled 12kg cylinders" />
                        <CylinderComponent label="Filled 25kg cylinders" />
                        <CylinderComponent label="Filled 50kg cylinders" />

                        <p className="mb-2">Smart Device</p>
                        <CylinderComponent label="Volumetric Gasbot" />
                        <CylinderComponent label="Weigh Gasbot (B2C)" />
                        <CylinderComponent label="Weigh Gasbot (B2B)" />

                        <FormItem
                            className="mb-2 mt-2"
                            invalid={errors.logisticOfficer && touched.logisticOfficer}
                            errorMessage={errors.logisticOfficer}
                        >
                            <Field name="logisticOfficer">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        placeholder="Select Logistic Officer"
                                        value={logisticOfficerOptions.find(option => option.value === values.logisticOfficer)}
                                        options={logisticOfficerOptions}
                                        isMulti={false}
                                        onChange={option => form.setFieldValue('logisticOfficer', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <Button block variant="solid" type="submit" className='mt-5'>
                            Create Order & Assign to Logistic Officer
                        </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

const CylinderComponent = ({ label }: { label: string }) => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count > 0 ? count - 1 : 0);

    return (
        <div className="grid grid-cols-2 gap-10 items-center mb-4">
            <div className="bg-gray-100 px-3 py-2 rounded-full xs:rounded-lg flex items-center">
                <Checkbox />
                <p className="ml-2">{label}</p>
            </div>
            <div className="bg-gray-100 justify-between flex items-center px-5 py-2 rounded-full xs:rounded-lg">
                <button type="button" onClick={handleDecrement}>-</button>
                <p className="mx-2">{count}</p>
                <button type="button" onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

export default StockOrderForm;
