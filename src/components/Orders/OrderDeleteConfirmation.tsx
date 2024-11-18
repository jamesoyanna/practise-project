import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
    deleteOrders,
    getOrders,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders'

// OrderDeleteConfirmation component for handling order deletion confirmation
const OrderDeleteConfirmation = () => {
    const dispatch = useAppDispatch() // Initialize dispatch function
    const selectedRows = useAppSelector(
        (state) => state.OrderList.data.selectedRows
    )
    const selectedRow = useAppSelector(
        (state) => state.OrderList.data.selectedRow
    )
    const deleteMode = useAppSelector(
        (state) => state.OrderList.data.deleteMode
    )
    const tableData = useAppSelector(
        (state) => state.OrderList.data.tableData
    )

     // Function to handle dialog close event
    const onDialogClose = () => {
        dispatch(setDeleteMode('')) // Reset delete mode

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([])) // Clear selected row
        }
    }

     // Function to handle order deletion
    const onDelete = async () => {
        dispatch(setDeleteMode('')) // Reset delete mode

        if (deleteMode === 'single') {
            const success = await deleteOrders({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteOrders({ id: selectedRows }) // Delete single order
            deleteSucceed(success, selectedRows.length) // Handle delete success
            dispatch(setSelectedRows([])) // Clear selected row
        }
    }

    // Function to handle delete success
    const deleteSucceed = (success: boolean, orders = 0) => {
        if (success) {
            dispatch(getOrders(tableData))  // Fetch updated orders
            toast.push( // Show success notification
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={3000}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            type="danger"
            title="Delete order"
            confirmButtonColor="red-600"
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            onCancel={onDialogClose}
            onConfirm={onDelete}
        >
            <p className='text-base'>
                Are you sure you want to delete this order?. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default OrderDeleteConfirmation
