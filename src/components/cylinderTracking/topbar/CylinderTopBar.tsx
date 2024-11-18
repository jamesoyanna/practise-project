import TopBarItem from "./TopBarItem";

const CylinderTopBar = () => {
    return (
        <div className="grid grid-rows-2 grid-flow-col justify-between">
            <TopBarItem title="General Total No. of cylinders" value="900" className="row-span-2" />
        </div>
    )
}
export default CylinderTopBar;