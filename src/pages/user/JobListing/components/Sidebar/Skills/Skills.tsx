import { useEffect, useState } from "react";
import { useGetSkillsQuery } from "@/services/utilsApiSlice";

function Skills({skillsChange}: {skillsChange: (skills: string[]) => void}) {
    const [isAll, setIsAll] = useState<boolean>(true)
    const [checkedList, setCheckedList] = useState<string[]>([])
    const [skills, setSkills] = useState<string[]>([])

    const {data, isLoading, isError} = useGetSkillsQuery('')

    const handleChangeSkills = (skill: string) => {
        if(skill === 'allSkills') {
            setCheckedList([])
            setIsAll(!isAll)
            skillsChange(checkedList)
        } else {
            if(isAll) {
                setIsAll(false)
                setCheckedList(prev => [...prev, skill])
                skillsChange(checkedList)
            } else {
                const isChecked: boolean = checkedList?.some(checked => checked === skill)
                if(isChecked) {
                    const newCheckedList = checkedList.filter(checked => {
                        return checked !== skill
                    })
                    setCheckedList(newCheckedList)
                    skillsChange(checkedList)
                } else {
                    setCheckedList(prev => [...prev, skill])
                    skillsChange(checkedList)
                }
            }
        }
    } 

    useEffect(() => {
        if(data?.data?.data && !isLoading && !isError) {
            setSkills(data?.data?.data)
        }
    }, [data?.data?.data, isLoading, isError])

    useEffect(() => {
        skillsChange(checkedList)
    }, [checkedList])
    
    return (
        <div className=" bg-white border-[#eee] border rounded-md pt-5 pb-5 pl-6 pr-3 mb-5">
            <h3 className=" font-family-title text-primary-100 font-semibold text-lg mb-2 lg:text-lg">Kĩ năng</h3>
            <div className=" max-h-64 overflow-scroll">
                <div className=" mb-2 flex relative">
                    <div className=" flex items-center cursor-pointer">
                        <input
                            id='allSkills'
                            type="checkbox"
                            className=" mr-1.5"
                            checked={isAll ? true : false}
                            onChange={() => handleChangeSkills('allSkills')}
                        />
                        <label
                            htmlFor='allSkills'
                            className=" text-content-text text-sm font-medium lg:text-sm cursor-pointer"
                        >
                            Tất cả
                        </label>
                    </div>
                </div>
                {skills?.map(skill => {
                    return (
                        <div key={skill} className=" mb-2 flex relative">
                            <div className=" flex items-center cursor-pointer">
                                <input
                                    id={skill}
                                    type="checkbox"
                                    className=" mr-1.5"
                                    checked={isAll === true ? false : checkedList.some(checked => checked === skill)}
                                    onChange={() => handleChangeSkills(skill)}
                                />
                                <label
                                    htmlFor={skill}
                                    className=" text-content-text text-sm font-medium lg:text-sm cursor-pointer"
                                >
                                    {skill}
                                </label>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    );
}

export default Skills;