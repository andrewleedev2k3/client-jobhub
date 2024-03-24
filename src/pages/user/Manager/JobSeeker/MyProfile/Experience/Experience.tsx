import { useEffect, useState } from 'react';
import CardSub from '../components/CardSub';
import FormExp from './Form';
import { useSelector } from 'react-redux';
import { isJobSeeker } from '@/utils/helper';
import { RootState } from '@/store/store';
import { Experience } from '@/types/JobSeeker';

const Experience = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const toggleOpen = (): void => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (jobSeeker) {
            setExperiences(currentUser.experiences);
        }
    }, [jobSeeker, currentUser]);

    return (
        <CardSub
            title="Kinh nghiệm làm việc"
            sub={experiences.length === 0 ? 'Thể hiện những thông tin chi tiết về quá trình làm việc' : ''}
            toggleOpen={toggleOpen}
            open={isOpen}
            data={experiences}
            type="experiences"
        >
            {isOpen && <FormExp toggleOpen={toggleOpen} />}
        </CardSub>
    );
};

export default Experience;
