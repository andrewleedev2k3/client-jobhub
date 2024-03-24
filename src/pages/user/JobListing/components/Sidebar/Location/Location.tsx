import { useGetProvincesQuery } from "@/services/utilsApiSlice";
import { Location } from "@/types/Location";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Location({locationChange}: {locationChange: (city: string) => void}) {
    const [id, setId] = useState<string>('')
    const [cities, setCities] = useState<Location[]>([])

    const [searchParams] = useSearchParams()
    const p = searchParams.get('p')

    const {data, isLoading, isError} = useGetProvincesQuery()

    const handleChangeLocation = (city: string) => {
        setId(city)
        locationChange(city)
    } 

    useEffect(() => {
        if(data?.data?.data && !isLoading && !isError) {
            setCities(data?.data?.data)
        }
    }, [data?.data?.data, isLoading, isError])
    
    useEffect(() => {
        if (p !== null) {
            setId(p)
            locationChange(p)
        }
    }, [p]);

    return (
        <div className=" bg-white border-[#eee] border rounded-md pt-5 pb-5 pl-6 pr-3 mb-5">
            <h3 className=" font-family-title text-primary-100 font-semibold text-lg mb-2 lg:text-lg">Tỉnh, thành</h3>
            <div className=" max-h-64 overflow-scroll">
                <div className=" mb-2 flex relative">
                    <div className=" flex items-center cursor-pointer">
                        <input
                            id='allLocation'
                            type="radio"
                            className=" mr-1.5"
                            checked={id === ''}
                            onChange={() => handleChangeLocation('')}
                        />
                        <label
                            htmlFor='allLocation'
                            className=" text-content-text text-sm font-medium lg:text-sm cursor-pointer"
                        >
                            Tất cả
                        </label>
                    </div>
                </div>
                {cities?.map(city => {
                    return (
                        <div key={city.code} className=" mb-2 flex relative">
                            <div className=" flex items-center cursor-pointer">
                                <input
                                    id={city.name}
                                    type="radio"
                                    className=" mr-1.5"
                                    checked={id === city.name}
                                    onChange={() => handleChangeLocation(city.name)}
                                />
                                <label
                                    htmlFor={city.name}
                                    className=" text-content-text text-sm font-medium lg:text-sm cursor-pointer"
                                >
                                    {city.name}
                                </label>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    );
}

export default Location;