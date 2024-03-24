import images from '@/assets/images';
import ConfirmDelete from '@/components/Dialog/ConfirmDelete';
import Loader from '@/components/Loader/Loader';
import { useRemoveJobCreatedMutation } from '@/services/companiesApiSlice';
import Job from '@/types/Job';
import { formatDate } from '@/utils/date';
import { formatNumberToVND } from '@/utils/number';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Item = ({ job }: { job: Job }) => {
    const [removeJob, { isLoading }] = useRemoveJobCreatedMutation();
    const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
    const [agree, setAgree] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
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

    const deadline = formatDate(job.deadline);
    const salary = formatNumberToVND(job.salary);
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-lg font-family-text gap-4 mb:grid mb:grid-cols-1 tb:grid tb:grid-cols-2 lg:grid lg:grid-cols-2 mb:text-sm">
            {isLoading && <Loader />}
            <div className="flex gap-4 w-[35%] items-center mb:w-full tb:w-full lg:w-full">
                <img
                    className=" w-14 h-14  object-fit rounded-lg"
                    src={job.photosJob[0] ? job.photosJob[0] : images.logo.job}
                    alt="company"
                />
                <div className="flex flex-col gap-1">
                    <h5 className="font-family-title font-title text-primary-100 text-lg">{job.title}</h5>

                    {job.isAccepted ? (
                        <div className="text-sm text-primary-100 font-semibold">Đã duyệt</div>
                    ) : (
                        <div className="text-sm text-[#7307C9] font-semibold">Chưa duyệt</div>
                    )}
                </div>
            </div>

            <div className="flex gap-3 w-[30%] items-center mb:w-full tb:w-full lg:w-full">
                <img
                    className="w-12 h-12 bg-[#2bc155] p-3 rounded-lg object-contain"
                    src={images.logo.money}
                    alt={images.logo.money}
                />
                <div className="flex flex-col gap-1">
                    <h5 className="font-family-title">{salary}/Tháng</h5>
                    <Link
                        className="text-primary-100 hover:text-blue-800 duration-300 underline text-sm"
                        to={`/profile/company/jobApplication/${job.id}`}
                    >
                        Xem danh sách
                    </Link>
                </div>
            </div>

            <div className="flex  gap-3 w-[30%] items-center mb:w-full tb:w-full lg:w-full">
                <img
                    className="w-12 h-12 bg-[#fba555] p-3 rounded-lg object-contain"
                    src={images.logo.userFg}
                    alt={images.logo.userFg}
                />
                <div className="flex flex-col gap-1">
                    <p className="">Số lượng: {job.numberRecruitment}</p>
                    <p className="">Thời hạn: {deadline}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 font-medium w-[10%] justify-end text-sm mb:w-[70%] tb:w-[60%] lg:w-1/3">
                <button
                    onClick={() => {
                        setOpenConfirmDelete(true);
                        setId(job?._id);
                    }}
                    className="py-2 px-4 text-white bg-red-700 rounded-lg hover:bg-black duration-300 mb:w-1/2"
                >
                    Xoá
                </button>
            </div>
            {openConfirmDelete && (
                <ConfirmDelete open={openConfirmDelete} onSetOpen={setOpenConfirmDelete} onSetAgree={setAgree} />
            )}
        </div>
    );
};

export default Item;
