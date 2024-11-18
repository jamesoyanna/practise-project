import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { Button } from '@/components/ui'
import DataTable from '@/components/shared/DataTable'
import { injectReducer } from '@/store'
import reducer, {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    getStocks,
    setTableData,
    useAppDispatch,
    useAppSelector,
} from '../../../store/slices/stocks'
import cloneDeep from 'lodash/cloneDeep'
import dayjs from 'dayjs'
import type {
    DataTableResetHandle,
    OnSortParam,
    ColumnDef,
    Row,
} from '@/components/shared/DataTable'
import HubAssistanceDetails from '../Dialog/SmartOnboardedDetails'

injectReducer('StockList', reducer)

type Stock = {
    id: string
    deliveryDate: number
    customer: string
    status: number
    cylinderId: string
}

const hubAssistanceStatusColor: Record<
    number,
    { label: string; dotClass: string; textClass: string }
> = {
    0: {
        label: 'Assigned',
        dotClass: 'bg-blue-500',
        textClass: 'text-blue-500',
    },
    1: {
        label: 'Accepted',
        dotClass: 'bg-green-500',
        textClass: 'text-green-500',
    },
}

const SmartDeviceTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cylinderId, setCylinderId] = useState('');

    const openModal = (cylinderId: string) => {
        setCylinderId(cylinderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCylinderId('');
        setIsModalOpen(false);
    };

    const tableRef = useRef<DataTableResetHandle>(null)

    const dispatch = useAppDispatch()

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.StockList.data.tableData
    )
    const loading = useAppSelector(
        (state) => state.StockList.data.loading
    )
    const data = useAppSelector(
        (state) => state.StockList.data.stockList
    )

    const fetchData = useCallback(() => {
        dispatch(getStocks({ pageIndex, pageSize, sort, query }))
    }, [dispatch, pageIndex, pageSize, sort, query])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.resetSelected()
        }
    }, [data])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<Stock>[] = useMemo(
        () => [
            { header: 'Smart Device ID', accessorKey: 'smartDeviceId' },
            { header: 'SmartDevice Type', accessorKey: 'smartDeviceType' },
            {
                header: 'Date Onboarded',
                accessorKey: 'deliveryDate',
                cell: (props) => {
                    const { deliveryDate } = props.row.original
                    const formattedDate = dayjs(deliveryDate).format(
                        'ddd DD, MMM YYYY, h:mmA'
                    )
                    return <span>{formattedDate}</span>
                },
            },
            {
                header: '',
                accesorKey: 'cylinderId',
                id: '5',
                cell: (props) => {
                    const { cylinderId } = props.row.original

                    return (
                        <div className="div">
                            <Button
                                color="#fff"
                                variant="solid"
                                size="sm"
                                disabled={false}
                                loading={false}
                                className="bg-[#194DA3]"
                                onClick={() => openModal(cylinderId)}
                            >
                                View
                            </Button>
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

    const onRowSelect = (checked: boolean, row: Stock) => {
        if (checked) {
            dispatch(addRowItem(row.id))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked: boolean, rows: Row<Stock>[]) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds: string[] = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
            />
            {isModalOpen && (
                <HubAssistanceDetails
                    cylinderId = {cylinderId}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
        </>
    )
}

export default SmartDeviceTable
