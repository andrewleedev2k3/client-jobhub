import { MenuItem, Select } from '@mui/material';
import { FormikTouched } from 'formik';
import { District } from '@/types/Location';

type SelectFieldPropsType = {
    label: string;
    id: string;
    name: string;
    value: string | Date;
    onChange: any;
    onBlur: any;
    error: any;
    touched: boolean | undefined | FormikTouched<Date> | any;
    districtList: District[] | undefined
    isRequire: boolean
};
function SelectDistrict({ label, id, name, value, onChange, onBlur, error, touched, districtList, isRequire }: SelectFieldPropsType) {
    return (
        <div className="w-1/2 flex flex-col p-2 tb:w-full mb:w-full">
            <label htmlFor={id} className="text-content-title text-base font-medium">
                {label}
                {isRequire && <span className=" text-red-500"> * </span>}
            </label>

            <div className=" w-full h-[45.6px] border border-primary-200 rounded-lg mt-2">
                <Select
                    sx={{color: '#595959'}}
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={' w-full h-[45.6px] border-none px-1 '}
                >
                    {districtList?.map((district) => (
                        <MenuItem key={district.code} value={district.name}>
                            {district.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            {error && touched ? <p className=" mt-2 text-red-900 italic select-none">{error}</p> : null}
        </div>
    );
}

export default SelectDistrict;
