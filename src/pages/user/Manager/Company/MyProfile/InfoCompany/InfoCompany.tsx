import Card from '../../../components/Card';
import FormInfo from './Form';
import { useState, useEffect } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { isCompany } from '@/utils/helper';
import Company from '@/types/Company';
import { formatDate } from '@/utils/date';

const InfoCompany = () => {
    const currentUser = useSelector((state: RootState) => state.user.user);

    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(!open);

    const [company, setCompany] = useState<Company>();

    useEffect(() => {
        if (isCompany(currentUser)) {
            setCompany(currentUser);
        }
    }, [currentUser]);
    const date = company?.establishDate ? formatDate(company.establishDate.toString()) : '';

    return (
        <>
            <Card handleOpen={handleOpen}>
                <div className="flex flex-col gap-4 text-content-title font-family-title mb:text-sm">
                    <div className="flex gap-2 items-center">
                        <span className="font-title text-primary-100">Tên công ty:</span>
                        <h5 className="font-medium text-content-title text-xl  mb:text-sm">{company?.companyName}</h5>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span className="font-title text-primary-100">Ngày thành lập:</span>
                        <h5 className="font-medium text-content-title text-xl mb:text-sm">{date}</h5>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-title text-primary-100">Quy mô:</span>
                        <h5 className="font-medium text-content-title text-xl mb:text-sm">
                            {company?.companySize.from} - {company?.companySize.to} thành viên
                        </h5>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span className="font-title text-primary-100">Website:</span>
                        <a
                            className="text-primary-100 font-medium underline text-lg mb:text-sm"
                            href={company?.website}
                            target="_blank"
                        >
                            {company?.website ? 'Xem chi tiết' : 'Công ty chưa có website'}
                        </a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-title text-primary-100">Mô tả:</span>
                        <div className="whitespace-pre-line font-medium text-content-title text-lg mb:text-sm">
                            {company?.description}
                        </div>
                    </div>
                </div>
            </Card>

            <FormInfo handleOpen={handleOpen} open={open} />
        </>
    );
};

export default InfoCompany;
