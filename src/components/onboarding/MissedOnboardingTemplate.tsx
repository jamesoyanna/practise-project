import reducer, {
    getMissedOnboardingData,
    useAppSelector,
    useAppDispatch,
} from '../../store/slices/onboarding/missedOnboarding'
import { injectReducer } from '@/store'
import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { OnboardingDataType } from './OnboardingTableTemplate'
import { DatePicker } from '../ui'

injectReducer('missedOnboardingList', reducer)

type OnboardingTableProps = {
    authority?: string[]
}

const MissedOnboardingTemplate = ({ authority = [] }: OnboardingTableProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const testdata = useAppSelector((state) => state)
    const allData = testdata.missedOnboardingList.data
        .MissedonBoardingDataList as unknown as OnboardingDataType[]

    console.log('data :', allData)

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.missedOnboardingList.data.tableData
    )
    const fetchData = useCallback(() => {
        dispatch(getMissedOnboardingData({ pageIndex, pageSize, sort, query }))
    }, [pageIndex, pageSize, sort, query, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort])

    const mydata = useMemo(() => {
        if (Array.isArray(authority) && authority.includes('account_officer')) {
            return allData.filter((item) => item.customerBusinessType === 'B2B')
        } else {
            return allData
        }
    }, [allData, authority])

    const missedOnboardingCount = mydata ? mydata.length : 0
    console.log('missedOnboardingCount :', missedOnboardingCount)

    return (
        <div className='space-y-4'>
              <h4>Onboarding</h4>
            <div className="flex justify-between items-center">
            <DatePicker
                inputFormat="MMM, DD YYYY"
                defaultValue={new Date()}
                className="w-[11rem]"
            />
            <div className="flex justify-end">
                <button
                    className="bg-[#ff0000] hover:bg-[#ff0001] text-[#fff] font-semibold p-3 "
                    onClick={() => {
                        navigate('/onboarding/missed')
                    }}
                >
                    Missed/Rejected Onboarding
                    <span className="absolute top-[3.2rem] right-[1.2rem] bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                        {total}
                    </span>
                </button>
            </div>
        </div>
        </div>
        
    )
}

export default MissedOnboardingTemplate
