import AdaptableCard from '@/components/shared/AdaptableCard'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Field, FormikErrors, FormikTouched } from 'formik'

// Define type for form fields
type FormFieldsName = {
    name: string
    description: string
}

type InformationFields = {
    touched: FormikTouched<FormFieldsName>
    errors: FormikErrors<FormFieldsName>
}

// Component for rendering information fields
const InformationFields = (props: InformationFields) => {
    const { touched, errors } = props

    return (
        <AdaptableCard divider className="mb-4 px-8">
            <h5> Information</h5>
            <p className="mb-6">Section to add hub information</p>
            <FormItem
                label="Hub Name"
                invalid={(errors.name && touched.name) as boolean}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Hub Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Hub Location"
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="location"
                    placeholder="Location"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Phone Number"
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phone number"
                    placeholder="Phone Number"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default InformationFields;
