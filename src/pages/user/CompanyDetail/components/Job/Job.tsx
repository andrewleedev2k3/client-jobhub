import images from '@/assets/images';
import Company from '@/types/Company';
import { Link } from 'react-router-dom';

type Props = {
    data: Company;
};

function Job(props: Props) {
    const { data: company } = props;
    return (
        <>
            <h1 className=" font-family-title text-content-title text-2xl font-semibold mb-10">Các công việc hiện tại</h1>
            <div className=' flex'>
                <div className=' w-10/12 flex flex-col gap-[30px] xl:w-full lg:w-full tb:w-full mb:w-full'>
                    {company?.jobList.length === 0 && 'Hiện công ty đang không đăng tuyển công việc nào'}
                    {company?.jobList.map((job) => {
                        const date = new Date(job.deadline)
                        const myDeadline = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                        return (
                            <Link to={'/job-detail/' + job._id} key={company._id} className=' w-full flex xl:flex-col lg:flex-col tb:flex-col mb:flex-col border-[#eee] border p-[30px] mb:p-[20px] duration-300 cursor-pointer hover:border-primary-100 '>
                                <div className='flex flex-col items-start justify-between gap-[40px] mr-[40px] '>
                                    <div className=' flex items-center gap-[20px] mb:gap-[15px] mb:flex-col mb:items-start'>
                                        <img className=' w-[52px] h-[52px] rounded-full object-cover mb:w-[40px] mb:h-[40px]' src={company.photo} />
                                        <div className=' flex flex-col gap-[10px]'>
                                            <h2 className=' w-[200px] mb:w-full mb:whitespace-pre-wrap text-xl font-family-title font-semibold overflow-hidden text-ellipsis whitespace-nowrap tb:text=base mb:text-base'>{job.title}</h2>
                                            <p className=' mb:w-[170px] text-content-text text-sm'>{company.companyName}</p>
                                        </div>
                                    </div>
                                    <div className=" flex xl:hidden lg:hidden tb:hidden mb:hidden ">
                                        <img src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/company-4.svg" />
                                        <p className=" text-sm font-medium ml-2">
                                            Người đã ứng tuyển:
                                            <span className=" font-medium text-content-title ml-1.5">{job.countApplication}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className=' w-px h-full bg-primary-200 mr-[40px] xl:hidden lg:hidden tb:hidden mb:hidden'></div>
                                <div className=' flex flex-col justify-center items-center gap-[40px] xl:items-start lg:items-start tb:items-start mb:items-start xl:gap-[20px] lg:gap-[20px] tb:gap-[20px] mb:gap-[20px] '>
                                    <div className=' flex items-center gap-[50px] xl:gap-[50px] xl:mt-[20px] lg:mt-[20px] lg:flex-col lg:gap-[4px] lg:items-start tb:flex-col tb:mt-[20px] tb:items-start tb:gap-[4px] mb:flex-col mb:mt-[20px] mb:items-start mb:gap-[4px] '>
                                        <div className=' flex flex-col gap-[4px]'>
                                            <div className=' flex items-center gap-[10px] mb:gap-[6px] mb:hidden '>
                                                <div className='w-[10px] h-[10px] mb:w-[6px] mb:h-[6px] bg-primary-100 rounded-full'></div>
                                                <p className=' text-content-text text-sm'>Địa điểm: </p>
                                                <h3 className=' text-content-title text-sm font-medium'>{company.location.city}</h3>
                                            </div>
                                            <div className=' flex items-center gap-[10px] mb:gap-[6px] '>
                                                <div className='w-[10px] h-[10px] mb:w-[6px] mb:h-[6px] bg-primary-100 rounded-full'></div>
                                                <p className=' text-content-text text-sm'>Lương: </p>
                                                <h3 className=' text-content-title text-sm font-medium'>{job.salary.toLocaleString('it')}đ<p className=' mb:hidden'> / tháng</p></h3>
                                            </div>
                                        </div>
                                        <div className=' flex flex-col gap-[4px]'>
                                            <div className=' flex items-center gap-[10px] mb:gap-[6px] '>
                                                <div className='w-[10px] h-[10px] mb:w-[6px] mb:h-[6px] bg-primary-100 rounded-full'></div>
                                                <p className=' text-content-text text-sm'>Thời hạn: </p>
                                                <h3 className=' text-content-title text-sm font-medium'>{myDeadline}</h3>
                                            </div>
                                            <div className=' flex items-center gap-[10px] mb:gap-[6px] mb:hidden '>
                                                <div className='w-[10px] h-[10px] mb:w-[6px] mb:h-[6px] bg-primary-100 rounded-full'></div>
                                                <p className=' text-content-text text-sm'>Trạng thái: </p>
                                                <h3 className=' text-content-title text-sm font-medium'>{job.available === true ? 'Đang tuyển dụng' : 'Không còn tuyển dụng'}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" hidden xl:flex lg:flex tb:flex mb:flex ">
                                        <img src="https://demo-egenslab.b-cdn.net/html/jobes/preview/assets/images/icon/company-4.svg" />
                                        <p className=" text-sm font-medium ml-2">
                                            Người đã ứng tuyển:
                                            <span className=" font-medium text-content-title ml-1.5">{job.countApplication}</span>
                                        </p>
                                    </div>
                                    <div className=' group'>
                                        <div className=' px-[15px] py-[3px] border border-primary-100 rounded-md bg-transparent duration-300 group-hover:bg-primary-100'>
                                            <p className=' text-primary-100 duration-300 group-hover:text-white'>Xem thêm</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className='flex flex-col w-2/12 ml-3 gap-[30px] xl:hidden lg:hidden tb:hidden mb:hidden'>
                    <img src={images.qc4} className=' cursor-pointer' />
                    <img src={images.qc5} className=' cursor-pointer' />
                </div>
            </div>
        </>
    );
}

export default Job;
