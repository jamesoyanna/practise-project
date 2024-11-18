import { DatePicker } from '@/components/ui'
import { useState } from 'react'

const TransactionHistoryDateFilter = () => {
    const [date, setDate] = useState()
    const handleDateOnChange = () => {
        setDate(date)
    }

    return (
        <div>
            <DatePicker
                inputFormat="MMM, DD YYYY"
                defaultValue={new Date()}
                className="w-[11rem]"
                onChange={handleDateOnChange}
            />
        </div>
    )
}

export default TransactionHistoryDateFilter
