import TopBarItem from "./TopBarItem";

const HubTopBar = () => {
    return (
        <div className="grid grid-rows-3 grid-flow-col gap-4">
    <TopBarItem title="Hub ID:" value="02409733" className="row-span-2" />
    <TopBarItem title="Hub Adress:" value="Ikeja" className="row-span-2" />
    <TopBarItem title="Today's Selling Price:" value="HomeUse(B2C)N800/kg" className="row-span-2" />
        </div>
    )
}
export default HubTopBar;