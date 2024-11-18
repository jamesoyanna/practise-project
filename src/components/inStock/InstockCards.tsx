import { useEffect} from 'react'
import { injectReducer } from '@/store'
import reducer, {
    useAppDispatch,
    useAppSelector,
    InstockCard,
    getInstockStats,
} from '../../store/slices/inStock/card'
import CardTemplate from './CardTemplate'

injectReducer('inStockCardList', reducer)



const InstockCards = () => {
    const dispatch = useAppDispatch()
   

    useEffect(() => {
        const fetchInstockStats = async () => {
            try {
                await dispatch(getInstockStats())
            } catch (error) {
                console.error('Error fetching instock stats:', error)
            }
        }

        fetchInstockStats()
    }, [dispatch])

    const instockData = useAppSelector((state) => state)
    console.log('instockData:', instockData)

    const cylinderStat: InstockCard[] = useAppSelector(
        (state) => state.inStockCardList.data.instockDataList
    )
    console.log('stats1010 aa:', cylinderStat)
    console.log('typedata 10 :', Array.isArray(cylinderStat))

    useEffect(() => {
        if (cylinderStat && cylinderStat.length > 0) {
            console.log("ccc", cylinderStat[0].filled); 
        }
    }, []);
    

    


    

   

    return (
        <div>
            <CardTemplate data={cylinderStat} />
        </div>
    )
}

export default InstockCards
