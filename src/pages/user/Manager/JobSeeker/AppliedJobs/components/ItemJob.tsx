import { JobApplicate } from '@/types/JobSeeker';
import images from '@/assets/images';
import { formatDate } from '@/utils/date';
import { useRemoveJobApplyMutation } from '@/services/jobseekerApiSlice';
import { toast } from 'react-toastify';
import { formatNumberToVND } from '@/utils/number';
import { useEffect, useState } from 'react';
import ConfirmDelete from '@/components/Dialog/ConfirmDelete';
import Loader from '@/components/Loader/Loader';
const ItemJob = ({ job }: { job: JobApplicate }) => {
    const currentDate: Date = new Date();

    const jobCreateDate: Date = new Date(job?.job?.createdAt);

    const isToday = jobCreateDate.toDateString() === currentDate.toDateString();
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [agree, setAgree] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [removeJob, { isLoading }] = useRemoveJobApplyMutation();

    let displayDate = '';

    if (isToday) {
        displayDate = 'Hôm nay';
    } else {
        const timeDiff: number = currentDate.getTime() - jobCreateDate.getTime();

        const daysAgo: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        displayDate = `${daysAgo} ngày trước`;
    }

    useEffect(() => {
        if (agree) {
            if (id) {
                removeJob(id)
                    .unwrap()
                    .then(() => {
                        toast.success('Xoá thành công!');
                    })
                    .catch((error) => {
                        console.error('Error deleting:', error);
                        toast.error('Đã xảy ra lỗi khi xoá.');
                    })
                    .finally(() => setAgree(false));
            }
        }
    }, [agree]);

    let interviewDate;
    if (job.interviewDate) {
        interviewDate = formatDate(job.interviewDate);
    }

    const salary = formatNumberToVND(job?.job?.salary);
    return (
        <>
            {isLoading && <Loader />}
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg font-family-text gap-8 mb:grid mb:grid-cols-1  tb:grid tb:grid-cols-2 lg:grid lg:grid-cols-2 ">
                <div className="flex gap-4 w-[30%] items-center mb:w-full tb:w-full lg:w-full">
                    <img className="w-16 h-16 object-fit rounded-lg" src={job.company.photo} alt="company" />
                    <div className="flex flex-col gap-1 w-full">
                        <h5 className="font-family-title font-title text-lg text-primary-100">{job?.job.title}</h5>

                        <div className="flex gap-1 items-center text-sm">
                            <p className="text-content-text font-medium">{job?.company?.companyName}</p>
                        </div>
                    </div>
                </div>

                <div className="flex  gap-3 w-[35%] items-center mb:w-full tb:w-full lg:w-full">
                    <img
                        className="w-12 h-12 bg-[#2bc155] p-3 rounded-lg object-contain"
                        src={images.logo.money}
                        alt={images.logo.money}
                    />
                    <div className="flex flex-col gap-2">
                        <h5 className="font-family-title font-semibold ">{salary}/Tháng</h5>

                        <div className="flex gap-1 items-center text-sm">
                            <img src={images.logo.location} alt={images.logo.calender2} />
                            <p className="text-content-text font-medium">{job?.company?.location.city}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 w-[28%] items-center mb:w-full tb:w-full lg:w-full">
                    <img
                        className="w-12 h-12 bg-[#fba555] p-3 rounded-lg object-contain"
                        src={images.logo.userFg}
                        alt={images.logo.userFg}
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 items-center text-sm">
                            <img src={images.logo.calender2} alt={images.logo.calender2} />
                            <p className="text-content-text font-medium">{displayDate}</p>
                        </div>

                        <div className="flex gap-1 items-center text-sm">
                            <span className="font-semibold">Phỏng vấn: </span>
                            <p className="text-content-text font-medium">{interviewDate ? interviewDate : 'Chưa có'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 font-medium w-[15%] justify-end mb:w-full  mb:justify-start  tb:w-full tb:justify-start lg:w-full lg:justify-start">
                    {job.status === 'pending' && (
                        <div className="flex flex-col gap-2">
                            <div className="py-1 px-3  border-primary-100 border-2 rounded-lg">Đang chờ</div>

                            <button
                                onClick={() => {
                                    setOpenConfirmDelete(true);
                                    setId(job?._id);
                                }}
                                className="py-1 px-3 text-white bg-red-700 rounded-lg hover:bg-black duration-300"
                            >
                                {isLoading ? 'Đang xoá' : 'Xoá'}
                            </button>
                        </div>
                    )}

                    {job.status === 'accepted' && (
                        <div className="py-1 px-3 text-center text-white  rounded-lg bg-primary-100 ">Đã duyệt</div>
                    )}
                </div>
                {openConfirmDelete && (
                    <ConfirmDelete open={openConfirmDelete} onSetOpen={setOpenConfirmDelete} onSetAgree={setAgree} />
                )}
            </div>
        </>
    );
};

export default ItemJob;
