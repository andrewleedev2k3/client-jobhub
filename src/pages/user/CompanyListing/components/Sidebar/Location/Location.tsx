import { useGetProvincesQuery } from "@/services/utilsApiSlice";
import { Location } from "@/types/Location";
import { useEffect, useState } from "react";

function Location({locationChange}: {locationChange: (city: string) => void}) {
    const [id, setId] = useState<string>('allLocation')
    const [cities, setCities] = useState<Location[]>([])

    const {data, isLoading, isError} = useGetProvincesQuery()

    const handleChangeLocation = (city: string, id: string) => {
        setId(id)
        locationChange(city)
    } 

    useEffect(() => {
        if(data?.data?.data && !isLoading && !isError) {
            setCities(data?.data?.data)
        }
    }, [data?.data?.data, isLoading, isError])

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
                            checked={id === 'allLocation'}
                            onChange={() => handleChangeLocation('allLocation', 'allLocation')}
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
                                    id={city.codename}
                                    type="radio"
                                    className=" mr-1.5"
                                    checked={id === city.codename}
                                    onChange={() => handleChangeLocation(city.name, city.codename)}
                                />
                                <label
                                    htmlFor={city.codename}
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