import Select from '@/components/ui/Select'
import { setFilterData, useAppDispatch, useAppSelector } from '@/store/slices/stocks'
import {
    components,
    ControlProps,
    OptionProps,
    SingleValue,
} from 'react-select'

type Option = {
    value: string
    label: string
}

const { Control } = components

const options: Option[] = [
    { value: '', label: 'Filter by' },
    { value: 'Cylinders', label: 'Cylinders' },
    { value: 'smartDevices', label: 'Smart Devices' },
]

const CustomSelectOption = ({
    innerProps,
    label,
    isSelected,
}: OptionProps<Option>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                {/* <Badge innerClass={data.value} /> */}
                <span>{label}</span>
            </div>
            {/* {isSelected && <HiCheck className="text-emerald-500 text-xl" />} */}
        </div>
    )
}

const CustomControl = ({ children, ...props }: ControlProps<Option>) => {
    //const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {children}
        </Control>
    )
}

const TableFilter = () => {
    const dispatch = useAppDispatch()

    const { status } = useAppSelector(
        (state) => state.StockList.data.filterData
    )
    console.log("Status", status)

    const onStatusFilterChange = (selected: SingleValue<Option>) => {
        dispatch(setFilterData({ status: selected?.value }))
    }

    return (
        <Select<Option>
            options={options}
            size="sm"
            className="ml-20 mb-0 min-w-[130px]"
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={options.filter((option) => option.value === status)}
            onChange={onStatusFilterChange}
        />
    )
}

export default TableFilter;
