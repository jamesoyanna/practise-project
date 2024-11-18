import TopBarItem from "./TopBarItem";

const TopBar = () => {
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4">
    <TopBarItem title="Today’s Selling Price:" value="Home Use (B2C): N800/Kg" className="row-span-2" />
    <TopBarItem title="Business (B2B):" value="Tier 1 - N700/Kg" className="row-span-2" />
        </div>
    )
}
export default TopBar;