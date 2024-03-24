import { useEffect, useState } from 'react';
import CardSub from '../components/CardSub';
import FormProject from './Form';
import { isJobSeeker } from '@/utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Project } from '@/types/JobSeeker';

const Projects = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [projects, setProjects] = useState<Project[]>([]);
    const toggleOpen = (): void => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (jobSeeker) {
            setProjects(currentUser.projects);
        }
    }, [jobSeeker, currentUser]);

    return (
        <CardSub
            title="Dự án cá nhân"
            sub={
                projects.length === 0
                    ? 'Liệt kê một số dự án có liên quan để cho thấy bạn đã áp dụng khả năng của mình như thế nào'
                    : ''
            }
            toggleOpen={toggleOpen}
            open={isOpen}
            data={projects}
            type="projects"
        >
            {isOpen && <FormProject toggleOpen={toggleOpen} />}
        </CardSub>
    );
};

export default Projects;
