import { DatePicker } from '@/components/ui'
import { useState } from 'react'

const ManufacturedDateFilter = () => {
    const [date, setDate] = useState()
    const handleDateOnChange = () => {
        setDate(date)
    }

    return (
        <div>
            <DatePicker
                inputFormat="MMM, DD YYYY"
                defaultValue={new Date()}
                className="w-full"
                onChange={handleDateOnChange}
                placeholder='Select Date Manufactured'
            />
        </div>
    )
}

export default ManufacturedDateFilter



