import Loader from '@/components/Loader/Loader';
import { useGetProvincesQuery } from '@/services/utilsApiSlice';
import { Location } from '@/types/Location';
import { Select, MenuItem } from '@mui/material';
import { useEffect, useState, Dispatch } from 'react';
import { CiLocationOn } from 'react-icons/ci';

interface SelectInfo {
    title: string;
    fieldName: string;
    value?: string;
    onChange: any;
    error: string | undefined;
    touched: boolean | undefined;
    onSetCode: Dispatch<React.SetStateAction<number | undefined>>;
}

const SelectCity = ({ title, fieldName, value, onChange, error, touched, onSetCode }: SelectInfo) => {
    const { data, isLoading, isError } = useGetProvincesQuery();

    const [provices, setProvinces] = useState<Location[]>([]);


    useEffect(() => {
        const receivedProvinces = data?.data?.data;
        if (!isLoading && !isError && data?.data?.data) {
            if (receivedProvinces && receivedProvinces.length > 0) {
                setProvinces(receivedProvinces);
                const initialValue = receivedProvinces.some((province) => province.name === value)
                    ? value
                    : receivedProvinces[0]?.name;

                onChange({ target: { name: fieldName, value: initialValue } });
            }
        }

        if (receivedProvinces) {
            const citySelected = receivedProvinces.find((city) => city.name === value);

            if (citySelected) {
                onSetCode(citySelected.code);
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
                    {provices.map((item: any, index: any) => (
                        <MenuItem onClick={() => onSetCode(item.code)} key={index} value={item.name}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            {error && touched ? <div className="text-red-700 text-sm font-semibold">{error}</div> : null}
        </div>
    );
};

export default SelectCity;
