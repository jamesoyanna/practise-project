import { injectReducer } from '@/store'
import Dialog from '@/components/ui/Dialog'
import NewOrderForm from './NewOrderForm'
import reducer, {
    toggleNewOrderDialog,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/orders'
import StockOrderForm from './StockOrderForm'

injectReducer('OrderList', reducer)

// NewOrderDialog component for displaying dialog to create a new order
const NewOrderDialog = () => {
    const dispatch = useAppDispatch() // Initialize dispatch function

    const userData = useAppSelector((state) => state)
    const staff_role = userData.auth.user.authority
    console.log("Staff role", staff_role)

    const newOrderDialog = userData.OrderList.data.newOrderDialog

    // Function to handle closing the dialog
    const onDialogClose = () => {
        dispatch(toggleNewOrderDialog(false))
    }

    return (
        <Dialog
            isOpen={newOrderDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h6 className="text-blue-800">
                {' '}
                <span className="bg-blue-100 bg-opacity-50 px-4 py-2 rounded-2xl">
                    Create Refill Order
                </span>
            </h6>

            <div className="mt-4">

            {staff_role?.includes("SUPER_ADMIN")? (
                 <StockOrderForm />
                ) :(
                  <NewOrderForm />
                )}
              
            </div>
        </Dialog>
    )
}

export default NewOrderDialog
