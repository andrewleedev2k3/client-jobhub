import Loader from '@/components/Loader/Loader';
import { useGetDistrictByCityCodeQuery } from '@/services/utilsApiSlice';
import { District } from '@/types/Location';
import { Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
interface SelectDistrict {
    title: string;
    fieldName: string;
    value?: string;
    onChange: any;
    error: string | undefined;
    touched: boolean | undefined;
    code?: number;
}

const SelectDistrict = ({ title, fieldName, value, onChange, error, touched, code }: SelectDistrict) => {
    const { data, isLoading, isError } = useGetDistrictByCityCodeQuery(code);

    const [districts, setDistricts] = useState<District[]>();

    useEffect(() => {
        if (!isLoading && !isError && data?.data?.data) {
            const receivedDistricts = data?.data?.data?.districts;
            if (receivedDistricts && receivedDistricts.length > 0) {
                setDistricts(receivedDistricts);
                const initialValue = receivedDistricts.some((district) => district.name === value)
                    ? value
                    : receivedDistricts[0]?.name;

                onChange({ target: { name: fieldName, value: initialValue } });
            }
        }
    }, [data?.data?.data, isError, isLoading, onChange]);

    return (
        <div className="flex flex-col gap-1 w-full">
            {isLoading && <Loader />}
            <label className="font-bold text-primary-100" htmlFor={fieldName}>
                {title}
            </label>
            <div
                className={`flex items-center text-content-title w-full border-2 bg-input rounded-md ${
                    error && touched && 'border-red-800'
                }`}
            >
                <div className="text-lg px-3">
                    <CiLocationOn />
                </div>
                <Select
                    value={value}
                    onChange={onChange}
                    name={fieldName}
                    variant="standard"
                    className="select w-full h-11 text-content-s-text items-center"
                >
                    {districts?.map((item: any, index: any) => (
                        <MenuItem key={index} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            {error && touched ? <div className="text-red-700 text-sm font-semibold">{error}</div> : null}
        </div>
    );
};

export default SelectDistrict;
