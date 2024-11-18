import {
    HiOutlineColorSwatch,
    HiOutlineDesktopComputer,
    HiOutlineTemplate,
    HiOutlineNewspaper,
    HiOutlineShoppingCart,
    HiOutlineCube,
    HiOutlineClipboardList,
    HiOutlineUserGroup,
    HiOutlineHome
} from 'react-icons/hi'
import { GiGasStove } from 'react-icons/gi';

import { IoPeopleOutline } from "react-icons/io5";
import { BsLightningCharge } from "react-icons/bs";

import { TbTopologyStar3 } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { FaRegCheckSquare,FaRegUser, FaFileInvoice } from "react-icons/fa";
import { MdEmergencyShare, MdOutlineSettings } from "react-icons/md";


export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    hubs: <TbTopologyStar3 />,
    collapseMenu: <HiOutlineTemplate />,
    groupSingleMenu: <HiOutlineDesktopComputer />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    accounting: <HiOutlineNewspaper />,
    customers: <IoPeopleOutline />,
    employees: <IoIosPeople />,
    onboarding: <HiOutlineClipboardList />,
    instock: <HiOutlineCube />,
    resolution: <FaRegCheckSquare />,
    emergency: <MdEmergencyShare />,
    orders: <HiOutlineShoppingCart />,
    settings: <MdOutlineSettings />,
    homeuse: <FaRegUser/>,
    business: <HiOutlineUserGroup/>,
    invoices: <FaFileInvoice />,
    assets: <BsLightningCharge />,
    gigasstove: <GiGasStove />
}

export default navigationIcon
