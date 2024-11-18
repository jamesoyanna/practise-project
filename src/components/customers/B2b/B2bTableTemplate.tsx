
import { Button, Progress } from '../../ui'

import { useEffect, useCallback, useMemo } from 'react'
import {
    getCustomersB2b,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/customers/b2bCustomerSlice'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { useNavigate } from 'react-router-dom'
import DataTable from '@/components/shared/DataTable'

type Customers = {
    assets: any
    customerId: string
    businessName: string
    gasCurrentReading: number
    totalGas: number
    hub:string
}



type ProgressionBarProps = {
    gasCurrentReading: number;
};

const GasProgress = ({ gasCurrentReading }: ProgressionBarProps) => {
    const progressExtraProps = useMemo(() => {
        if (gasCurrentReading < 10) {
            return { color: 'red-500' };
        } else if (gasCurrentReading < 20) {
            return { color: 'yellow-500' };
        } else {
            return { color: 'green-500' };
        }
    }, [gasCurrentReading]);

    return (
        <Progress
            size="md"
            showInfo={false}
            percent={gasCurrentReading}
            {...progressExtraProps}
        />
    );
};


const B2bTableTemplate = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const testdata = useAppSelector((state) => state)

    console.log('Test data: ', testdata)

    const mydata = useAppSelector(
        (state) => state.customerB2bList.data.customerB2bList
    )
    const authority = testdata.auth.user.authority
    console.log('auth :', authority)
    const loading = useAppSelector(
        (state) => state.customerB2bList.data.loading
    )
    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.customerB2bList.data.tableData
    )
    const fetchData = useCallback(() => {
        dispatch(getCustomersB2b({ pageIndex, pageSize, sort, query }))
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
                accessorKey: 'businessName',
                id: '0',
            },
            {
                header: 'gas Current Reading',
                id: '1',
                accesorKey: 'Gas Current Reading',
                cell: (props: { row: { original: any } }) => {
                    const row = props.row.original
                    const gasCurrentReading = row.assets[0].gasCurrentReading;

                    return (
                        <div className="div">
                            {/* Use the GasProgress component */}
                            <GasProgress gasCurrentReading={row.assets[0].gasCurrentReading} />

                            <div className="flex items-center justify-between pt-2">
                                <small>
                                    Remaining: {gasCurrentReading} kg
                                </small>
                                <small>{row.assets[0].totalGas}kg</small>
                            </div>
                        </div>
                    )
                },
            },
            authority?.includes('is_super_admin')  ? {
                header: 'Hub',
                accessorKey: 'hub',
                id: '2',
            } : null,
            {
                header: '',
                accesorKey: '',
                id: '3',
                cell: (props: { row: { original: any } }) => {
                    const row = props.row.original
                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                               
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => {
                                    navigate(`/customers/b2b/${row.customerId}`)
                                }}
                            >
                                View
                            </Button>
                        </div>
                    )
                },
            },
        ].filter(column => column !== null) as ColumnDef<Customers>[], // Filter out null values and assert the type
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

const B2bTable = () => {
    return (
        <div className="div">
            <B2bTableTemplate />
        </div>
    )
}
export default B2bTable
