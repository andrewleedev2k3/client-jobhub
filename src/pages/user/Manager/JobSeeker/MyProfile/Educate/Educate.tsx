import { useEffect, useState } from 'react';
import CardSub from '../components/CardSub';
import FormEducation from './Form';
import { isJobSeeker } from '@/utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Education } from '@/types/JobSeeker';

const Educate = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [education, setEducation] = useState<Education[]>([]);

    useEffect(() => {
        if (jobSeeker) {
            setEducation(currentUser.educate);
        }
    }, [jobSeeker, currentUser]);
    const toggleOpen = (): void => {
        setIsOpen(!isOpen);
    };
    return (
        <CardSub
            title="Học vấn"
            sub={education.length === 0 ? 'Chia sẻ trình độ học vấn của bạn' : ''}
            toggleOpen={toggleOpen}
            open={isOpen}
            data={education}
            type="education"
        >
            {isOpen && <FormEducation toggleOpen={toggleOpen} />}
        </CardSub>
    );
};

export default Educate;
