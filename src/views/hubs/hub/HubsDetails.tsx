import HubName from "@/components/hubs/Cards/HubName"
import { injectReducer } from "@/store"
import reducer from '@/store/slices/hubs/details'
import { Link, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";

injectReducer('hubDetails', reducer)

const HubsDetails = () => {
  const params = useParams()
  return (
    <div >
<h4 className="flex gap-3 items-center text-sm mb-5"> <Link to='/hubs'><FaArrowLeft/></Link> Hub Employees Details</h4>
      <HubName hubId={params.hubId}/>
    </div>
  )
}

export default HubsDetails