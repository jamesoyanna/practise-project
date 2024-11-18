
import AssetsListSearch from '@/components/accountOfficer/AssetsListSearch'
import AssetsTable from '@/components/accountOfficer/AssetsTable'
import { injectReducer } from '@/store'
import reducer from '@/store/slices/assets'

injectReducer('assetsList', reducer)

export const Assets = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="">
                <AssetsListSearch />
            </div>
            <AssetsTable />
        </div>
    )
}
export default Assets;
