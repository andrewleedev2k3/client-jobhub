import Job from '@/types/Job';
import { Link } from 'react-router-dom';

interface Props {
    data: Job[];
}

function JobGutter(props: Props) {
    const { data: jobList } = props;

    return (
        <>
            {jobList.length === 0 && 'Hiện đang không có công việc nào.'}
            <div className=" flex flex-wrap tb:flex-col mb:flex-col ">
                {jobList?.map((job) => {
                    const date = new Date(job.deadline)
                    const mydeadline = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() 
                    return (
                        <Link to={'/job-detail/' + job._id} key={job._id} className=" w-6/12 pl-3 pr-3 mb-6 cursor-default tb:w-full mb:w-full ">
                            <div className="border-[#eee] border rounded p-4 relative duration-300 cursor-pointer hover:border-primary-100">
                                <img
                                    className=" w-full h-[240px] object-cover rounded tb:w-full"
                                    src={job.postedBy.coverPhoto}
                                />
                                <div className=" mt-5 mb-5 flex items-center mb:flex-col mb:items-start">
                                    <img
                                        className=" w-10 h-10 rounded-full mr-3 object-cover mb:mx-auto"
                                        src={job.postedBy.photo}
                                    />
                                    <div className="w-full flex flex-col">
                                        <Link to={'/job-detail/' + job._id} className=" w-[90%] text-content-title font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap duration-300 hover:text-primary-100 xl:text-base mb:text-cb">
                                            {job.title}
                                        </Link>
                                        <div className=" font-family-title text-content-text text-sm font-medium flex items-center xl:flex-col xl:items-start lg:flex-col lg:items-start tb:flex-row mb:flex-col mb:items-start mb:text-xs ">
                                            {job.postedBy.companyName}
                                            <div className=" h-3.5 w-px bg-content-title mr-2.5 ml-2.5 xl:hidden lg:hidden tb:hidden mb:hidden"></div>
                                            <p className=" text-content-title font-semibold flex tb:ml-10 mb:text-xs mb:ml-0 mb:mt-1 ">
                                                Thời hạn <span className=" font-medium">: {mydeadline}</span>{' '}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" list-none border-t border-[#eee] pt-5">
                                    <div className=" flex items-center mb-2  relative">
                                        <div className=' w-2 h-2 rounded-full bg-primary-200 left-0 top-[9px] absolute mb:top-[4.5px]'></div>
                                        <p className=" text-content-text font-medium text-base ml-[14px] lg:text-sm mb:text-xs ">
                                            Lương: 
                                            <span className=" text-content-title font-medium ml-1">
                                                {job.salary.toLocaleString('it')}đ /
                                            </span>{' '}
                                            tháng
                                        </p>
                                    </div>
                                    <div className=" flex items-center mb-2 relative">
                                        <div className=' w-2 h-2 rounded-full bg-primary-200 left-0 top-[9px] absolute mb:top-[4.5px]'></div>
                                        <p className=" text-content-text font-medium text-base ml-[14px] overflow-hidden text-ellipsis whitespace-nowrap block lg:text-sm mb:text-xs ">
                                            Kĩ năng yêu cầu: 
                                            <span className=" text-content-title font-medium ml-1 ">
                                                {job.skillsRequire.join(', ')}
                                            </span>
                                        </p>
                                    </div>
                                    <div className=" flex items-center mb-2 relative">
                                        <div className=' w-2 h-2 rounded-full bg-primary-200 left-0 top-[9px] absolute mb:top-[4.5px]'></div>
                                        <p className=" text-content-text font-medium text-base ml-[14px] lg:text-sm mb:text-xs ">
                                            Nơi làm việc: 
                                            <span className=" text-content-title font-medium ml-1">
                                                {job.postedBy.location.city}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div className=" flex items-center justify-between mt-5">
                                    <div className=" group cursor-pointer ">
                                        <div className=" border border-primary-100 pr-5 pl-5 pt-1 pb-1 rounded-md group duration-300 hover:bg-primary-100 right-0 ">
                                            <Link
                                                to={'/job-detail/' + job._id}
                                                className=" text-primary-100 flex items-center duration-300 group-hover:text-white group-hover:cursor-pointer "
                                            >
                                                <span className=" text-sm font-medium mb:text-xs ">Xem thêm</span>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default JobGutter;
