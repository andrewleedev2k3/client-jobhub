import { Link } from 'react-router-dom';
import Job from '@/types/Job';
import images from '@/assets/images';

interface Props {
    data: Job[];
}
function JobColumn(props: Props) {
    return (
        <div className=" mb-7 flex">
            <div className=' w-9/12 mr-3 lg:w-full tb:w-full mb:w-full'>
                {props.data.length === 0 && 'Hiện đang không có công việc nào.'}
                {props.data?.map((job) => {
                    const date = new Date(job.deadline)
                    const mydeadline = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() 
                    if(job.isAccepted === true) {
                        return (
                            <Link to={'/job-detail/' + job._id} key={job._id} className=' flex items-center border border-[#eee] rounded p-[20px] mb-6 duration-300 cursor-pointer hover:border-primary-100 tb:flex-col tb:items-start mb:flex-col mb:items-start '>
                                <img
                                    className=" w-[52px] h-[52px] rounded-full mr-4 object-cover lg:w-12"
                                    src={job.postedBy.photo}
                                />
                                <div className=" flex flex-col w-[240px] xl:w-[150px] tb:mt-2 mb:mt-2">
                                    <Link to={`/job-detail/${job._id}`} className=" w-[95%] tb:w-full font-family-title text-content-title text-lg font-semibold cursor-pointer pb-1 duration-300 overflow-hidden text-ellipsis whitespace-nowrap hover:text-primary-100 lg:text-base tb:text-2xl mb:text-xl ">
                                        {job.title}
                                    </Link>
                                    <div className=' flex items-center xl:flex-col xl:items-start'>
                                        <p className=" text-content-text text-sm cursor-pointer mr-3 duration-300 hover:text-primary-100 lg:text-sm tb:text-base mb:text-base">
                                            {job.postedBy.location.city}
                                        </p>
                                    </div>
                                </div>
                                <div className=' w-px h-[50px] bg-[#AEF0F2] mx-[30px] tb:hidden mb:hidden '></div>
                                <div className=' flex flex-col tb:mt-2 tb:text-lg mb:mt-2 tb:gap-[10px] mb:gap-[10px]'>
                                    <p className=' text-content-text'>Mức lương: <span className=' text-content-title font-medium'>{job.salary.toLocaleString('it')}đ</span></p>
                                    <p className=' text-content-text'>Thời hạn: <span className=' text-content-title font-medium'>{mydeadline}</span></p>
                                    <div className=' hidden tb:flex mb:flex'>
                                        <div className=' px-5 py-1 text-primary-100 border border-primary-100 bg-transparent rounded-md duration-300 hover:bg-primary-100 hover:text-white'>Xem thêm</div>
                                    </div>
                                </div>
                            </Link>
                        );
                    }
                    
                })}
            </div>
            <div className='flex flex-col w-3/12 ml-3 gap-[30px] lg:hidden tb:hidden mb:hidden'>
                <img src={images.qc1} className=' cursor-pointer' />
                <img src={images.qc2} className=' cursor-pointer' />
                <img src={images.qc3} className=' cursor-pointer' />
            </div>
        </div>
    );
}

export default JobColumn;
