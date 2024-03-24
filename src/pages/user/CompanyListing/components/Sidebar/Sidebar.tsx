import { useEffect, useState } from "react";
import Location from "./Location/Location";
import Search from "./Search/Search";

type filterObject = {
    name: string,
    city: string,
}
type Props = {
    filter: (filter: filterObject) => void
};
function Sidebar(props: Props) {
    const [filterObj, setFilterObj] = useState<filterObject>({name: '', city: ''})
    
    const handleFilterLocation = (city: string) => {
        setFilterObj(prev => {
            return {
                ...prev,
                city
            }
        })
    }
    
    const handleFilterSearch = (name: string) => {
        setFilterObj(prev => {
            return {
                ...prev,
                name
            }
        })
    }
    
    useEffect(() => {
        props.filter(filterObj)
    }, [filterObj])
    
    return (
        <div className=" w-1/4 pr-3 mx-auto mb-8 lg:pr-0 tb:pr-0 mb:pr-0 lg:w-10/12 tb:w-10/12 mb:w-11/12">
            <div className=" w-full bg-[#f8f8f8] rounded-xl pl-5 pr-5 pt-5 pb-1">
                <Search searchChange={handleFilterSearch} />
                <Location locationChange={handleFilterLocation} />
            </div>
        </div>
    );
}

export default Sidebar;