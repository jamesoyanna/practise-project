import { useRef } from 'react'
import Input from '@/components/ui/Input'
import { HiOutlineSearch } from 'react-icons/hi'
import {  
    setTableData,
    useAppDispatch,
    useAppSelector } from '../../../store/slices/stocks';
import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import type { TableQueries } from '@/@types/common'
import type { ChangeEvent } from 'react'

const SizeTableSearch = () => {
    const dispatch = useAppDispatch()

    const searchInput = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.StockList.data.tableData
    )

    const stockData = useAppSelector(
        (state) => state.StockList.data.stockList
    )
    console.log("Stock Data", stockData)

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
        dispatch(StockList(data))
        console.log(data);
        
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }
    //const authority = useAppSelector((state) => state.auth.user.authority)


    return (
        <div className="flex justify-center mb-8">
              <Input
        ref={searchInput}
        className=" "
        size="md"
        placeholder='Search by Smart Device ID or cylinder' 
        prefix={<HiOutlineSearch className="text-lg ml-auto" />}
        onChange={onEdit}
    />
        </div>
      
    
    )
}

export default SizeTableSearch
function StockList(data: TableQueries): any {
    throw new Error('Function not implemented.');
}

