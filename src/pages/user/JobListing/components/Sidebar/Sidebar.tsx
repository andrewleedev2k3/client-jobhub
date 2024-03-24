import { useEffect, useState } from 'react';
import Category from './Category/Category';
import SalaryRange from './SalaryRange/SalaryRange';
import Location from './Location/Location';
import Skills from './Skills/Skills';
import Search from './Search/Search';

type filterObject = {
    name: string,
    idCat: string,
    salary: {min: number, max: number}
    city: string,
    skills: string[]
}
type Props = {
    filter: (filter: filterObject) => void
};
function Sidebar(props: Props) {

    const [filterObj, setFilterObj] = useState<filterObject>({name: '',idCat: '', salary: {min: 1000000, max: 100000000}, city: '', skills: []})
   
    const handleFilterCategory = (id: string) => {
        setFilterObj(prev => {
            return {
                ...prev,
                idCat: id
            }
        })
    }
    
    const handleFilterSalary = ({min, max}: {min: number, max: number}) => {
        setFilterObj(prev => {
            return {
                ...prev,
                salary: {
                    min: min,
                    max: max,
                }
            }
        })
    }
    
    const handleFilterLocation = (city: string) => {
        setFilterObj(prev => {
            return {
                ...prev,
                city
            }
        })
    }
    
    const handleFilterSkills = (skills: string[]) => {
        setFilterObj(prev => {
            return {
                ...prev,
                skills
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
                <div>
                    <Search searchChange={handleFilterSearch} />

                    <Category categoryChange={handleFilterCategory} />

                    <SalaryRange salaryChange={handleFilterSalary} />

                    <Location locationChange={handleFilterLocation} />

                    <Skills skillsChange={handleFilterSkills} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
