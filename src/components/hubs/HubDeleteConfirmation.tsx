import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    toggleDeleteConfirmation,
    deleteHub,
    getHubs,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/hubs'

// HubDeleteConfirmation component for confirming hub deletion
const HubDeleteConfirmation = () => {
    const dispatch = useAppDispatch() // Initialize useDispatch hook to dispatch actions
    // Select dialogOpen state from Redux store
    const dialogOpen = useAppSelector(
        (state) => state.hubList.data.deleteConfirmation
    )
    // Select selectedHub state from Redux store
    const selectedHub = useAppSelector(
        (state) => state.hubList.data.selectedHub
    )
    // Select tableData state from Redux store
    const tableData = useAppSelector(
        (state) => state.hubList.data.tableData
    )

       // Function to handle dialog close event
    const onDialogClose = () => {
        // Dispatch action to close delete confirmation dialog
        dispatch(toggleDeleteConfirmation(false))
    }

     // Function to handle hub deletion
    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false)) // Dispatch action to close delete confirmation dialog
       // Call deleteHub action to delete the hub
        const success = await deleteHub({ id: selectedHub }) 

        if (success) {
            dispatch(getHubs(tableData)) // Dispatch action to fetch updated hub list
            toast.push( // Display success notification using toast
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Hub successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            type="danger"
            title="Delete Hub"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p>
                Are you sure you want to delete this hub?. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default HubDeleteConfirmation;
