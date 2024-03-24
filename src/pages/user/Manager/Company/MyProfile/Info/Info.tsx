import { MdEmail } from 'react-icons/md';
import Card from '../../../components/Card';
import FormInfo from '../../../components/FormInfo';
import { useState, useEffect } from 'react';
import { RootState } from '@/store/store';

import { useSelector } from 'react-redux';
import { isCompany } from '@/utils/helper';

const Info = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);
    const [coverPhoto, setCoverPhoto] = useState<string>('');
    useEffect(() => {
        if (isCompany(currentUser)) {
            setCoverPhoto(currentUser.coverPhoto);
        } else {
            setCoverPhoto('');
        }
    }, [currentUser]);
    return (
        <div className="mb-8">
            {coverPhoto && (
                <img className="w-full h-[180px] mb:h-28 rounded-t-md object-cover" src={coverPhoto} alt="coverPhoto" />
            )}
            <Card handleOpen={handleOpen}>
                <div className="flex items-center gap-4 w-full mb:gap-2 mb:flex-col mb:items-start">
                    <img
                        className="w-20 h-20 mb:w-14 mb:h-14 object-cover rounded-full"
                        src={currentUser?.photo}
                        alt="avt"
                    />
                    <div className="flex flex-col gap-2 w-full mb:gap-1">
                        <div className="flex gap-2 text-2xl font-family-title font-title text-primary-100 w-full mb:text-base">
                            {currentUser?.firstName} {currentUser?.lastName}
                        </div>
                        <div className="flex items-center gap-2 text-content-title font-medium w-full  mb:text-sm">
                            <MdEmail />
                            <p className="font-family-text">{currentUser?.email}</p>
                        </div>
                    </div>
                </div>
            </Card>
            <FormInfo handleOpen={handleOpen} open={open} />
        </div>
    );
};

export default Info;
