import TopBarItem from "./TopBarItem";

const MaintenanceTopBar = () => {
    return (
        <div className="grid grid-rows-2 grid-flow-col justify-between">
    <TopBarItem title="Maintenance Store ID:" value="02409733" className="row-span-2" />
    <TopBarItem title="General Total No of cylinders:" value="900" className="row-span-2" />
        </div>
    )
}
export default MaintenanceTopBar;