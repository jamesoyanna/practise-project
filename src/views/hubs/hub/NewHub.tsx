import HubForm, {
    FormModel,
    SetSubmitting,
} from '@/views/hubs/hub/HubForm'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { useNavigate } from 'react-router-dom'
import { apiCreateHub } from '@/services/hubService'

// Component for creating a new hub
const NewHub = () => {
        // Hook for navigation
    const navigate = useNavigate()

    const addHub = async (data: FormModel) => {
        const response = await apiCreateHub<boolean, FormModel>(data)
        return response.data
    }

       // Handler for form submission
    const handleFormSubmit = async (
        values: FormModel,
        setSubmitting: SetSubmitting
    ) => {
        setSubmitting(true)
        const success = await addHub(values)
        setSubmitting(false)
        if (success) {
              // Display success notification
            toast.push(
                <Notification
                    title={'Successfuly added'}
                    type="success"
                    duration={2500}
                >
                    Hub successfuly added
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
                // Redirect to hub list page
            navigate('/hubs/hub-list')
        }
    }

    const handleDiscard = () => {
        navigate('/hubs/hub-list')
    }

    return (
        <>
            <HubForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default NewHub;
