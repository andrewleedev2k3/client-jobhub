import { Select, MenuItem } from '@mui/material';
import { BsGenderTrans } from 'react-icons/bs';
interface SelectInfo {
    title: string;
    fieldName: string;
    value?: string;
    onChange: any;
    error: string | undefined;
    touched: boolean | undefined;
}
interface Options {
    value: string;
    label: string;
}
const SelectInfo = ({ title, fieldName, value, onChange, error, touched }: SelectInfo) => {
    const options: Options[] = [
        { value: 'male', label: 'Nam' },
        { value: 'female', label: 'Nữ' },
        { value: 'others', label: 'Khác' },
    ];
    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="font-bold text-primary-100" htmlFor={fieldName}>
                {title}
            </label>
            <div
                className={`flex items-center text-s-text w-full border-2 bg-input rounded-md ${
                    error && touched && 'border-red-800'
                }`}
            >
                <div className="text-lg px-3">
                    <BsGenderTrans />
                </div>
                <Select
                    value={value}
                    onChange={onChange}
                    name={fieldName}
                    variant="standard"
                    className="select w-full h-11 text-content-s-text items-center"
                >
                    {options.map((option, index) => {
                        return (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </div>
            {error && touched ? <div className="text-red-700 text-sm font-semibold">{error}</div> : null}
        </div>
    );
};

export default SelectInfo;
