import Job from '@/types/Job';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { isJobSeeker } from '@/utils/helper';
import { useApplyJobMutation } from '@/services/jobsApiSlice';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

type Props = {
    data: Job;
};

function JobSummary(props: Props) {
    const { data: job } = props;

    const currentUser = useSelector((state: RootState) => state.user.user);

    const [isApplied, setIsApplied] = useState<boolean>();

    const [applyJob] = useApplyJobMutation();
    const navigate = useNavigate();

    const isjs = isJobSeeker(currentUser);

    const dateStart = new Date(job.createdAt);
    const startDate = dateStart.getDate() + '/' + (dateStart.getMonth() + 1) + '/' + dateStart.getFullYear();
    const dateEnd = new Date(job.deadline);
    const endDate = dateEnd.getDate() + '/' + (dateEnd.getMonth() + 1) + '/' + dateEnd.getFullYear();

    const handleApply = async () => {
        if (!currentUser) {
            navigate('/login');
        }
        if (isjs) {
            const isConfirm = confirm('Bạn có chắc muốn apply công việc này?');
            if (isConfirm) {
                try {
                    const response = await applyJob(job.id).unwrap();

                    if (response.status === 200) {
                        toast.success(response.data.msg);
                        setIsApplied(true);
                    }
                } catch (err: any) {
                    toast.error(err.data.msg);
                }
            }
        }
    };

    useEffect(() => {
        if (job.applications?.length !== 0 && currentUser) {
            job.applications?.map((apply) => {
                if (apply.candicate.id === currentUser?.id) {
                    setIsApplied(true);
                }
            });
        } else {
            setIsApplied(false);
        }
    });

    return (
        <div className=" w-1/3 pl-3 pr-3 lg:w-full tb:w-full mb:w-full ">
            {isjs ? (
                !isApplied ? (
                    <div className=" mb-6 flex items-center justify-end">
                        <button
                            onClick={handleApply}
                            className=" w-full font-medium pt-2 pb-2 bg-primary-100 text-white rounded duration-500 hover:bg-black xl:text-sm lg:text-base "
                        >
                            Ứng tuyển vị trí này
                        </button>
                    </div>
                ) : (
                    <div className=" mb-6 flex items-center justify-end">
                        <button className=" w-full font-medium py-2 bg-gray-300 text-content-text rounded duration-500 cursor-default xl:text-sm lg:text-base">
                            Đã ứng tuyển
                        </button>
                    </div>
                )
            ) : !currentUser ? (
                <div className=" mb-6 flex items-center justify-end">
                    <button
                        onClick={handleApply}
                        className=" w-full font-medium py-2 bg-primary-100 text-white rounded duration-500 hover:bg-black xl:text-sm lg:text-base"
                    >
                        Ứng tuyển vị trí này
                    </button>
                </div>
            ) : (
                ''
            )}

            <div className=" w-full h-1.5 rounded-t-md bg-primary-100"></div>

            <div className=" w-full bg-[#f8f8f8] py-[70px] px-10 mb:py-[30px] mb:px-[20px] ">
                <h3 className=" font-family-title text-content-title text-lg font-semibold mr-2 mb-6">
                    Tóm tắt công việc:
                </h3>
                <div className=" relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:mr-1.5 before:pr-2 before:top-2 before:absolute">
                    <p className=" text-content-text text-base font-medium mb-2.5 ml-4 ">
                        <span className=" text-content-title font-medium mr-2">Ngày bắt đầu:</span>
                        {startDate}
                    </p>
                </div>
                <div className=" relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:mr-1.5 before:pr-2 before:top-2 before:absolute">
                    <p className=" text-content-text text-base font-medium mb-2.5 ml-4 ">
                        <span className=" text-content-title font-medium mr-2">Hạn ứng tuyển:</span>
                        {endDate}
                    </p>
                </div>
                <div className=" relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:mr-1.5 before:pr-2 before:top-2 before:absolute">
                    <p className=" text-content-text text-base font-medium mb-2.5 ml-4 ">
                        <span className=" text-content-title font-medium mr-2">Số lượng:</span>
                        {job.numberRecruitment} người
                    </p>
                </div>
                <div className=" relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:mr-1.5 before:pr-2 before:top-2 before:absolute">
                    <p className=" text-content-text text-base font-medium mb-2.5 ml-4 ">
                        <span className=" text-content-title font-medium mr-2">Kĩ năng:</span>
                        {job.skillsRequire.join(', ')}
                    </p>
                </div>
                <div className=" relative before:w-2 before:h-2 before:rounded-full before:bg-primary-blur before:mr-1.5 before:pr-2 before:top-2 before:absolute">
                    <p className=" text-content-text text-base font-medium mb-2.5 ml-4 ">
                        <span className=" text-content-title font-medium mr-2">Lương:</span>
                        {job.salary.toLocaleString('it')} vnđ
                    </p>
                </div>
            </div>
        </div>
    );
}

export default JobSummary;
