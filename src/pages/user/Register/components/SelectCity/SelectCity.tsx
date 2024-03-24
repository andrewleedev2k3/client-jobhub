import { MenuItem, Select } from '@mui/material';
import { FormikTouched } from 'formik';
import { District, Location } from '@/types/Location';
import { useEffect, useState } from 'react';
import { useGetLocationQuery } from '@/services/utilsApiSlice';

type SelectFieldPropsType = {
    label: string;
    id: string;
    name: string;
    value: string | Date;
    onChange: any;
    onBlur: any;
    error: any;
    touched: boolean | undefined | FormikTouched<Date> | any;
    districtByCity: (districtList: District[]) => void
    isRequire: boolean
};
function SelectCity({ label, id, name, value, onChange, onBlur, error, touched, districtByCity, isRequire }: SelectFieldPropsType) {
    const {data, isLoading: isLoadingLocation, isError: isErrorLocation} = useGetLocationQuery()

    const [cities, setCities] = useState<Location[]>([])

    useEffect(() => {
        if(data?.data?.data && !isLoadingLocation && !isErrorLocation) {
            setCities(data?.data?.data)
        }
    }, [data?.data?.data, isLoadingLocation, isErrorLocation])
    
    useEffect(() => {
        const filter = cities.filter(city => city.name===value)
        if(filter[0]) {
            districtByCity(filter[0].districts)
        }
    }, [value])

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
                    className={' w-full h-[45.6px] text-content-text border-none px-1 '}
                >
                    {cities?.map((city) => (
                        <MenuItem key={city.code} value={city.name}>
                            {city.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            {error && touched ? <p className=" mt-2 text-red-900 italic select-none">{error}</p> : null}
        </div>
    );
}

export default SelectCity;
