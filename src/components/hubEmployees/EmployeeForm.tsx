import React from 'react';
import { Form, Formik, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { Input, Select } from '../ui';
import { HiOutlineSearch } from 'react-icons/hi'
import Button from '@/components/ui/Button';
import { FormItem, FormContainer } from '@/components/ui/Form';
import {
    addEmployee,
    toggleNewEmployeeDialog,
    useAppDispatch,
} from '../../store/slices/employees';

// Define the shape of the form model
interface FormModel {
    id: string;
    firstName: string;
    lastName: string;
    employeesName: string;
    phoneNumber: string;
    nextOfKinFirstName: string;
    nextOfKinLastName: string;
    nextOfKinPhoneNumber: string;
    designation: string; 
    customerTypeOfService: string;
    localGovernment: string;
    nextOfKinRelationship: string; 
}

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name required'),
    lastName: Yup.string().required('Last Name required'),
    phoneNumber: Yup.string().required('Phone Number required'),
    nextOfKinFirstName: Yup.string().required("Next of Kin's First Name required"),
    nextOfKinLastName: Yup.string().required("Next of Kin's Last Name required"),
    nextOfKinPhoneNumber: Yup.string().required("Next of Kin's Phone Number required"),
    designation: Yup.string().required('Designation required'),
    customerTypeOfService: Yup.string().required('Customer Type  of Service required'),
    localGovernment: Yup.array().required('Select at least one local government'),
    nextOfKinRelationship: Yup.string().required('Relationship required'), 
});

// Options for designation, customer, local government and relationship
const designationOptions = [
    { label: 'Manager', value: 'manager' },
    { label: 'Assistant Manager', value: 'assistant manager' },
    { label: 'Account Manager', value: 'account manager' },
    { label: 'Delivery Officer', value: 'delivery officer' },
    { label: 'Assistant Delivery Officer', value: 'assistant delivery officer' },
    { label: 'Hub Assitant', value: 'hub assistant' },
    { label: 'Sales Executive', value: 'sales executive' },
];

const customerOptions = [
    { label: 'Home Use (B2c)', value: 'home use' },
    { label: 'Bussiness (B2b)', value: 'business' },
];

const localGovernmentOptions = [
    { label: 'Agege', value: 'agege' },
    { label: 'Ikeja', value: 'ikeja' },
    { label: 'Ikorodu', value: 'ikorodu' },
    { label: 'Lekki', value: 'lekki' },
];

const relationshipOptions = [
    { label: 'Father', value: 'father' },
    { label: 'Mother', value: 'mother' },
    { label: 'Husband', value: 'husband' },
    { label: 'Wife', value: 'wife' },
    { label: 'Brother', value: 'brother' },
    { label: 'Sister', value: 'sister' },
    { label: 'Nephew', value: 'nephew' },
    { label: 'Niece', value: 'niece' },
    { label: 'Cousin', value: 'cousin' },
    { label: 'Uncle', value: 'uncle' },
];

const NewEmployeeForm = () => {
    const dispatch = useAppDispatch();

    const onSubmit = (formValue: FormModel, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log('Submitting form with values:', formValue);
        setSubmitting(true);

        const employeesName = `${formValue.firstName} ${formValue.lastName}`;
        const newEmployee = {
            id: crypto.randomUUID(),
            employeesName,
            phoneNumber: formValue.phoneNumber,
            designation: formValue.designation,
            customerTypeOfService: formValue.customerTypeOfService,
            localGovernment: formValue.localGovernment,
            nextOfKinFirstName: formValue.nextOfKinFirstName,
            nextOfKinLastName: formValue.nextOfKinLastName,
            nextOfKinPhoneNumber: formValue.nextOfKinPhoneNumber,
            nextOfKinRelationship: formValue.nextOfKinRelationship,
        };

        dispatch(addEmployee(newEmployee));
        dispatch(toggleNewEmployeeDialog(false));
    };
    

    return (
        <Formik
            initialValues={{
                id: '',
                firstName: '',
                lastName: '',
                employeesName: '',
                phoneNumber: '',
                nextOfKinFirstName: '',
                nextOfKinLastName: '',
                nextOfKinPhoneNumber: '',
                designation: '',
                localGovernment: '',
                customerTypeOfService: '',
                nextOfKinRelationship: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <Input type="text" placeholder="First Name" name="firstName" className="my-2 text-sm" autoComplete="off" />
                        <Input type="text" placeholder="Last Name" name="lastName" className="mb-2 text-sm" autoComplete="off" />
                        <Input type="tel" placeholder="Phone Number" name="phoneNumber" className="mb-2 text-sm" autoComplete="off" />

                        <FormItem
                            className="mb-0"
                            invalid={errors.designation && touched.designation}
                            errorMessage={errors.designation}
                        >
                            <Field name="designation">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        placeholder="Select Designation"
                                        value={designationOptions.find(option => option.value === values.designation)}
                                        options={designationOptions}
                                        isMulti={false}
                                        onChange={option => form.setFieldValue('designation', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <FormItem
                            className="mb-2 mt-2"
                            invalid={errors.customerTypeOfService && touched.customerTypeOfService}
                            errorMessage={errors.customerTypeOfService}
                        >
                            <Field name="customer">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        placeholder="Customer Type of service"
                                        value={customerOptions.find(option => option.value === values.customerTypeOfService)}
                                        options={customerOptions}
                                        isMulti={false}
                                        onChange={option => form.setFieldValue('customerTypeOfService', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <FormItem
                            className="mb-0"
                            invalid={errors.localGovernment && touched.localGovernment}
                            errorMessage={errors.localGovernment}
                        >
                            <Field name="localGovernment">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        field={field}
                                        form={form}
                                        placeholder="Select Local Government"       
                                        value={localGovernmentOptions.filter(option => field.value.includes(option.value))}
                                        options={localGovernmentOptions}
                                        isMulti
                                        onChange={(selectedOptions: any) => form.setFieldValue('localGovernment', selectedOptions.map((option: any) => option.value))}
                                    />
                                )}
                            </Field>
                        </FormItem>
                        

                        <Input type="text" placeholder="Next of Kin's First Name" name="nextOfKinFirstName" className="mt-2 text-sm" autoComplete="off" />
                        <Input type="text" placeholder="Next of Kin's Last Name" name="nextOfKinLastName" className="my-2 text-sm" autoComplete="off" />

                        <FormItem
                            className="mb-0"
                            invalid={errors.nextOfKinRelationship && touched.nextOfKinRelationship}
                            errorMessage={errors.nextOfKinRelationship}
                        >
                            <Field name="nextOfKinRelationship">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        {...field}
                                        placeholder="Select Relationship"
                                        value={relationshipOptions.find(option => option.value === field.value)}
                                        options={relationshipOptions}
                                        isMulti={false}
                                        onChange={option => form.setFieldValue('nextOfKinRelationship', option?.value)}
                                    />
                                )}
                            </Field>
                        </FormItem>

                        <Input type="tel" placeholder="Next of Kin's Phone Number" name="nextOfKinPhoneNumber" autoComplete="off" className="my-2 text-sm" />

                        <Button block variant="solid" type="submit">
                            Register Employee
                        </Button>
                       
                    </FormContainer>
                </Form>
            )}
        </Formik>
    );
};

export default NewEmployeeForm;
