import Card from '@/components/ui/Card'
import { useEffect, useState } from 'react'
import { Button, Dialog, Dropdown } from '../ui'
import { MdOutlinePropaneTank } from 'react-icons/md'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { FiCpu } from 'react-icons/fi'

interface CardTemplateProps {
    data: Record<
        string,
        { filled: string[]; unfilled: string[]; totals: number }
    >
}

const renderBgColor = (key: string): string => {
    switch (key) {
        case 'fifty':
            return 'bg-teal-300 bg-opacity-10'
        case 'twentyFive':
            return 'bg-[#329AFF1A] bg-opacity-10'
        case 'twelve':
            return 'bg-yellow-400 bg-opacity-10'
        case 'SmartDevice':
            return 'bg-[#E304251A] bg-opacity-10'
        default:
            return ''
    }
}

const renderBtnColor = (key: string): string => {
    switch (key) {
        case 'fifty':
            return 'bg-teal-300 '
        case 'twentyFive':
            return 'bg-indigo-700 '
        case 'twelve':
            return 'bg-yellow-400 '
        case 'SmartDevice':
            return 'bg-red-600'
        default:
            return ''
    }
}

const renderIconColor = (key: string): string => {
    switch (key) {
        case 'fifty':
            return 'text-teal-300 '
        case 'twentyFive':
            return 'text-indigo-700 '
        case 'twelve':
            return 'text-yellow-400 '
        case 'SmartDevice':
            return 'text-red-600'
        default:
            return ''
    }
}

type CylinderItem = string

// Define types for the dialog content
type DialogContent = CylinderItem[]
type DialogState = {
    filled: DialogContent
    unfilled: DialogContent
    label: string
    isOpen: boolean
}
const initialDialogState: DialogState = {
    filled: [],
    unfilled: [],
    label: '',
    isOpen: false,
}

const CardTemplate = ({ data }: CardTemplateProps) => {
    const [dialogState, setDialogState] =
        useState<DialogState>(initialDialogState)
    const [currentTime, setCurrentTime] = useState<string>('')

    // Calculate total number of pages
    const totalIds = dialogState.filled.length + dialogState.unfilled.length
    const pageSize = 6
    const totalPages = Math.ceil(totalIds / pageSize)

    // Paginate the IDs
    const paginatedIds: string[][] = []
    for (let i = 0; i < totalIds; i += pageSize) {
        paginatedIds.push(
            dialogState.filled
                .concat(dialogState.unfilled)
                .slice(i, i + pageSize)
        )
    }

    const [currentPage, setCurrentPage] = useState(1)

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
    }

    useEffect(() => {
        const updateTime = () => {
            const date = new Date()
            const hours = date.getHours() % 12 || 12
            const minutes = date.getMinutes()
            const amOrPm = date.getHours() < 12 ? 'AM' : 'PM'
            setCurrentTime(
                `${hours}:${minutes < 10 ? '0' : ''}${minutes}${amOrPm}`
            )
        }
        updateTime()
        const intervalId = setInterval(updateTime, 60000)
        return () => clearInterval(intervalId)
    }, [])

    const handleOpenFilledDialog = (filled: DialogContent, label: string) => {
        setDialogState({
            filled,
            unfilled: [],
            label: `${label} - Filled`,
            isOpen: true,
        })
    }

    const handleOpenUnfilledDialog = (
        unfilled: DialogContent,
        label: string
    ) => {
        setDialogState({
            filled: [],
            unfilled,
            label: `${label} - Unfilled`,
            isOpen: true,
        })
    }

    return (
        <>
            <div className={`grid grid-cols-1 lg:grid-cols-4 gap-2 `}>
                {Object.entries(data).map(([label, statistic], index) => (
                    <div key={label}>
                        <div>
                            <Card bgColor={renderBgColor(label)}>
                                <div className="relative flex flex-col items-start gap-4 w-full">
                                    <div className="w-full flex items-center justify-between text-[#0A0A0A] font-semibold">
                                        <p>
                                            {label === 'SmartDevice'
                                                ? 'Smart Device'
                                                : label === 'twelve'
                                                ? '12kg Cylinders'
                                                : label === 'twentyFive'
                                                ? '25kg Cylinders'
                                                : label === 'fifty'
                                                ? '50kg Cylinders'
                                                : ''}
                                        </p>
                                        <p className="text-right">
                                            {currentTime}
                                        </p>
                                    </div>
                                    <div className="text-2xl font-bold">
                                        {statistic.totals}
                                    </div>
                                    <div className="w-full flex items-center justify-between">
                                        <div className="text-sm font-semibold w-[65%]">
                                            <p className="font-extralight text-[#000] text-xs">
                                                Total No. of{' '}
                                                {label === 'SmartDevice'
                                                    ? 'Smart Devices'
                                                    : label === 'twelve'
                                                    ? '12kg Cylinders'
                                                    : label === 'twentyFive'
                                                    ? '25kg Cylinders'
                                                    : label === 'fifty'
                                                    ? '50kg Cylinders'
                                                    : ''}{' '}
                                                in stock
                                            </p>
                                        </div>
                                        {label === 'fifty' ||
                                        label === 'twelve' ||
                                        label === 'twentyFive' ? (
                                            <div
                                                className={`${renderBtnColor(
                                                    label
                                                )} hover:${renderBtnColor(
                                                    label
                                                )} rounded-full text-[#fff] font-semibold  `}
                                            >
                                                <Dropdown
                                                    placement="bottom-end"
                                                    trigger="click"
                                                    className="w-full"
                                                >
                                                    <Dropdown.Item variant="header">
                                                        <div className="py-2 px-3 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <p
                                                                    className={renderIconColor(
                                                                        label
                                                                    )}
                                                                >
                                                                    <MdOutlinePropaneTank
                                                                        style={{
                                                                            fontSize:
                                                                                '1.2rem',
                                                                        }}
                                                                    />
                                                                </p>
                                                                <span>
                                                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                                        {
                                                                            statistic
                                                                                .filled
                                                                                .length
                                                                        }
                                                                    </p>
                                                                    <p className=" text-gray-900 ">
                                                                        Filled
                                                                    </p>
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="solid"
                                                                size="sm"
                                                                className={`${renderBtnColor(
                                                                    label
                                                                )} hover:${renderBtnColor(
                                                                    label
                                                                )}`}
                                                                onClick={() =>
                                                                    handleOpenFilledDialog(
                                                                        statistic.filled,
                                                                        label
                                                                    )
                                                                }
                                                            >
                                                                Check ID
                                                            </Button>
                                                        </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item variant="header">
                                                        <div className="py-2 px-3 flex items-center justify-between">
                                                            <div className="flex items-center justify-between ">
                                                                <p
                                                                    className={renderIconColor(
                                                                        label
                                                                    )}
                                                                >
                                                                    <MdOutlinePropaneTank
                                                                        style={{
                                                                            fontSize:
                                                                                '1.2rem',
                                                                        }}
                                                                    />
                                                                </p>
                                                                <span>
                                                                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                                                                        {
                                                                            statistic
                                                                                .unfilled
                                                                                .length
                                                                        }
                                                                    </p>
                                                                    <p className=" text-gray-900 ">
                                                                        Unfilled
                                                                    </p>
                                                                </span>
                                                            </div>
                                                            <Button
                                                                variant="solid"
                                                                size="sm"
                                                                className={`${renderBtnColor(
                                                                    label
                                                                )} hover:${renderBtnColor(
                                                                    label
                                                                )}`}
                                                                onClick={() =>
                                                                    handleOpenUnfilledDialog(
                                                                        statistic.unfilled,
                                                                        label
                                                                    )
                                                                }
                                                            >
                                                                Check ID
                                                            </Button>
                                                        </div>
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                        ) : (
                                            <Button
                                                variant="solid"
                                                size="xs"
                                                className={`${renderBtnColor(
                                                    label
                                                )} hover:${renderBtnColor(
                                                    label
                                                )}   active:${renderBtnColor(
                                                    label
                                                )} `}
                                                onClick={() =>
                                                    handleOpenUnfilledDialog(
                                                        statistic.unfilled,
                                                        label
                                                    )
                                                }
                                            >
                                                Check ID
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>

            {dialogState.isOpen && (
                <Dialog
                    preventScroll={false}
                    className="flex flex-col justify-between overflow-hidden gap-[40%]"
                    contentClassName="custom-content-class"
                    height={500}
                    width={400}
                    isOpen={dialogState.isOpen}
                    onClose={() =>
                        setDialogState({
                            ...dialogState,
                            isOpen: false,
                        })
                    }
                >
                    <div>
                        <div
                            className={`${renderBgColor(
                                dialogState.label.split(' - ')[0]
                            )} py-2 px-4 rounded-full w-[40%]`}
                        >
                            <small
                                className={`${renderIconColor(
                                    dialogState.label.split(' - ')[0]
                                )} font-semibold`}
                            >
                                {' '}
                                {dialogState.label.split(' - ')[0] ===
                                'SmartDevice'
                                    ? 'Smart Device'
                                    : dialogState.label.split(' - ')[0] ===
                                      'twelve'
                                    ? '12.5kg Cylinders'
                                    : dialogState.label.split(' - ')[0] ===
                                      'twentyFive'
                                    ? '25kg Cylinders'
                                    : dialogState.label.split(' - ')[0] ===
                                      'fifty'
                                    ? '50kg Cylinders'
                                    : ''}
                            </small>
                        </div>
                        <div className="flex flex-col gap-8 mt-8">
                            {dialogState.filled.length > 0 && (
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`${renderBgColor(
                                            dialogState.label.split(' - ')[0]
                                        )} rounded-md p-4 `}
                                    >
                                        <p
                                            className={`${renderIconColor(
                                                dialogState.label.split(
                                                    ' - '
                                                )[0]
                                            )} text-base`}
                                        >
                                            {/* <MdOutlinePropaneTank /> */}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-base font-bold text-[#000]">
                                            {dialogState.filled.length}
                                        </p>
                                        <p className="text-xs">
                                            Filled Cylinders
                                        </p>
                                    </div>
                                </div>
                            )}
                            {dialogState.unfilled.length > 0 && (
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`${renderBgColor(
                                            dialogState.label.split(' - ')[0]
                                        )} rounded-md p-4 `}
                                    >
                                        <p
                                            className={`${renderIconColor(
                                                dialogState.label.split(
                                                    ' - '
                                                )[0]
                                            )} text-base`}
                                        >
                                              {dialogState.label === 'twelve' ||
                                                dialogState.label ===
                                                    'twentyFive' ||
                                                dialogState.label ===
                                                    'fifty'? (  <MdOutlinePropaneTank />

                                                    ): <FiCpu /> }
                                          
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-base font-bold text-[#000]">
                                            {dialogState.unfilled.length}
                                        </p>
                                        <p className="text-xs">
                                            {dialogState.label === 'twelve' ||
                                                dialogState.label ===
                                                    'twentyFive' ||
                                                dialogState.label ===
                                                    'fifty'? (<p>Unfilled Cylinders</p>

                                                    ): <p>
                                                        Smart Devices in-stock
                                                    </p> }
                                           
                                        </p>
                                    </div>
                                </div>
                            )}
                            <hr className="border border-[#bcb9b9]" />
                            <div>
                                {paginatedIds.map((page, pageIndex) => (
                                    <div
                                        key={pageIndex}
                                        style={{
                                            display:
                                                pageIndex + 1 === currentPage
                                                    ? 'block'
                                                    : 'none',
                                        }}
                                    >
                                        <div className="grid grid-cols-3 gap-4">
                                            {dialogState.filled
                                                .concat(dialogState.unfilled)
                                                .map((id, index) => (
                                                    <div key={index}>{id}</div>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 w-[90%] p-3 bg-white">
    <div className="flex items-center justify-between w-full">
        <button disabled={currentPage === 1} onClick={prevPage}>
            <IoIosArrowBack />
        </button>
        <span>
            Page {currentPage} of {totalPages}
        </span>
        <button
            disabled={currentPage === totalPages}
            onClick={nextPage}
        >
            <IoIosArrowForward />
        </button>
    </div>
</div>

                   
                </Dialog>
            )}
        </>
    )
}

export default CardTemplate
