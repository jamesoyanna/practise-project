import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/'
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'

const B2cCustomerListSearch = () => {
    const dispatch = useAppDispatch()

    const searchInput = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.customerB2cList.data.tableData
    )
    const authority = useAppSelector((state) => state.auth.user.authority)
    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(CustomerB2cList(data))
        console.log(data)
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    return (
        <div className="flex justify-center">
            <Input
                ref={searchInput}
                className=""
                size="md"
                placeholder={
                    authority?.includes('admin')
                        ? 'Search by customer name, hub...'
                        : 'Search by customer name, phone number...'
                }
                prefix={<HiOutlineSearch className="text-lg ml-auto" />}
                onChange={onEdit}
            />
        </div>
    )
}

export default B2cCustomerListSearch
function CustomerB2cList(data: TableQueries): any {
    throw new Error('Function not implemented.')
}
