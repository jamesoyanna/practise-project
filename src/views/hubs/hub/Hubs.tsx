import reducer from '../../../store/slices/hubs'
import { injectReducer } from '@/store'
import AdaptableCard from '@/components/shared/AdaptableCard'
import HubTable from '../../../components/hubs/HubTable'
import HubTableTools from '../../../components/hubs/HubTableTools'

// Inject reducer into store
injectReducer('hubList', reducer)

// Component for rendering the list of hubs
const HubList = () => {
    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h4 className="mb-4 lg:mb-0">Hubs</h4>
            </div>
            <HubTableTools />
            <HubTable />
        </AdaptableCard>
    )
}

export default HubList
