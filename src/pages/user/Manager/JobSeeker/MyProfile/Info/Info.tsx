import { MdEmail } from 'react-icons/md';
import Card from '../components/Card';
import FormInfo from '../../../components/FormInfo';
import { useState } from 'react';
import { RootState } from '@/store/store';

import { useSelector } from 'react-redux';

const Info = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Card handleOpen={handleOpen}>
                <div className="flex items-center gap-4 mb:flex-col w-full mb:items-start">
                    <img className="w-20 h-20 object-cover rounded-full" src={currentUser?.photo} alt="avt" />
                    <div className="flex flex-col gap-2 justify-start w-full mb:gap-1 mb:text-sm">
                        <div className="flex gap-2 text-2xl font-family-title font-title text-primary-100 mb:text-base">
                            {currentUser?.firstName} {currentUser?.lastName}
                        </div>
                        <div className="font-family-text flex items-center gap-2 text-content-title font-medium">
                            <MdEmail />
                            <p>{currentUser?.email}</p>
                        </div>
                    </div>
                </div>
            </Card>
            <FormInfo handleOpen={handleOpen} open={open} />
        </>
    );
};

export default Info;
