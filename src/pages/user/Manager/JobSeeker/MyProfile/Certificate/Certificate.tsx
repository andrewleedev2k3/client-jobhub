import { useEffect, useState } from 'react';
import CardSub from '../components/CardSub';
import FormCer from './Form';
import { Certification } from '@/types/JobSeeker';
import { isJobSeeker } from '@/utils/helper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const Certificate = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [certification, setCertification] = useState<Certification[]>([]);

    useEffect(() => {
        if (jobSeeker) {
            setCertification(currentUser.certificate);
        }
    }, [jobSeeker, currentUser]);

    const toggleOpen = (): void => {
        setIsOpen(!isOpen);
    };
    return (
        <CardSub
            title="Chứng chỉ"
            sub={certification.length === 0 ? 'Cung cấp bằng chứng về chuyên môn và kỹ năng cụ thể của bạn' : ''}
            toggleOpen={toggleOpen}
            open={isOpen}
            data={certification}
            type="certification"
        >
            {isOpen && <FormCer toggleOpen={toggleOpen} />}
        </CardSub>
    );
};

export default Certificate;
