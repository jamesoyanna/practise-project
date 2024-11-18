import { useEffect } from 'react'
import { injectReducer } from '@/store'
import Button from '@/components/ui/Button'
import StockTable from '@/components/hubAssistance/StockTable'
import StockAnalytics from '@/components/hubAssistance/StockAnalytics'
import reducer, {
    getStockAnalyticsData,
    useAppDispatch,
    useAppSelector,
} from '../../store/slices/stocks'
import { DatePicker } from '@/components/ui'
import { useNavigate } from 'react-router-dom'

injectReducer('StockList', reducer)

const Stock = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const date = new Date()

    const { stockStatsData } = useAppSelector(
        (state) => state.StockList.data.analyticsData
    )
    console.log("stock analytics data: ", stockStatsData)
    const StockRequestCount = stockStatsData
        ? stockStatsData.length
        : 0

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchData = () => {
        dispatch(getStockAnalyticsData())
    }
    return (
        <>
            <div>
                <div className="lg:flex items-center justify-between mb-6">
                    <h4 className="ml-8 lg:mb-0">In-Stock</h4>
                </div>
                <StockAnalytics data={stockStatsData}/>
                
                <div className="lg:flex items-center justify-between mb-6">
                    <h4 className="ml-8 lg:mb-0">Stock History</h4>

                    <div className="col-span-2 lg:col-span-1 lg:flex">
                        <DatePicker
                            inputFormat="MMM, DD YYYY"
                            defaultValue={date}
                        />
                        <Button
                            variant="solid"
                            color="blue-800"
                            size="md"
                            className="w-full lg:w-auto ml-5 bg-[#194DA3]"
                            onClick={() => {
                                navigate('/stock-request')
                            }}
                        >
                            Incoming Stocks
                            {StockRequestCount > 0 && (
                                <span className="relative top-[-1rem] left-9 bg-[#194DA3] text-white rounded-full px-2 py-2 text-xs">
                                    {StockRequestCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
                <StockTable />
            </div>
        </>
    )
}

export default Stock
