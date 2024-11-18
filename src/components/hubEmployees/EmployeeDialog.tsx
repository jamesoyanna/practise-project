import { injectReducer } from '@/store'
import Dialog from '@/components/ui/Dialog'
import EmployeeForm from './EmployeeForm'
import reducer, {
    toggleNewEmployeeDialog,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/employees'

injectReducer('EmployeeList', reducer)

// EmployeeDialog component for displaying dialog to create a new employee
const EmployeeDialog = () => {
    const dispatch = useAppDispatch() // Initialize dispatch function

    const newEmployeeDialog = useAppSelector(
        (state) => state.EmployeeList.data.newEmployeeDialog
    )

    // Function to handle closing the dialog
    const onDialogClose = () => {
        dispatch(toggleNewEmployeeDialog(false))
    }

    return (
        <Dialog
            isOpen={newEmployeeDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h6 className="text-blue-800">
                {' '}
                <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                    Register Employee
                </span>
            </h6>

            <div className="mt-4">
                <EmployeeForm />
            </div>
        </Dialog>
    )
}

export default EmployeeDialog
