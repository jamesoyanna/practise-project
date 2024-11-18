import InstockCards from '@/components/inStock/InstockCards'
import InstockTableTemplate from '@/components/inStock/InstockTableTemplate'
import { injectReducer } from '@/store'
import reducer from '@/store/slices/inStock'

injectReducer('inStockList', reducer)

const Instock = () => {
  return (
    <div className='flex flex-col gap-8'>
      <h4>In-Stock</h4>
        <InstockCards />
        <InstockTableTemplate/>
        </div>
  )
}

export default Instock