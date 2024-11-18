import { forwardRef, useState } from 'react'
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import hooks from '@/components/ui/hooks'
import StickyFooter from '@/components/shared/StickyFooter'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Form, Formik, FormikProps } from 'formik'
import InformationFields from './HubInfoFields'

import cloneDeep from 'lodash/cloneDeep'
import { HiOutlineTrash } from 'react-icons/hi'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
type FormikRef = FormikProps<any>

// Define initial data structure
type InitialData = {
    id?: string
    name?: string
    img?: string
}

// Define form model with required and optional fields
export type FormModel = Omit<InitialData, 'tags'> & {
    tags: { label: string; value: string }[] | string[]
}
// Define function type for setting submitting state
export type SetSubmitting = (isSubmitting: boolean) => void

// Define function type for handling delete action
export type OnDeleteCallback = React.Dispatch<React.SetStateAction<boolean>>

type OnDelete = (callback: OnDeleteCallback) => void

// Define type for HubForm component
type HubForm = {
    initialData?: InitialData
    type: 'edit' | 'new'
    onDiscard?: () => void
    onDelete?: OnDelete
    onFormSubmit: (formData: FormModel, setSubmitting: SetSubmitting) => void
}

// Import custom hook from hooks
const { useUniqueId } = hooks

// Define validation schema for form fields
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Hub Name Required'),
    phoneNUmber: Yup.number().required('Phone number Required'),
    hubId: Yup.number().required('hub location Required'),
})

// Component for rendering delete button with confirmation dialog
const DeleteHubButton = ({ onDelete }: { onDelete: OnDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
    }

    return (
        <>
            <Button
                className="text-red-600"
                variant="plain"
                size="sm"
                icon={<HiOutlineTrash />}
                type="button"
                onClick={onConfirmDialogOpen}
            >
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="Delete hub"
                confirmButtonColor="red-600"
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
            >
                <p>
                    Are you sure you want to delete this hub?. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

// Forward ref to access Formik props
const HubForm = forwardRef<FormikRef, HubForm>((props, ref) => {
    const {
        type,
        initialData = {
            id: '',
            name: '',
            img: '',
            description: '',
        },
        onFormSubmit,
        onDelete,
    } = props

    const newId = useUniqueId('hub-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values: FormModel, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    if (type === 'new') {
                        formData.id = newId
                    }
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <InformationFields
                                        touched={touched}
                                        errors={errors}
                                    />
                            
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteHubButton
                                            onDelete={onDelete as OnDelete}
                                        />
                                    )}
                                </div>
                                <div className="md:flex items-center">
                                    <Button
                                        size="lg"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        Create Hub
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

// Assign display name for the HubForm component
HubForm.displayName = 'HubForm';

export default HubForm;
