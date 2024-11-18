import { Button, Progress } from '../ui'

import { useEffect, useCallback, useMemo } from 'react'
import {
    getAssets,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/assets'

import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { useNavigate } from 'react-router-dom'
import DataTable from '@/components/shared/DataTable'

type Customers = {
    customerId: string
    customerName: string
    gasCurrentReading: number
    totalGas: number
    date: string
}

type ProgressionBarProps = {
    gasCurrentReading: number
}

const GasProgress = ({ gasCurrentReading }: ProgressionBarProps) => {
    const progressExtraProps = useMemo(() => {
        if (gasCurrentReading < 3) {
            return { color: 'red-500' }
        } else if (gasCurrentReading < 6) {
            return { color: 'yellow-500' }
        } else {
            return { color: 'green-500' }
        }
    }, [gasCurrentReading])

    return (
        <Progress
            size="md"
            showInfo={false}
            percent={gasCurrentReading}
            {...progressExtraProps}
        />
    )
}

const AssetsTableTemplate = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // const testdata = useAppSelector((state) => state)

    // console.log('Test data: ', testdata)

    const mydata = useAppSelector(
        (state) => state.assetsList.data.assetsList
    )
    console.log('my data :', mydata)

    const loading = useAppSelector(
        (state) => state.assetsList.data.loading
    )
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.assetsList.data.tableData
    )
    const fetchData = useCallback(() => {
        dispatch(getAssets({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Customers>[] = useMemo(
        () => [
            {
                header: 'Customer Name',
                accessorKey: 'customerName',
                id: '0',
            },
            {
                header: 'gas Current Reading',
                id: '1',
                accesorKey: 'Gas Current Reading',
                cell: (props) => {
                    const row = props.row.original

                    return (
                        <div className="div">
                            {/* Use the GasProgress component */}
                            <GasProgress
                                gasCurrentReading={row.gasCurrentReading}
                            />
                            <div className="flex items-center justify-between pt-2">
                                <small>
                                    Remaining: {row.gasCurrentReading} kg
                                </small>
                                <small>{row.totalGas}kg</small>
                            </div>
                        </div>
                    )
                },
            },
            {
                header: 'date',
                id: '2',
                accessorKey: 'dateOnboarded',
                
               
            },
            // {
            //     header: '',
            //     accesorKey: '',
            //     id: '3',
            //     cell: (props) => {
            //         const row = props.row.original
            //         return (
            //             <div className="div">
            //                 <Button
            //                     color="#fff"
            //                     variant="solid"
            //                     size="sm"
                               
            //                     disabled={false}
            //                     loading={false}
            //                     className="bg-[#194DA3]"
            //                     onClick={() => {
            //                         navigate(`/account-officer/assets/${row.customerId}`)
            //                     }}
            //                 >
            //                     View
            //                 </Button>
            //             </div>
            //         )
            //     },
            // },
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

const AssetsTable = () => {
    return (
        <div className="div">
            <AssetsTableTemplate />
        </div>
    )
}
export default AssetsTable
