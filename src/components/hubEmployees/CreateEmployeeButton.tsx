import Button from '@/components/ui/Button'
import { RiAddLine } from 'react-icons/ri'
import {
    toggleNewEmployeeDialog,
    useAppDispatch,
} from '../../store/slices/employees'

// ActionBar component for displaying action buttons
const CreateEmplyeeButton = () => {
    const dispatch = useAppDispatch()

    // Function to handle adding a new employee
    const onRegisterEmployee = () => {
        dispatch(toggleNewEmployeeDialog(true)) // Dispatch action to toggle new employee dialog
    }

    return (
        <div className="lg:flex items-center justify-between mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <Button
                    size="md"
                    variant="solid"
                    icon={<RiAddLine />}
                    onClick={onRegisterEmployee}
                >
                    Register Employee
                </Button>
            </div>
        </div>
    )
}

export default CreateEmplyeeButton
