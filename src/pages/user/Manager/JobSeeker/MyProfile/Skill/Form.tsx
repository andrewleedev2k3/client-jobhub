import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { CgUserList } from 'react-icons/cg';
import BtnBot from '../../../components/BtnBot';
import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { RootState } from '@/store/store';
import { isJobSeeker } from '@/utils/helper';
import { useSelector } from 'react-redux';
import { useGetSkillsQuery } from '@/services/utilsApiSlice';
import { Select, MenuItem } from '@mui/material';
import { toast } from 'react-toastify';

interface Form {
    toggleOpen?: () => void;
}
const Form = ({ toggleOpen }: Form) => {
    const [data, setData] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const currentUser = useSelector((state: RootState) => state.user.user);
    const [skills, setSkills] = useState<string[]>([]);
    const [skillsUser, setSkillsUser] = useState<string[]>([]);

    // Đợi Tiến update API
    const { data: skillsData, isLoading: loadingSkills, isError: errorSkills } = useGetSkillsQuery('');

    useEffect(() => {
        if (isJobSeeker(currentUser)) {
            setSkillsUser(currentUser.skills);
        }
        if (!loadingSkills && !errorSkills && skillsData?.data?.data) {
            setSkills(skillsData?.data?.data);
        }
    }, [currentUser, loadingSkills, errorSkills, skillsData?.data?.data]);

    const [changeSkill, { isLoading }] = useJobseekerChangeMeMutation();
    const handleInputChange = (e: any): void => {
        const selectedValue = e.target.value;
        setInputValue(selectedValue);
        if (selectedValue.trim() !== '' && !data.includes(selectedValue)) {
            setData([...data, selectedValue]);
            setInputValue('');
        }
    };

    const handleRemoveSkill = (index: number): void => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (data) {
                const dataArray = [...skillsUser, ...data];
                const skills = new Set(dataArray);

                const skillData: any = {
                    skills: [...skills],
                };

                await changeSkill(skillData);
                setData([]);
            }
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" flex flex-col gap-8 border-t-[1px] border-gray-600 pt-5">
            <div className="flex justify-between gap-2 h-12">
                <div className="flex items-center w-full h-full border-2 text-content-text">
                    <div className="text-xl p-4">
                        <CgUserList />
                    </div>
                    <div className="w-full h-[48px]">
                        <Select
                            value={inputValue}
                            onChange={handleInputChange}
                            variant="standard"
                            className="select w-full h-[48px]  text-content-s-text items-center"
                        >
                            {skills.map((skill, index) => (
                                <MenuItem key={index} value={skill}>
                                    {skill}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-5">
                {data.map((skill, index) => (
                    <div
                        className="flex items-center gap-2 text-content-text font-semibold px-4 py-1 bg-primary-200 border-2 border-primary-100 rounded-3xl"
                        key={index}
                    >
                        {skill}
                        <button
                            type="button"
                            className=" text-red-800 hover:text-red-500 "
                            onClick={() => handleRemoveSkill(index)}
                        >
                            <AiOutlineCloseCircle />
                        </button>
                    </div>
                ))}
            </div>

            <BtnBot toggleOpen={toggleOpen} isLoading={isLoading} />
        </form>
    );
};

export default Form;
