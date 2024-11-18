import DatePicker from '@/components/ui/DatePicker'

// Component for the accounting top bar in the accounting section
const AccountingTopbar = () => {
    const date = new Date() // Creating a new Date object
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Text indicating the last update time */}
            <div className="col-span-2 lg:col-span-1 text-gray-500 text-lg">
                Last updated as at 12:30pm
            </div>

            {/* DatePicker component for selecting date */}
            <div className="col-span-2 lg:col-span-1 mx-4">
                <DatePicker inputFormat="MMM, DD YYYY" defaultValue={date} />
            </div>

            {/* Text indicating monthly accumulation */}
            <div className="col-span-2 lg:col-span-1 text-gray-500 text-xl">
                Monthly Accumulation
            </div>
        </div>
    )
}

export default AccountingTopbar;