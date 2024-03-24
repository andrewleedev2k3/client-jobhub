import { useJobseekerChangeMeMutation } from '@/services/jobseekerApiSlice';
import { RootState } from '@/store/store';
import { Skill } from '@/types/JobSeeker';
import { isJobSeeker } from '@/utils/helper';
import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ConfirmDelete from '@/components/Dialog/ConfirmDelete';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader/Loader';
const SkillItem = ({ data }: { data: Skill[] }) => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [skillName, setSkillName] = useState<string>('');
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [agree, setAgree] = useState<boolean>(false);
    useEffect(() => {
        if (isJobSeeker(currentUser)) {
            setSkills(currentUser.skills);
        }
    }, [currentUser]);

    const [changeSkill, { isLoading }] = useJobseekerChangeMeMutation();

    useEffect(() => {
        if (agree) {
            const itemToDelete = skills.find((item) => item === skillName);

            if (itemToDelete) {
                const updatedSkills = skills.filter((item) => item !== skillName);
                const skillsData: any = {
                    skills: updatedSkills,
                };

                changeSkill(skillsData)
                    .unwrap()
                    .then(() => {
                        toast.success('Xoá kỹ năng thành công!');
                    })
                    .catch((error) => {
                        console.error('Error deleting skill:', error);
                        toast.error('Đã xảy ra lỗi khi xoá kỹ năng.');
                    })
                    .finally(() => setAgree(false));
            }
        }
    }, [agree]);

    return (
        <div className="flex flex-wrap gap-3">
            {isLoading && <Loader />}
            {data.map((item, index) => (
                <div
                    className="flex items-center gap-3 text-content-text font-semibold px-4 py-1 bg-primary-200 border-2 border-primary-100 rounded-3xl"
                    key={index}
                >
                    {item}
                    <button
                        onClick={() => {
                            setOpenConfirmDelete(true);
                            setSkillName(item);
                        }}
                        className=" text-red-800 hover:text-red-500 "
                    >
                        <AiOutlineCloseCircle />
                    </button>
                </div>
            ))}
            {openConfirmDelete && (
                <ConfirmDelete open={openConfirmDelete} onSetOpen={setOpenConfirmDelete} onSetAgree={setAgree} />
            )}
        </div>
    );
};

export default SkillItem;
