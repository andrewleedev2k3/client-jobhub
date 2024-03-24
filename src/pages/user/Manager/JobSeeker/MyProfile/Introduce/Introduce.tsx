import { useEffect, useState } from 'react';
import CardSub from '../components/CardSub';
import Form from './Form';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { isJobSeeker } from '@/utils/helper';

const Introduce = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);
    const jobSeeker = isJobSeeker(currentUser);
    const [intro, setIntro] = useState<string | null>(jobSeeker ? currentUser.introduce : null);

    useEffect(() => {
        if (jobSeeker) {
            setIntro(currentUser.introduce);
        }
    }, [jobSeeker, currentUser]);

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <CardSub
                toggleOpen={handleOpen}
                title="Giới thiệu bản thân"
                sub={intro || 'Giới thiệu điểm mạnh và số năm kinh nghiệm của bạn'}
            />
            <Form handleOpen={handleOpen} open={open} />
        </>
    );
};

export default Introduce;
