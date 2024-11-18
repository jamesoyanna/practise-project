import { useEffect, useCallback, useMemo  } from 'react'
import {
    getInstockData,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/inStock'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'

type InstockTableDataType = {
    CylinderID: string
    CylinderSize: string
    Details: string
    Date: string
    Status: string
}

const orderStatusColor: Record<
    string,
    { label: string; dotClass: string; textClass: string }
> = {
    filled: {
        label: 'filled',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    functional: {
        label: 'functional',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },

    unfilled: {
        label: 'unfilled',
        dotClass: 'bg-red-500',
        textClass: 'text-red-500',
    },
}

const InstockTable = () => {
    const dispatch = useAppDispatch()
    const testdata = useAppSelector((state) => state)
    const mydata = testdata.inStockList.data.cylinders

    const loading = testdata.inStockList.data.loading
    const { pageIndex, pageSize, sort, query, total } = testdata.inStockList.data.tableData
    const fetchData = useCallback(() => {
        dispatch(getInstockData({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<InstockTableDataType>[] = useMemo(
        () => [
            {
                header: 'Cylinder/Smart Device ID',
                accessorKey: 'CylinderID',
                id: '0',
            },
            {
                header: 'Cylinder Size/ Smart Device',
                accessorKey: 'CylinderSize',
                id: '1',
            },
            {
                header: 'Details',
                accessorKey: 'Details',
                id: '2',
            },

            {
                header: 'Date',
                id: '3',
                accessorKey: 'Date',
            },
            {
                header: 'Status',
                accesorKey: 'Status',
                id: '4',
                cell: (props) => {
                    const { Status } = props.row.original
                    const statusColor = orderStatusColor[Status]
                    if (!statusColor) {
                        return null 
                    }
                    return (
                        <div className="flex items-center">
                            <span
                                className={`ml-2 rtl:mr-2 capitalize font-semibold ${statusColor.textClass}`}
                            >
                                {statusColor.label}
                            </span>
                        </div>
                    )
                },
            },
        ],
        []
    )
    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={mydata}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
        </>
    )
}

const InstockTableTemplate = () => {
    return (
        <div className="div">
            <InstockTable />
        </div>
    )
}

export default InstockTableTemplate
