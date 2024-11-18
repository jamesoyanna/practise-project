
import AccountingTopbar from "@/components/accounting/AccountingTopbar"
import DashboardAnalyticsData from '@/components/accounting/AccountingAnalytics'
import Expenses from './Expenses'

const Accounting = () => {

  return (
<div className="flex flex-col gap-4 h-full">
<h4 className="ml-8 lg:mb-0">Accounting</h4>
    <AccountingTopbar />
    <DashboardAnalyticsData />
    <Expenses />

</div>
  )
}

export default Accounting