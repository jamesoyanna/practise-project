import HubEmployeeName from "@/components/hubEmployees/Cards/HubEmployeeName"
import { injectReducer } from "@/store"
import reducer from '@/store/slices/employees/details'
import { Link, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";

injectReducer('hubEmployeeDetails', reducer)

const HubEmployeeDetails = () => {
  const params = useParams()
  return (
    <div >
<h4 className="flex gap-3 items-center text-sm mb-5"> <Link to='/hub-employees'><FaArrowLeft/></Link> Hub Employees Details</h4>
      <HubEmployeeName staffId={params.staffId}/>
    </div>
  )
}

export default HubEmployeeDetails