import { useEffect, useState } from 'react';
import CardSub from '../components/CardSub';
import Form from './Form';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { isJobSeeker } from '@/utils/helper';

const Skill = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [skills, setSkills] = useState<string[]>([]);
    const toggleOpen = (): void => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (jobSeeker) {
            setSkills(currentUser.skills);
        }
    }, [jobSeeker, currentUser]);

    return (
        <CardSub
            title="Kỹ năng"
            sub={skills.length === 0 ? 'Nêu bật các kỹ năng liên quan đến công việc' : ''}
            data={skills}
            toggleOpen={toggleOpen}
            open={isOpen}
            type="skills"
        >
            {isOpen && <Form toggleOpen={toggleOpen} />}
        </CardSub>
    );
};

export default Skill;
