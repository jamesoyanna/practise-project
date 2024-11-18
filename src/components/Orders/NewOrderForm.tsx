import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import { Field, Form, Formik, FieldProps } from 'formik'
import { HiCheck } from 'react-icons/hi'
import { components, MultiValueGenericProps, OptionProps } from 'react-select'
import {
    toggleNewOrderDialog,
    useAppDispatch,
} from '../../store/slices/orders'
import * as Yup from 'yup'

// Define the shape of the form model
type FormModel = {
    title: string
    content: string
    assignees: {
        img: string
        name: string
        label: string
    }[]
}
const { MultiValueLabel } = components

// CustomSelectOption component for customizing Select options
const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<{ img: string }>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.img} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

// CustomControlMulti component for customizing Select multi-value control
const CustomControlMulti = ({ children, ...props }: MultiValueGenericProps) => {
    const { img } = props.data

    return (
        <MultiValueLabel {...props}>
            <div className="inline-flex items-center">
                <Avatar
                    className="mr-2 rtl:ml-2"
                    shape="circle"
                    size={15}
                    src={img}
                />
                {children}
            </div>
        </MultiValueLabel>
    )
}

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
    title: Yup.string().min(3, 'Too Short!').required('Title required'),
    content: Yup.string().required('Title required'),
    assignees: Yup.array().min(1, 'filed required'),
    rememberMe: Yup.bool(),
})

// NewOrderForm component for rendering the form to create a new order
const NewOrderForm = () => {
    const dispatch = useAppDispatch() // Initialize dispatch function

        // Function to handle form submission
    const onSubmit = (
        formValue: FormModel,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        setSubmitting(true); // Set submitting state to true

        dispatch(toggleNewOrderDialog(false)) // Dispatch action to close new order dialog
    }

    return (
        <Formik
            initialValues={{
                title: '',
                content: '',
                assignees: [],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting)
            }}
        >
            {({ touched, errors, values }) => (
                <Form>
                    <FormContainer>
                        <FormItem
                            label="Select Customer"
                            invalid={
                                (errors.assignees && touched.assignees) as ''
                            }
                            errorMessage={errors.assignees as string}
                        >
                            <Field name="customer">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        isMulti
                                        className="min-w-[120px]"
                                        components={{
                                            Option: CustomSelectOption,
                                            MultiValueLabel: CustomControlMulti,
                                        }}
                                        field={field}
                                        form={form}
                                        value={values.assignees}
                                        onChange={(option) => {
                                            form.setFieldValue(
                                                field.name,
                                                option
                                            )
                                        }}
                                    />
                                )}
                            </Field>
                            
                        </FormItem>
                        <FormItem
                            label="Cylinder Size"
                            invalid={
                                (errors.assignees && touched.assignees) as ''
                            }
                            errorMessage={errors.assignees as string}
                        >
                            <Field name="cylinderSize">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        isMulti
                                        className="min-w-[120px]"
                                        components={{
                                            Option: CustomSelectOption,
                                            MultiValueLabel: CustomControlMulti,
                                        }}
                                        field={field}
                                        form={form}
                                        value={values.assignees}
                                        onChange={(option) => {
                                            form.setFieldValue(
                                                field.name,
                                                option
                                            )
                                        }}
                                    />
                                )}
                            </Field>
                            
                        </FormItem>
                        <FormItem
                            label="Select Delivery Officer"
                            invalid={
                                (errors.assignees && touched.assignees) as ''
                            }
                            errorMessage={errors.assignees as string}
                        >
                            <Field name="deliveryofficer">
                                {({ field, form }: FieldProps) => (
                                    <Select
                                        isMulti
                                        className="min-w-[120px]"
                                        components={{
                                            Option: CustomSelectOption,
                                            MultiValueLabel: CustomControlMulti,
                                        }}
                                        field={field}
                                        form={form}
                                        // options={members}
                                        value={values.assignees}
                                        onChange={(option) => {
                                            form.setFieldValue(
                                                field.name,
                                                option
                                            )
                                        }}
                                    />
                                )}
                            </Field>
                            
                        </FormItem>
                        {/* <NewTaskField onAddNewTask={handleAddNewTask} /> */}
                        {/* <Button block variant="solid" type="submit">
                            Create Order & Assign delivery Officer
                        </Button> */}
                        <Button block variant="solid" type="submit" disabled={!values.title || !values.content || !values.assignees.length}>
                        Create Order & Assign delivery Officer
                       </Button>
                    </FormContainer>
                </Form>
            )}
        </Formik>
    )
}

export default NewOrderForm;
