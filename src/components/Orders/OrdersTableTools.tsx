import Button from '@/components/ui/Button'
import { HiOutlineTrash } from 'react-icons/hi'
import { setDeleteMode, useAppDispatch, useAppSelector } from '../../store/slices/orders'
import NewOrderDialog from './NewOrderDialog'
import ActionBar from './ActionBar'

// BatchDeleteButton component for rendering batch delete button
const BatchDeleteButton = () => {
    const dispatch = useAppDispatch() // Get dispatch function

       // Function to handle batch delete
    const onBatchDelete = () => {
        dispatch(setDeleteMode('batch')) // Set delete mode to batch
    }

    return (
        <Button
            variant="solid"
            color="red-600"
            size="sm"
            icon={<HiOutlineTrash />}
            onClick={onBatchDelete}
        >
            Batch Delete
        </Button>
    )
}

// OrdersTableTools component for rendering tools for orders table
const OrdersTableTools = () => {
    const selectedRows = useAppSelector(
        (state) => state.OrderList.data.selectedRows
    ) // Get selected rows from Redux store
    return (
        <div className="md:flex items-center justify-between">
        <div className="md:flex items-center gap-4">
        {selectedRows.length > 0 && <BatchDeleteButton />}
        </div>
        <ActionBar />
        <NewOrderDialog />
    </div>
    )
}

export default OrdersTableTools
