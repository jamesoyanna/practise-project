import AdaptableCard from '@/components/shared/AdaptableCard'
import ExpenseTable from '@/components/accounting/ExpenseTable';
import ExpenseDialog from '@/components/accounting/ExpenseDialog';
// Component for rendering the list of expenses
const Expenses = () => {

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h4 className="mb-4 lg:mb-0 ml-8">Daily opearional Expenses.</h4>
                <div className="flex flex-col lg:flex-row lg:items-center mt-8 mr-4">
                    <ExpenseDialog />
                </div>
            </div>
            <ExpenseTable />
        </AdaptableCard>
    )
}

export default Expenses;
