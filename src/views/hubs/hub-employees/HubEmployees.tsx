import EmployeesTable from '@/components/hubEmployees/EmployeesTable'
import EmployeeTableSearch from '@/components/hubEmployees/EmployeeTableSearch'
import { injectReducer } from '@/store'
import reducer from '../../../store/slices/employees'
import CreateEmplyeeButton from '@/components/hubEmployees/CreateEmployeeButton'
import EmployeeDialog from '@/components/hubEmployees/EmployeeDialog'

injectReducer('EmployeeList', reducer)

const HubEmployees = () => {
    return (
        <>
            <div className="lg:flex lg:items-center lg:justify-between mb-6">
                <h4 className="ml-8 lg:mb-0">Hub Employees</h4>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div className="md:w-3/4">
                    <EmployeeTableSearch />
                </div>
                <div className="flex justify-end mt-4 md:mt-0 ml-4 md:ml-0">
                    <CreateEmplyeeButton />
                </div>
            </div>
            <EmployeesTable />
            <EmployeeDialog />
        </>
    )
}

export default HubEmployees
