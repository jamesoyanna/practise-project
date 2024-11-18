import Button from '@/components/ui/Button'
import { RiAddLine } from 'react-icons/ri'
import { toggleNewOrderDialog, useAppDispatch } from '../../store/slices/orders'

// ActionBar component for displaying action buttons
const ActionBar = () => {
    const dispatch = useAppDispatch()

    // Function to handle adding a new order
    const onAddNewOrder = () => {
        dispatch(toggleNewOrderDialog(true)) // Dispatch action to toggle new order dialog
    }

    return (
        <div className="lg:flex items-center justify-between mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <Button
                    size="md"
                    variant="solid"
                    icon={<RiAddLine />}
                    onClick={onAddNewOrder}
                >
                    Create New Order
                </Button>
            </div>
        </div>
    )
}

export default ActionBar
